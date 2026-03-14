#!/usr/bin/env python3
"""
MORDIN MARKET TRACKER & INTELLIGENCE
Real-time market analysis + Twitter intelligence gathering
Combines odds tracking with late social media information
"""
import json
import sys
import subprocess
from pathlib import Path
from datetime import datetime

WS = Path.home()
TWITTER_CLI = WS / ".local/bin/twitter"

def get_twitter_intelligence(horse_name, max_results=5):
    """Use Twitter CLI to find relevant information about a horse"""
    try:
        if not TWITTER_CLI.exists():
            return None

        # Search Twitter for horse information
        cmd = [
            str(TWITTER_CLI),
            "search",
            f"{horse_name} horse racing",
            "--count", str(max_results)
        ]

        result = subprocess.run(cmd, capture_output=True, text=True, timeout=20)

        if result.returncode == 0 and result.stdout:
            # Parse Twitter results for sentiment/signals
            output = result.stdout.lower()

            # Look for positive/negative signals
            positive_signals = ['strong', 'backed', 'support', 'ready', 'form', 'win', 'backed heavily']
            negative_signals = ['injury', 'doubt', 'concern', 'problem', 'worry', 'fade', 'will drift']

            pos_count = sum(1 for sig in positive_signals if sig in output)
            neg_count = sum(1 for sig in negative_signals if sig in output)

            if pos_count > neg_count:
                return {'sentiment': 'POSITIVE', 'signal_strength': pos_count}
            elif neg_count > pos_count:
                return {'sentiment': 'NEGATIVE', 'signal_strength': neg_count}
            else:
                return {'sentiment': 'NEUTRAL', 'signal_strength': 0}

        return None

    except subprocess.TimeoutExpired:
        return None
    except Exception as e:
        print(f"Twitter search error for {horse_name}: {e}", file=sys.stderr)
        return None

def analyze_market(ruby_data, cecil_data, early_odds):
    """Analyze market vs model with Twitter intelligence"""

    try:
        rankings = ruby_data.get('rankings', [])
        if not rankings:
            return None

        market_analysis = []

        # Get Twitter intel on top 3 horses
        top_horses = rankings[:3]
        twitter_intel = {}

        for horse in top_horses:
            horse_name = horse.get('name', '')
            intel = get_twitter_intelligence(horse_name)
            if intel:
                twitter_intel[horse_name] = intel

        # Analyze each horse
        for horse in rankings[:10]:  # Top 10
            horse_name = horse.get('name', '')
            model_prob = horse.get('win_probability', 0)

            # Find market odds for this horse
            market_odds = None
            for market_horse in early_odds:
                if market_horse.get('name', '').lower() == horse_name.lower():
                    market_odds = market_horse.get('odds', 'N/A')
                    break

            # Calculate implied probability from odds
            market_implied_prob = None
            adjustment = 0
            adjustment_reason = []

            if market_odds and market_odds != 'N/A':
                try:
                    if '/' in str(market_odds):
                        num, den = map(float, str(market_odds).split('/'))
                        market_implied_prob = 1 / (1 + num/den)
                    else:
                        market_implied_prob = 1 / (float(market_odds) + 1)
                except:
                    market_implied_prob = None

            # Calculate divergence
            divergence = None
            divergence_type = None

            if market_implied_prob:
                divergence = model_prob - market_implied_prob
                if abs(divergence) >= 0.10:
                    if divergence > 0:
                        divergence_type = "MODEL_FAVORS"
                        if divergence > 0.15:
                            adjustment = 0.08
                            adjustment_reason.append("Strong model edge vs market")
                    else:
                        divergence_type = "MARKET_FAVORS"
                        if divergence < -0.15:
                            adjustment = -0.10
                            adjustment_reason.append("Market correctly skeptical")
                else:
                    divergence_type = "ALIGNED"

            # Apply Twitter intelligence
            if horse_name in twitter_intel:
                intel = twitter_intel[horse_name]
                if intel['sentiment'] == 'POSITIVE' and intel['signal_strength'] >= 2:
                    adjustment += 0.05
                    adjustment_reason.append(f"Twitter positive sentiment ({intel['signal_strength']} signals)")
                elif intel['sentiment'] == 'NEGATIVE' and intel['signal_strength'] >= 2:
                    adjustment -= 0.08
                    adjustment_reason.append(f"Twitter concern detected ({intel['signal_strength']} signals)")

            # Final calibrated probability
            calibrated_prob = model_prob + adjustment
            calibrated_prob = max(0.01, min(0.99, calibrated_prob))  # Clamp 0-1

            market_analysis.append({
                'horse': horse_name,
                'model_probability': round(model_prob, 3),
                'market_implied_probability': round(market_implied_prob, 3) if market_implied_prob else None,
                'market_odds': market_odds,
                'divergence': round(divergence, 3) if divergence else None,
                'divergence_type': divergence_type,
                'twitter_sentiment': twitter_intel.get(horse_name, {}).get('sentiment', 'NO_DATA'),
                'adjustment': round(adjustment, 3),
                'calibrated_probability': round(calibrated_prob, 3),
                'reasoning': ' | '.join(adjustment_reason) if adjustment_reason else 'No adjustment needed'
            })

        return market_analysis

    except Exception as e:
        print(f"Market analysis error: {e}", file=sys.stderr)
        return None

def main():
    """Analyze market with Twitter intelligence"""
    if len(sys.argv) < 4:
        print("Usage: mordin-market-tracker.py <ruby.json> <cecil.json> <early_odds_json>")
        sys.exit(1)

    try:
        with open(sys.argv[1]) as f:
            ruby_data = json.load(f)
        with open(sys.argv[2]) as f:
            cecil_data = json.load(f)

        # Parse early odds
        try:
            early_odds = json.loads(sys.argv[3])
        except:
            early_odds = []

        result = analyze_market(ruby_data, cecil_data, early_odds)

        if result:
            output = {
                'timestamp': datetime.now().isoformat(),
                'market_comparison': result,
                'confidence_factors': {
                    'twitter_intel_available': any(m.get('twitter_sentiment') != 'NO_DATA' for m in result),
                    'strong_divergences': len([m for m in result if m.get('divergence_type') == 'MODEL_FAVORS' and abs(m.get('divergence', 0)) > 0.15])
                }
            }
            print(json.dumps(output))
        else:
            print(json.dumps({}))
            sys.exit(1)

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
