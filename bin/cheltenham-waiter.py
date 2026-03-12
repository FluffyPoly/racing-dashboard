#!/usr/bin/env python3
import time
from datetime import datetime
import subprocess
import os
import sys

# Target: 10:00 AM UTC Tomorrow (March 10)
target_time = datetime(2026, 3, 10, 10, 0)
WS = "/home/ruby"

def log(msg):
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    print(f"[{timestamp}] {msg}")
    sys.stdout.flush()

log(f"🚀 Master Festival Waiter Active. Targeting: {target_time} UTC")

while True:
    now = datetime.now()
    
    # NEW: Nightly Recap Trigger (9:00 PM UTC)
    if now.hour == 21 and now.minute == 0:
        log("🌙 9:00 PM Reached. Generating Daily Intelligence Recap...")
        subprocess.run(["python3", f"{WS}/bin/daily-recap.py"])
        # Sleep 65s to avoid double-triggering
        time.sleep(65)
        continue

    if now >= target_time:
        log("⏰ Target time 10:00 AM reached. Initiating Full Auto-Mode...")
        
        # 1. Purge the early Cheltenham predictions
        log("🧹 Step 1: Purging early Cheltenham predictions...")
        subprocess.run(["bash", f"{WS}/bin/cheltenham-cleanup.sh"])
        
        # 2. Initialize today's master schedule
        log("📅 Step 2: Initializing Master Schedule for the day...")
        subprocess.run(["bash", f"{WS}/bin/race-daily-init"])
        
        # 3. Ensure Auto-Pilot is active and fresh
        log("🏇 Step 3: Restarting Auto-Pilot Daemon...")
        subprocess.run(["pkill", "-f", "racing-auto-pilot.py"])
        time.sleep(2)
        subprocess.Popen(["nohup", "python3", f"{WS}/bin/racing-auto-pilot.py"], 
                         stdout=open(os.devnull, 'w'), 
                         stderr=open(os.devnull, 'w'), 
                         preexec_fn=os.setpgrp)
        
        log("✅ Full Auto-Mode Enabled. System is now autonomous.")
        break
    
    # Sleep 5 minutes unless close to target
    diff = (target_time - now).total_seconds()
    if diff > 300:
        time.sleep(300)
    else:
        time.sleep(10)

log("🏁 Waiter task completed successfully.")
