#!/usr/bin/env python3
"""
Performance Calculator: Tracks prediction accuracy and generates performance metrics
Runs daily to aggregate all races and calculate win rates, accuracy, etc.
"""
import json
import os
from pathlib import Path
from datetime import datetime
from collections import defaultdict

WS = "/home/ruby"
SUPABASE_URL = "https://txsuawougiptdlmmiasy.supabase.co/rest/v1"

def get_supabase_key():
    """Load Supabase key from environment"""
    with open(f"{WS}/.env") as f:
        for line in f:
            if "SUPABASE_KEY=" in line:
                return line.split('"')[1]
    return None

def calculate_performance():
    """Calculate performance metrics across all races"""

    import requests

    S_KEY = get_supabase_key()
    if not S_KEY:
        print("Error: SUPABASE_KEY not found")
        return None

    headers = {
        'apikey': S_KEY,
        'Authorization': f'Bearer {S_KEY}'
    }

    # Fetch all races from Supabase
    races_response = requests.get(f"{SUPABASE_URL}/races", headers=headers)
    races = races_response.json() if races_response.status_code == 200 else []

    # Fetch all results from Supabase
    results_response = requests.get(f"{SUPABASE_URL}/results", headers=headers)
    results = results_response.json() if results_response.status_code == 200 else []

    # Build results lookup
    results_map = {r['race_id']: r for r in results}

    # Calculate metrics
    metrics = {
        "timestamp": datetime.now().isoformat(),
        "total_races": 0,
        "races_with_results": 0,
        "correct_predictions": 0,
        "win_accuracy": 0.0,
        "by_agent": {
            "ruby": {"correct": 0, "total": 0, "accuracy": 0.0},
            "keenan": {"correct": 0, "total": 0, "accuracy": 0.0},
            "mordin": {"correct": 0, "total": 0, "accuracy": 0.0}
        },
        "by_track": defaultdict(lambda: {"correct": 0, "total": 0}),
        "by_confidence": defaultdict(lambda: {"correct": 0, "total": 0}),
        "recent_races": []
    }

    # Analyze each race
    for race in races[-100:]:  # Last 100 races
        race_id = race.get('id')
        metrics["total_races"] += 1

        if race_id not in results_map:
            continue  # No results yet

        result = results_map[race_id]
        metrics["races_with_results"] += 1

        actual_winner = result.get('winner', '').lower().strip()
        full_data = race.get('full_data', {})
        analysis = full_data.get('analysis', {})

        # Get predictions
        ruby = analysis.get('ruby', {})
        rankings = ruby.get('rankings', [])

        if not rankings:
            continue

        predicted_winner = rankings[0].get('name', '').lower().strip()
        predicted_prob = rankings[0].get('win_probability', 0)

        # Check if correct
        is_correct = actual_winner == predicted_winner
        if is_correct:
            metrics["correct_predictions"] += 1

        # Track by agent
        metrics["by_agent"]["ruby"]["total"] += 1
        if is_correct:
            metrics["by_agent"]["ruby"]["correct"] += 1

        # Track by track
        track = race.get('track', 'Unknown')
        metrics["by_track"][track]["total"] += 1
        if is_correct:
            metrics["by_track"][track]["correct"] += 1

        # Track by confidence level
        if predicted_prob >= 0.35:
            confidence = "high"
        elif predicted_prob >= 0.20:
            confidence = "medium"
        else:
            confidence = "low"

        metrics["by_confidence"][confidence]["total"] += 1
        if is_correct:
            metrics["by_confidence"][confidence]["correct"] += 1

        # Add to recent races
        metrics["recent_races"].append({
            "race_id": race_id,
            "track": track,
            "predicted": predicted_winner,
            "actual": actual_winner,
            "correct": is_correct,
            "confidence": confidence
        })

    # Calculate accuracy percentages
    if metrics["races_with_results"] > 0:
        metrics["win_accuracy"] = round(
            (metrics["correct_predictions"] / metrics["races_with_results"]) * 100, 2
        )

    for agent in metrics["by_agent"]:
        if metrics["by_agent"][agent]["total"] > 0:
            metrics["by_agent"][agent]["accuracy"] = round(
                (metrics["by_agent"][agent]["correct"] / metrics["by_agent"][agent]["total"]) * 100, 2
            )

    for track in metrics["by_track"]:
        if metrics["by_track"][track]["total"] > 0:
            metrics["by_track"][track]["accuracy"] = round(
                (metrics["by_track"][track]["correct"] / metrics["by_track"][track]["total"]) * 100, 2
            )

    for confidence in metrics["by_confidence"]:
        if metrics["by_confidence"][confidence]["total"] > 0:
            metrics["by_confidence"][confidence]["accuracy"] = round(
                (metrics["by_confidence"][confidence]["correct"] / metrics["by_confidence"][confidence]["total"]) * 100, 2
            )

    # Convert defaultdict to regular dict for JSON serialization
    metrics["by_track"] = dict(metrics["by_track"])
    metrics["by_confidence"] = dict(metrics["by_confidence"])

    return metrics

def main():
    try:
        metrics = calculate_performance()
        if metrics:
            # Output to console (will be captured and synced to dashboard)
            print(json.dumps(metrics, indent=2))

            # Also save to local file
            perf_dir = Path(f"{WS}/races/performance")
            perf_dir.mkdir(parents=True, exist_ok=True)

            perf_file = perf_dir / f"metrics_{datetime.now().strftime('%Y%m%d')}.json"
            with open(perf_file, 'w') as f:
                json.dump(metrics, f, indent=2)

            print(f"Performance metrics saved to {perf_file}", file=__import__('sys').stderr)
    except Exception as e:
        print(f"Error calculating performance: {e}", file=__import__('sys').stderr)
        __import__('sys').exit(1)

if __name__ == "__main__":
    main()
