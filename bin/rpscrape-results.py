#!/usr/bin/env python3
"""
Fetch REAL race results from rpscrape ONLY
NO mock data. NO hallucination. ONLY real data.
If unavailable, caller should retry in 5 minutes.
"""
import json
import sys
import subprocess
from pathlib import Path
from datetime import datetime

def get_real_results(track, time, date_str=None):
    """Fetch ACTUAL race results from rpscrape - ONLY SOURCE OF TRUTH"""

    try:
        rpscrape_dir = Path("/home/ruby/rpscrape-tool")
        if not rpscrape_dir.exists():
            return None

        if not date_str:
            date_str = datetime.now().strftime('%Y-%m-%d')

        year, month, day = date_str.split('-')
        results_file = rpscrape_dir / f"results/{year}/{month}/{day}.json"

        # Only return results if file exists and contains real data
        if results_file.exists():
            with open(results_file) as f:
                all_results = json.load(f)

            # Search for matching race
            for region_data in all_results.get('regions', {}).values():
                for track_data in region_data.values():
                    for race_time_data in track_data.values():
                        if 'winner' in race_time_data:
                            return {
                                'winner': race_time_data['winner'],
                                'order': race_time_data.get('order', [])
                            }

        # Try rpscrape CLI if file not available yet
        cmd = [
            sys.executable,
            str(rpscrape_dir / "scripts/rpscrape.py"),
            "--date", date_str,
            "--track", track
        ]

        result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)

        if result.returncode == 0 and result.stdout:
            data = json.loads(result.stdout)
            if 'races' in data:
                for race in data['races']:
                    if race.get('time') == time and 'winner' in race:
                        return {
                            'winner': race['winner'],
                            'order': race.get('order', [])
                        }

        # NO RESULTS AVAILABLE YET - Return None, caller will retry
        return None

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        return None

def main():
    """Fetch real results or return nothing"""
    if len(sys.argv) < 3:
        print("Usage: rpscrape-results.py 'Track' 'HH:MM' [YYYY-MM-DD]")
        sys.exit(1)

    track = sys.argv[1]
    time = sys.argv[2]
    date_str = sys.argv[3] if len(sys.argv) > 3 else None

    result = get_real_results(track, time, date_str)

    if result:
        print(json.dumps(result))
        sys.exit(0)
    else:
        # No results available - caller should retry in 5 minutes
        sys.exit(1)

if __name__ == "__main__":
    main()
