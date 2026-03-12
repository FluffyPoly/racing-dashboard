#!/usr/bin/env python3
import json
import os
import subprocess
from datetime import datetime, timedelta
import time

WS = "/home/ruby"
SCHEDULE_FILE = f"{WS}/races/today_schedule.json"
STATE_FILE = f"{WS}/races/state/completed.log"

def run_command(cmd):
    print(f"Running: {cmd}")
    subprocess.run(cmd, shell=True)

def load_schedule():
    if not os.path.exists(SCHEDULE_FILE):
        return []
    with open(SCHEDULE_FILE, 'r') as f:
        try:
            return json.load(f)
        except:
            return []

def get_completed_races():
    if not os.path.exists(STATE_FILE):
        return set()
    with open(STATE_FILE, 'r') as f:
        return set(line.strip() for line in f)

def mark_completed(race_id, action):
    with open(STATE_FILE, 'a') as f:
        f.write(f"{race_id}_{action}\n")

def main():
    print(f"⏰ Supervisor Heartbeat: {datetime.now().strftime('%H:%M')}")
    schedule = load_schedule()
    completed = get_completed_races()
    now = datetime.now()

    for race in schedule:
        race_id = race['race_id']
        # Parse race time (assuming HH:MM format)
        try:
            rt = datetime.strptime(race['time'], "%H:%M").replace(year=now.year, month=now.month, day=now.day)
        except:
            continue

        # 1. PREDICTION: T-30 minutes
        if now >= (rt - timedelta(minutes=30)) and now < rt:
            if f"{race_id}_predicted" not in completed:
                print(f"🏇 Triggering Prediction for {race['track']} {race['time']}")
                # In real use, Cecil would update mock_race.json here with actual data
                run_command(f"{WS}/bin/race-pipeline '{race['track']} {race['time']}'")
                mark_completed(race_id, "predicted")

        # 2. LEARNING: T+20 minutes
        if now >= (rt + timedelta(minutes=20)):
            if f"{race_id}_learned" not in completed:
                print(f"🧠 Triggering Learning for {race_id}")
                # 1. Ask Cecil for result
                res_cmd = f"openclaw agent --agent cecil -m 'Find result for {race['track']} {race['time']} today. Output ONLY raw JSON: {{\"winner\": \"...\", \"order\": [\"1st\", \"2nd\", \"3rd\"]}}'"
                result_raw = subprocess.check_output(res_cmd, shell=True).decode()
                # 2. Run feedback
                run_command(f"{WS}/bin/race-feedback '{race_id}' '{result_raw}'")
                mark_completed(race_id, "learned")

if __name__ == "__main__":
    main()
