#!/usr/bin/env python3
"""
Dynamic Twitter Message Generator
Creates contextual, varied tweets based on race-specific factors
"""
import json
import sys
from pathlib import Path

def generate_twitter_message(race_id, race_dir, winner):
    """Generate a unique, contextual tweet for each winning prediction"""

    try:
        # Load prediction data
        ruby_file = Path(race_dir) / "ruby.json"
        cecil_file = Path(race_dir) / "cecil.json"

        ruby_data = json.load(open(ruby_file)) if ruby_file.exists() else None
        cecil_data = json.load(open(cecil_file)) if cecil_file.exists() else None

        # Extract context
        track = cecil_data.get('race_meta', {}).get('track', 'Unknown').replace('(', '').replace(')', '').strip() if cecil_data else 'Unknown'

        # Analyze confidence level
        if ruby_data:
            rankings = ruby_data.get('rankings', [])
            top_pick = rankings[0].get('name', '') if rankings else ''
            top_prob = rankings[0].get('win_probability', 0) if rankings else 0

            # Find winner's ranking
            winner_rank = None
            for idx, horse in enumerate(rankings, 1):
                if horse.get('name', '').lower().strip() == winner.lower().strip():
                    winner_rank = idx
                    break

            # Generate varied messages based on prediction accuracy
            messages = []

            # Dashboard URL for engagement
            dashboard_url = "racing-dashboard-murex.vercel.app"
            hashtags = " #HorseRacing #RacingPredictions #AI"

            if winner.lower().strip() == top_pick.lower().strip():
                # Perfect prediction
                confidence = int(top_prob * 100)
                messages = [
                    f"🎯 Nailed it! {winner} wins at {track}. Model confidence: {confidence}% 🏇 {dashboard_url}{hashtags}",
                    f"✅ Perfect call! {winner} at {track} - model spot-on! Verified: {dashboard_url}{hashtags}",
                    f"🔥 {winner} delivers at {track}. Prediction was 🎯 See more: {dashboard_url}{hashtags}",
                ]
            elif winner_rank and winner_rank == 2:
                # Close prediction (2nd choice)
                messages = [
                    f"📈 {winner} 🏆 at {track} - predicted 2nd! Nearly perfect. {dashboard_url}{hashtags}",
                    f"👌 Sharp analysis! {winner} wins. Predicted 2nd. Strong model. {dashboard_url}{hashtags}",
                    f"🎪 {winner} wins at {track}! Our 2nd pick came through. {dashboard_url}{hashtags}",
                ]
            elif winner_rank and winner_rank <= 5:
                # Top 5 prediction
                messages = [
                    f"⭐ {winner} wins at {track}! Predicted top-5 📊 {dashboard_url}{hashtags}",
                    f"🔍 Value! {winner} 🏆 at {track}. Model ranked this horse! {dashboard_url}{hashtags}",
                    f"💎 {winner} delivers at {track}. Smart pick ranked by AI {dashboard_url}{hashtags}",
                ]
            elif winner_rank and winner_rank <= 10:
                # Lower ranked but still predicted
                messages = [
                    f"🚀 {winner} wins at {track}! Model spotted this 🐎 {dashboard_url}{hashtags}",
                    f"🎲 {winner} at {track}. Racing intelligence in action {dashboard_url}{hashtags}",
                ]
            else:
                # Not predicted
                messages = [
                    f"🐎 {winner} wins at {track}! Racing insights: {dashboard_url}{hashtags}",
                    f"🏇 {winner} takes it at {track}. Predictions: {dashboard_url}{hashtags}",
                ]

            # Select message (consistent per horse)
            tweet = messages[hash(winner) % len(messages)]

            # Trim to 280 chars if needed
            if len(tweet) > 280:
                # Remove hashtags if over limit
                tweet_base = tweet.replace(hashtags, "").strip()
                tweet_short = tweet_base + f" {dashboard_url}"
                if len(tweet_short) > 280:
                    tweet_short = tweet_base[:260] + f"... {dashboard_url}"
                tweet = tweet_short

            return tweet

    except Exception as e:
        pass

    # Fallback
    return f"🏇 {winner} wins!"

def main():
    if len(sys.argv) < 4:
        print("Usage: twitter-message-generator.py 'race_id' '/path/to/race_dir' 'winner_name'")
        sys.exit(1)

    race_id = sys.argv[1]
    race_dir = sys.argv[2]
    winner = sys.argv[3]

    message = generate_twitter_message(race_id, race_dir, winner)
    print(message)

if __name__ == "__main__":
    main()
