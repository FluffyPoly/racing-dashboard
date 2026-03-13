#!/usr/bin/env python3
"""
Advanced Learnings Formatter: Generates meaningful insights by analyzing
prediction vs actual race outcomes in detail.
"""
import json
import sys
import os
import requests
from datetime import datetime
from pathlib import Path

WS = "/home/ruby"

def fetch_race_result(race_id):
    """Fetch race result from Supabase"""
    try:
        S_URL = "https://txsuawougiptdlmmiasy.supabase.co/rest/v1"
        S_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4c3Vhd291Z2lwdGRsbW1pYXN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NTczNDksImV4cCI6MjA4ODUzMzM0OX0.5QlkuPtjIxF3dNNUBIlgQeM3ZRw1KH-aoNOt_b9B8d0"

        headers = {
            'apikey': S_KEY,
            'Authorization': f'Bearer {S_KEY}'
        }

        r = requests.get(f'{S_URL}/results?race_id=eq.{race_id}', headers=headers)
        if r.status_code == 200 and r.json():
            return r.json()[0]
    except:
        pass
    return None

def analyze_ruby_prediction(ruby_data, result):
    """Analyze Ruby's probability predictions vs actual outcome"""
    if not ruby_data or not result:
        return "No prediction data available for analysis."

    rankings = ruby_data.get('rankings', [])
    actual_winner = result.get('winner', 'Unknown').lower().strip()

    if not rankings:
        return "No horse rankings found in prediction data."

    # Find where the actual winner was ranked in predictions
    winner_rank = None
    winner_prob = None
    top_pick_name = rankings[0].get('name', 'Unknown')
    top_pick_prob = rankings[0].get('win_probability', 0)

    for idx, horse in enumerate(rankings, 1):
        if horse.get('name', '').lower().strip() == actual_winner:
            winner_rank = idx
            winner_prob = horse.get('win_probability', 0)
            break

    # Generate specific insight
    if winner_rank == 1:
        # Correct prediction
        return f"Model correctly identified {actual_winner} (ranked 1st with {top_pick_prob*100:.1f}% predicted probability). Strong analytical framework."
    elif winner_rank and winner_rank <= 3:
        # Close prediction
        return f"Model placed {actual_winner} at position {winner_rank} ({winner_prob*100:.1f}% probability) vs top pick {top_pick_name} ({top_pick_prob*100:.1f}%). Underestimated winning horse by ~{(top_pick_prob - winner_prob)*100:.1f} percentage points."
    elif winner_rank:
        # Missed significantly
        return f"Model ranked {actual_winner} at position {winner_rank} with only {winner_prob*100:.1f}% probability. Top pick was {top_pick_name} ({top_pick_prob*100:.1f}%). Analysis missed key factors driving the winning horse's form."
    else:
        # Winner not in predictions
        return f"Actual winner {actual_winner} was not in model's ranked horses. Model focused too heavily on pre-race favorites. Top prediction was {top_pick_name} with {top_pick_prob*100:.1f}% confidence."

def analyze_keenan_forecast(keenan_data, result):
    """Analyze Keenan's forecast predictions vs actual placings"""
    if not keenan_data or not result:
        return "No forecast data available for analysis."

    forecasts = keenan_data.get('forecast_top_3', [])
    tricasts = keenan_data.get('tricast_top_3', [])
    actual_order = result.get('full_order', [])
    actual_winner = result.get('winner', 'Unknown')

    if not forecasts:
        return "No forecast predictions found."

    # Check if any forecast matched
    top_forecast = forecasts[0].get('combination', 'Unknown') if forecasts else 'Unknown'

    if actual_order and len(actual_order) >= 2:
        actual_forecast_str = f"{actual_order[0]} > {actual_order[1]}"
        if actual_forecast_str.lower() == top_forecast.lower():
            return f"Forecast distribution correctly predicted {actual_forecast_str}. Win-place accuracy validated."
        else:
            return f"Top forecast prediction was {top_forecast}, but actual result was {actual_forecast_str}. Distribution model underestimated variance in placing combinations."

    return f"Expected forecast {top_forecast}, but actual placings diverged. Race dynamics favored unexpected combination."

def analyze_mordin_market(mordin_data, cecil_data, result):
    """Analyze Mordin's market vs model comparison"""
    if not mordin_data or not result:
        return "No market comparison data available."

    market_comparison = mordin_data.get('market_comparison', [])
    actual_winner = result.get('winner', 'Unknown')

    if not market_comparison:
        return "Market comparison data not available."

    # Find the actual winner in the market comparison
    winner_analysis = None
    for entry in market_comparison:
        if entry.get('horse', '').lower().strip() == actual_winner.lower().strip():
            winner_analysis = entry
            break

    if winner_analysis:
        divergence = winner_analysis.get('divergence') or 0
        model_prob = winner_analysis.get('model_probability') or 0
        market_prob = winner_analysis.get('market_implied_probability') or 0

        if divergence and divergence > 0.05:
            return f"Winner {actual_winner} showed significant positive divergence (+{divergence*100:.1f}): Model valued at {model_prob*100:.1f}% vs Market {market_prob*100:.1f}%. Identified genuine market inefficiency."
        elif divergence < -0.05:
            return f"Winner {actual_winner} showed negative divergence (-{abs(divergence)*100:.1f}%): Model overvalued at {model_prob*100:.1f}% vs Market {market_prob*100:.1f}%. Market sentiment more accurate than model."
        else:
            return f"Winner {actual_winner} had well-aligned model/market values (divergence {divergence*100:.1f}%). Market pricing efficient for this outcome."

    return "Actual winner not found in market analysis. Market dynamics shifted unexpectedly from pre-race state."

def generate_learnings(race_id, race_dir):
    """Generate detailed, meaningful learnings by analyzing prediction vs outcome"""

    try:
        # Load prediction data
        ruby_file = Path(race_dir) / "ruby.json"
        keenan_file = Path(race_dir) / "keenan.json"
        mordin_file = Path(race_dir) / "mordin.json"
        cecil_file = Path(race_dir) / "cecil.json"

        ruby_data = json.load(open(ruby_file)) if ruby_file.exists() else None
        keenan_data = json.load(open(keenan_file)) if keenan_file.exists() else None
        mordin_data = json.load(open(mordin_file)) if mordin_file.exists() else None
        cecil_data = json.load(open(cecil_file)) if cecil_file.exists() else None

        # Fetch actual result
        result = fetch_race_result(race_id)

        if not result:
            return None

        # Extract race metadata
        race_meta = {}
        if cecil_data:
            race_meta = cecil_data.get('race_meta', {})

        # Generate specific insights for each agent
        # Ruby data can be either nested or flat, check both structures
        ruby_analysis = ruby_data.get('analysis', {}).get('ruby') if ruby_data and 'analysis' in ruby_data else ruby_data
        keenan_analysis = keenan_data.get('analysis', {}).get('keenan') if keenan_data and 'analysis' in keenan_data else keenan_data
        mordin_analysis = mordin_data.get('analysis', {}).get('mordin') if mordin_data and 'analysis' in mordin_data else mordin_data

        ruby_insight = analyze_ruby_prediction(ruby_analysis, result)
        keenan_insight = analyze_keenan_forecast(keenan_analysis, result)
        mordin_insight = analyze_mordin_market(mordin_analysis, cecil_data, result)

        learnings = {
            "race_id": race_id,
            "race_meta": race_meta,
            "timestamp": datetime.now().isoformat(),
            "official_result": {
                "winner": result.get('winner', 'Unknown'),
                "order": result.get('full_order', [])
            },
            "analysis": {
                "ruby": {
                    "title": "Probability Analysis",
                    "insight": ruby_insight
                },
                "keenan": {
                    "title": "Forecast & Distribution",
                    "insight": keenan_insight
                },
                "mordin": {
                    "title": "Market Alignment",
                    "insight": mordin_insight
                }
            }
        }

        return learnings

    except Exception as e:
        print(f"Error generating learnings: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        return None

def main():
    if len(sys.argv) < 3:
        print("Usage: learnings-formatter-v2.py 'race_id' '/path/to/race_dir'")
        sys.exit(1)

    race_id = sys.argv[1]
    race_dir = sys.argv[2]

    learnings = generate_learnings(race_id, race_dir)
    if learnings:
        print(json.dumps(learnings, indent=2))
    else:
        sys.exit(1)

if __name__ == "__main__":
    main()
