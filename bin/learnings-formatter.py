#!/usr/bin/env python3
"""
Learnings Formatter: Aggregates agent feedback into dashboard-friendly format
Triggered after race-feedback completes learning analysis
"""
import json
import sys
import os
from datetime import datetime
from pathlib import Path

WS = "/home/ruby"

def format_learnings(race_id, race_dir):
    """Convert agent learnings into dashboard format"""

    try:
        # Read agent insights
        ruby_file = Path(race_dir) / "ruby.json"
        keenan_file = Path(race_dir) / "keenan.json"
        mordin_file = Path(race_dir) / "mordin.json"
        cecil_file = Path(race_dir) / "cecil.json"

        # Read learning outputs (created by race-feedback)
        ruby_learn_file = Path(f"{WS}/tmp/ruby_learn.txt")
        keenan_learn_file = Path(f"{WS}/tmp/keenan_learn.txt")
        mordin_learn_file = Path(f"{WS}/tmp/mordin_learn.txt")

        learnings = {
            "race_id": race_id,
            "timestamp": datetime.now().isoformat(),
            "agents": {}
        }

        # Collect Cecil data
        if cecil_file.exists():
            with open(cecil_file) as f:
                cecil_data = json.load(f)
                learnings["race_meta"] = cecil_data.get("race_meta", {})
                learnings["winner_predicted"] = cecil_data.get("race_meta", {}).get("track", "Unknown")

        # Collect Ruby learning
        if ruby_file.exists():
            with open(ruby_file) as f:
                ruby_data = json.load(f)
                top_pick = ruby_data.get("rankings", [{}])[0].get("name", "Unknown")
                learnings["top_predicted_horse"] = top_pick

        if ruby_learn_file.exists():
            with open(ruby_learn_file) as f:
                learnings["agents"]["ruby"] = f.read().strip()
        else:
            learnings["agents"]["ruby"] = "No learning data available"

        # Collect Keenan learning
        if keenan_learn_file.exists():
            with open(keenan_learn_file) as f:
                learnings["agents"]["keenan"] = f.read().strip()
        else:
            learnings["agents"]["keenan"] = "No learning data available"

        # Collect Mordin learning
        if mordin_learn_file.exists():
            with open(mordin_learn_file) as f:
                learnings["agents"]["mordin"] = f.read().strip()
        else:
            learnings["agents"]["mordin"] = "No learning data available"

        return learnings

    except Exception as e:
        print(f"Error formatting learnings: {e}", file=sys.stderr)
        return None

def main():
    if len(sys.argv) < 3:
        print("Usage: learnings-formatter.py 'race_id' '/path/to/race_dir'")
        sys.exit(1)

    race_id = sys.argv[1]
    race_dir = sys.argv[2]

    learnings = format_learnings(race_id, race_dir)
    if learnings:
        print(json.dumps(learnings, indent=2))
    else:
        sys.exit(1)

if __name__ == "__main__":
    main()
