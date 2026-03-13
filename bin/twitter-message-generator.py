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

            if winner.lower().strip() == top_pick.lower().strip():
                # Perfect prediction
                confidence = int(top_prob * 100)
                messages = [
                    f"🎯 Nailed it! {winner} wins at {track}. Model confidence: {confidence}%",
                    f"✅ Perfect call! {winner} at {track} - model spot-on! 🏇",
                    f"🔥 Called it! {winner} delivers at {track}",
                    f"💯 Direct hit! {winner} wins at {track}",
                ]
            elif winner_rank and winner_rank == 2:
                # Close prediction (2nd choice)
                messages = [
                    f"📈 Close! {winner} 🏆 at {track} (predicted 2nd)",
                    f"👌 Sharp! {winner} wins at {track}. Predicted 2nd - excellent model",
                    f"🎪 Plot twist! {winner} wins at {track}. 2nd pick came through",
                ]
            elif winner_rank and winner_rank <= 5:
                # Top 5 prediction
                messages = [
                    f"⭐ {winner} wins at {track}! Predicted top-5",
                    f"🔍 Value! {winner} 🏆 at {track}. Model had this ranked!",
                    f"💎 {winner} delivers at {track}. Top-5 prediction 📊",
                ]
            elif winner_rank and winner_rank <= 10:
                # Lower ranked but still predicted
                messages = [
                    f"🚀 Upset! {winner} wins at {track}. Model spotted the opportunity",
                    f"🎲 Long-shot! {winner} at {track}. Racing intelligence 🔮",
                ]
            else:
                # Not predicted
                messages = [
                    f"🐎 {winner} wins at {track}! Racing surprises never stop",
                    f"🏇 {winner} takes it at {track}",
                ]

            # Select and trim to 280 chars
            tweet = messages[hash(winner) % len(messages)]  # Consistent selection per horse

            # Ensure it's under 280 characters
            if len(tweet) > 280:
                tweet = tweet[:277] + "..."

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
