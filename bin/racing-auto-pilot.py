#!/usr/bin/env python3
import json
import os
import os
import subprocess
from datetime import datetime, timedelta
import time
import sys
import requests

WS = "/home/ruby"
STATE_FILE = f"{WS}/races/state/completed.log"
LOG_FILE = f"{WS}/races/state/autopilot.log"
SCHEDULE_FILE = f"{WS}/races/today_schedule.json"

S_URL = "https://txsuawougiptdlmmiasy.supabase.co/rest/v1"
S_KEY = os.getenv("SUPABASE_KEY", "")

def log(msg):
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    full_msg = f"[{timestamp}] {msg}"
    print(full_msg)
    with open(LOG_FILE, 'a') as f:
        f.write(full_msg + "\n")
    sys.stdout.flush()

def load_schedule():
    if not os.path.exists(SCHEDULE_FILE): return []
    try:
        with open(SCHEDULE_FILE, 'r') as f: return json.load(f)
    except: return []

def run_command(cmd):
    log(f"Running: {cmd}")
    try:
        subprocess.run(cmd, shell=True, check=True)
        return True
    except Exception as e:
        log(f"Error running command: {e}")
        return False

def get_completed_races():
    if not os.path.exists(STATE_FILE): return set()
    with open(STATE_FILE, 'r') as f: return set(line.strip() for line in f)

def mark_completed(race_id, action):
    os.makedirs(os.path.dirname(STATE_FILE), exist_ok=True)
    with open(STATE_FILE, 'a') as f: f.write(f"{race_id}_{action}\n")

def check_shutdown_request():
    """Check if graceful shutdown has been requested"""
    shutdown_file = f"{WS}/races/state/SHUTDOWN_REQUESTED"
    if os.path.exists(shutdown_file):
        log("[SHUTDOWN] Graceful shutdown requested via flag file")
        try:
            os.remove(shutdown_file)
        except:
            pass
        return True
    return False

def main():
    log("Racing Intelligence Auto-Pilot Daemon Active")

    while True:
        # Check for graceful shutdown request
        if check_shutdown_request():
            log("[SHUTDOWN] Exiting cleanly...")
            sys.exit(0)

        try:
            schedule = load_schedule()
            completed = get_completed_races()
            now = datetime.now()

            for race in schedule:
                track = race['track']
                rtime_str = race['time']
                
                # STABLE ID GENERATION (Harmonized with daily-init)
                datestr = datetime.now().strftime('%Y%m%d')
                clean_track = "".join(filter(str.isalnum, track))
                clean_time = "".join(filter(str.isalnum, rtime_str))
                race_id = f"{clean_track}_{clean_time}_{datestr}"
                race_topic = f"{track} {rtime_str}"

                try:
                    rt = datetime.strptime(rtime_str, "%H:%M").replace(year=now.year, month=now.month, day=now.day)
                except: continue

                # 1. PREDICTION: T-30 minutes
                if now >= (rt - timedelta(minutes=30)) and now < rt:
                    if f"{race_id}_predicted" not in completed:
                        log(f"🏇 TRIGGER: Prediction for {race_topic}")
                        tmp_json = f"{WS}/tmp/{race_id}_raw.json"

                        # Ensure tmp dir exists
                        os.makedirs(f"{WS}/tmp", exist_ok=True)

                        # Tier 1: rpscrape-gatherer (via race-pipeline gather logic)
                        track = race['track']
                        time_str = race['time']
                        run_command(f"python3 {WS}/bin/rpscrape-gatherer.py '{track}' '{time_str}' '{race_id}' > '{tmp_json}'")
                        
                        if os.path.exists(tmp_json) and os.path.getsize(tmp_json) > 10:
                            if run_command(f"bash {WS}/bin/race-pipeline '{race_id}' '{tmp_json}'"):
                                mark_completed(race_id, "predicted")
                        else:
                            log(f"⚠️ Failed to gather data for {race_topic}")

                # 2. RESULTS & LEARNING: T+20 minutes
                # TODO: Replace gemini-results.sh with agent-based results gathering to avoid Gemini CLI quota exhaustion
                # For now, skip this phase until results gathering is refactored to use OpenClaw agents
                if now >= (rt + timedelta(minutes=20)) and now < (rt + timedelta(minutes=300)):
                    if f"{race_id}_predicted" in completed and f"{race_id}_learned" not in completed:
                        log(f"⏭️  SKIPPED: Learning for {race_topic} (pending agent-based results gathering)")
                        mark_completed(race_id, "learned")
                        # TODO: Implement via agent (e.g., use Cecil or dedicated agent to fetch race results)
                        # res_json_str = subprocess.check_output(f"bash {WS}/bin/gemini-results.sh '{race_topic}'", shell=True).decode().strip()
                        # if res_json_str and len(res_json_str) > 10:
                        #     res_data = json.loads(res_json_str)
                        #     payload = {"race_id": race_id, "winner": res_data['winner'], "full_order": res_data['order']}
                        #     headers = {"apikey": S_KEY, "Authorization": f"Bearer {S_KEY}", "Content-Type": "application/json", "Prefer": "resolution=merge-duplicates"}
                        #     requests.post(f"{S_URL}/results", headers=headers, json=payload)
                        #     if run_command(f"bash {WS}/bin/race-feedback '{race_id}'"):
                        #         mark_completed(race_id, "learned")

        except Exception as e:
            log(f"CRITICAL LOOP ERROR: {e}")
            
        time.sleep(60)

if __name__ == "__main__":
    main()
