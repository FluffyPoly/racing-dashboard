#!/usr/bin/env python3
import json
import sys
import os
import subprocess
from datetime import datetime
import requests

WS = "/home/ruby"
RPSCRAPE_DIR = f"{WS}/rpscrape-tool"
PYTHON_BIN = f"{RPSCRAPE_DIR}/.venv/bin/python"
S_URL = "https://txsuawougiptdlmmiasy.supabase.co/rest/v1/historical_results"
S_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4c3Vhd291Z2lwdGRsbW1pYXN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NTczNDksImV4cCI6MjA4ODUzMzM0OX0.5QlkuPtjIxF3dNNUBIlgQeM3ZRw1KH-aoNOt_b9B8d0"

def get_horse_history(horse_name):
    """Fetch last 5 runs from Supabase"""
    headers = {
        "apikey": S_KEY,
        "Authorization": f"Bearer {S_KEY}",
        "Content-Type": "application/json"
    }
    # Clean horse name for query (handle apostrophes)
    clean_name = horse_name.replace("'", "''")
    url = f"{S_URL}?horse_name=eq.{clean_name}&order=date.desc&limit=5"
    try:
        r = requests.get(url, headers=headers)
        if r.status_code == 200:
            return r.json()
    except Exception as e:
        print(f"Error fetching history for {horse_name}: {e}", file=sys.stderr)
    return []

def get_racecard(track, time, date_str=None):
    if not date_str:
        date_str = datetime.now().strftime("%Y-%m-%d")
    
    # 1. Ensure fresh data for the day
    json_path = f"{RPSCRAPE_DIR}/racecards/{date_str}.json"
    
    if not os.path.exists(json_path):
        print(f"Fetching fresh racecards for {date_str}...", file=sys.stderr)
        subprocess.run([PYTHON_BIN, "racecards.py", "--day", "1", "--region", "gb"], cwd=f"{RPSCRAPE_DIR}/scripts", capture_output=True)
        subprocess.run([PYTHON_BIN, "racecards.py", "--day", "1", "--region", "ire"], cwd=f"{RPSCRAPE_DIR}/scripts", capture_output=True)

    if not os.path.exists(json_path):
        return None

    with open(json_path, 'r') as f:
        data = json.load(f)

    for region in data:
        for r_track in data[region]:
            if track.lower() in r_track.lower():
                if time in data[region][r_track]:
                    return data[region][r_track][time]
    return None

def convert_to_pipeline_format(rp_race, race_id):
    meta = {
        "track": rp_race["course"],
        "time": rp_race["off_time"],
        "date": rp_race["date"],
        "race_name": rp_race["race_name"],
        "class": f"Class {rp_race['race_class']}" if rp_race['race_class'] else rp_race.get("pattern", "Unknown"),
        "going": rp_race["going"],
        "distance": rp_race["distance"],
        "prize": rp_race["prize"]
    }
    
    horses = []
    for runner in rp_race["runners"]:
        if runner.get("non_runner"): continue
        
        name = runner["name"]
        print(f"  📊 Enriching {name} with historical context...", file=sys.stderr)
        history = get_horse_history(name)
        
        horses.append({
            "name": name,
            "performance_history": history,
            "factors": {
                "OR": runner.get("ofr", 0) or 0,
                "jockey": runner["jockey"],
                "trainer": runner["trainer"],
                "early_odds": "N/A",
                "form": runner["form"],
                "age": runner["age"],
                "weight": runner["lbs"],
                "spotlight": runner.get("spotlight", ""),
                "comment": runner.get("comment", ""),
                "rpr": runner.get("rpr", 0)
            }
        })
        
    return {
        "race_id": race_id,
        "race_meta": meta,
        "horses": horses
    }

def main():
    if len(sys.argv) < 3:
        print("Usage: rpscrape-gatherer.py 'Track' 'Time' [race_id]")
        sys.exit(1)
        
    track = sys.argv[1]
    time = sys.argv[2]
    race_id = sys.argv[3] if len(sys.argv) > 3 else f"{track}_{time.replace(':','')}_{datetime.now().strftime('%Y%m%d')}"
    
    rp_race = get_racecard(track, time)
    if not rp_race:
        print(f"Error: Race {track} {time} not found in rpscrape data.")
        sys.exit(1)
        
    pipeline_data = convert_to_pipeline_format(rp_race, race_id)
    print(json.dumps(pipeline_data, indent=2))

if __name__ == "__main__":
    main()
