#!/usr/bin/env python3
"""
Fetch REAL race results using rpscrape
Replaces mock results generator with actual data
"""
import json
import sys
import subprocess
from pathlib import Path
from datetime import datetime

def get_real_results(track, time, date_str=None):
    """Fetch actual race results from rpscrape"""

    try:
        # Use rpscrape to fetch results
        # rpscrape stores results in JSON format
        rpscrape_dir = Path("/home/ruby/rpscrape-tool")

        if not rpscrape_dir.exists():
            return None

        # Get date if not provided
        if not date_str:
            date_str = datetime.now().strftime('%Y-%m-%d')

        # Parse date parts
        year, month, day = date_str.split('-')

        # rpscrape stores results in results/ directory with date-based structure
        results_file = rpscrape_dir / f"results/{year}/{month}/{day}.json"

        if results_file.exists():
            with open(results_file) as f:
                all_results = json.load(f)

            # Find matching race by track and time
            for region in all_results.get('regions', {}).values():
                for race_track_data in region.values():
                    for race_time_data in race_track_data.values():
                        if 'winner' in race_time_data and 'order' in race_time_data:
                            # Match track and time
                            if (track.lower() in str(race_track_data).lower() and
                                time in str(race_time_data)):
                                return {
                                    'winner': race_time_data['winner'],
                                    'order': race_time_data.get('order', [])
                                }

        # If no file found, try using rpscrape CLI directly
        cmd = [
            sys.executable,
            str(rpscrape_dir / "scripts/rpscrape.py"),
            "--date", date_str,
            "--track", track
        ]

        result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)

        if result.returncode == 0 and result.stdout:
            data = json.loads(result.stdout)
            # Extract winner from the results
            if 'races' in data:
                for race in data['races']:
                    if race.get('time') == time:
                        return {
                            'winner': race.get('winner', 'Unknown'),
                            'order': race.get('order', [])
                        }

        return None

    except Exception as e:
        print(f"Error fetching results: {e}", file=sys.stderr)
        return None

def main():
    """Get real race results"""
    if len(sys.argv) < 3:
        print("Usage: rpscrape-results.py 'Track' 'HH:MM' [YYYY-MM-DD]")
        sys.exit(1)

    track = sys.argv[1]
    time = sys.argv[2]
    date_str = sys.argv[3] if len(sys.argv) > 3 else None

    result = get_real_results(track, time, date_str)

    if result:
        print(json.dumps(result))
    else:
        # Return empty dict instead of fake data
        print(json.dumps({}))
        sys.exit(1)

if __name__ == "__main__":
    main()
