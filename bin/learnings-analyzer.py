#!/usr/bin/env python3
"""
Generate meaningful learnings from race prediction vs actual outcome
"""
import json
import sys

def generate_learnings(prediction_data, results_data):
    """Generate actionable insights from prediction vs actual result"""

    try:
        # Extract key data
        ruby_rankings = prediction_data.get('analysis', {}).get('ruby', {}).get('rankings', [])
        keenan_data = prediction_data.get('analysis', {}).get('keenan', {})
        mordin_data = prediction_data.get('analysis', {}).get('mordin', {}).get('market_comparison', [])
        race_meta = prediction_data.get('meta', {})

        winner = results_data.get('winner', 'Unknown')

        if not ruby_rankings:
            return {'ruby': 'No ranking data available', 'keenan': 'No distribution data', 'mordin': 'No market data'}

        # RUBY ANALYSIS: Probability accuracy
        top_pick = ruby_rankings[0]
        top_pick_name = top_pick.get('name', '')
        top_prob = top_pick.get('win_probability', 0)

        # Find actual winner in rankings
        winner_rank = None
        winner_prob = None
        for idx, horse in enumerate(ruby_rankings, 1):
            if horse.get('name', '').lower().strip() == winner.lower().strip():
                winner_rank = idx
                winner_prob = horse.get('win_probability', 0)
                break

        # Generate Ruby insight
        if winner_rank == 1:
            ruby_insight = f"✓ Perfect prediction: {winner} was top pick at {int(top_prob*100)}% confidence. Model accuracy validated."
        elif winner_rank and winner_rank <= 3:
            ruby_insight = f"Near miss: {winner} ranked #{winner_rank} at {int(winner_prob*100)}% probability. Model identified strong contender but top pick ({top_pick_name}) underperformed."
        elif winner_rank and winner_rank <= 5:
            ruby_insight = f"Partial hit: {winner} ranked #{winner_rank}. Model's top-5 identification worked; recalibrate ranking weights for mid-tier horses."
        elif winner_rank:
            ruby_insight = f"Miss: {winner} ranked #{winner_rank}. Top pick {top_pick_name} ({int(top_prob*100)}%) incorrect. Review spotlight analysis and form trends."
        else:
            ruby_insight = f"Outlier: {winner} was not in top rankings. Check for data gaps or unexpected form changes not captured in analysis."

        # KEENAN ANALYSIS: Distribution accuracy
        most_prob_winner = keenan_data.get('most_probable_winner', {})
        predicted_win_combo = most_prob_winner.get('horse', 'Unknown')

        if predicted_win_combo.lower() == winner.lower():
            keenan_insight = f"✓ Forecast aligned: Predicted winner {predicted_win_combo} matched result. Distribution model calibrated correctly."
        else:
            forecast_top3 = keenan_data.get('forecast_top_3', [])
            winner_in_forecast = any(predicted_win_combo in str(combo.get('combination', '')) for combo in forecast_top3)
            if winner_in_forecast:
                keenan_insight = f"Placement accuracy: Winner in top-3 forecast combinations. Reorder probability distribution weights; top pick order needs adjustment."
            else:
                pace = keenan_data.get('pace_analysis', {}).get('type', 'Unknown')
                keenan_insight = f"Pace mismatch: Predicted {predicted_win_combo}, got {winner}. Pace analysis ({pace}) may have underweighted early/late runners. Review pace interactions."

        # MORDIN ANALYSIS: Market calibration
        model_odds_for_winner = None
        market_implied = None

        for comp in mordin_data:
            if comp.get('horse', '').lower() == winner.lower():
                model_odds_for_winner = comp.get('model_probability', 0)
                market_implied = comp.get('market_implied_probability', 0)
                break

        if model_odds_for_winner and market_implied:
            divergence = model_odds_for_winner - market_implied
            if abs(divergence) < 0.05:
                mordin_insight = f"✓ Market alignment: Model and market agreed (~{int(model_odds_for_winner*100)}%). Odds efficient on {winner}."
            elif divergence > 0:
                mordin_insight = f"Value identified: Model underrated {winner} vs market ({int(model_odds_for_winner*100)}% vs {int(market_implied*100)}% implied). Good edge captured."
            else:
                mordin_insight = f"Market caution justified: Model overrated {winner} ({int(model_odds_for_winner*100)}% vs {int(market_implied*100)}% market). Consider late market movements in future."
        else:
            mordin_insight = f"Market data incomplete for winner analysis. Check odds feed and late-money detection."

        return {
            'ruby': ruby_insight,
            'keenan': keenan_insight,
            'mordin': mordin_insight
        }

    except Exception as e:
        return {
            'ruby': f'Analysis error: {str(e)[:50]}',
            'keenan': 'Unable to process distribution data',
            'mordin': 'Unable to analyze market data'
        }

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(json.dumps({'ruby': 'No data provided', 'keenan': 'No data provided', 'mordin': 'No data provided'}))
        sys.exit(0)

    # Read prediction and results from args
    try:
        prediction_data = json.loads(sys.argv[1])
        results_data = json.loads(sys.argv[2])
        learnings = generate_learnings(prediction_data, results_data)
        print(json.dumps(learnings))
    except Exception as e:
        print(json.dumps({'ruby': f'Error: {e}', 'keenan': 'Parse error', 'mordin': 'Data error'}))
