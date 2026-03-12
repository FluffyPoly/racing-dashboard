#!/usr/bin/env python3
import csv
import json
import os
import subprocess
import sys
from datetime import datetime, timedelta
import requests

WS = "/home/ruby"
RPSCRAPE_DIR = f"{WS}/rpscrape-tool"
PYTHON_BIN = f"{RPSCRAPE_DIR}/.venv/bin/python"
S_URL = "https://txsuawougiptdlmmiasy.supabase.co/rest/v1/historical_results"
S_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4c3Vhd291Z2lwdGRsbW1pYXN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NTczNDksImV4cCI6MjA4ODUzMzM0OX0.5QlkuPtjIxF3dNNUBIlgQeM3ZRw1KH-aoNOt_b9B8d0"

def ingest_date(date_str):
    """date_str format: YYYY/MM/DD"""
    print(f"📥 Ingesting results for {date_str}...")
    
    regions = ["gb", "ire"]
    payloads = []
    
    for reg in regions:
        print(f"  🔍 Scraping {reg}...")
        # 1. Scrape
        cmd = [PYTHON_BIN, "rpscrape.py", "-d", date_str, "-r", reg]
        subprocess.run(cmd, cwd=f"{RPSCRAPE_DIR}/scripts", capture_output=True)
        
        # 2. Locate CSV
        csv_filename = date_str.replace("/", "_") + ".csv"
        csv_path = f"{RPSCRAPE_DIR}/data/region/{reg}/all/{csv_filename}"
        
        if not os.path.exists(csv_path):
            print(f"  ⚠️ No CSV found for {reg} on {date_str}")
            continue

        # 3. Parse
        with open(csv_path, mode='r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                def to_int(val):
                    try: 
                        if not val or val in ["–", ""]: return None
                        return int(val)
                    except: return None

                payload = {
                    "date": row["date"],
                    "course": row["course"],
                    "distance": row["dist"],
                    "going": row["going"],
                    "horse_name": row["horse"],
                    "jockey": row["jockey"],
                    "trainer": row["trainer"],
                    "position": to_int(row["pos"]),
                    "distance_beaten": row["btn"],
                    "official_rating": to_int(row["or"]),
                    "rpr": to_int(row["rpr"]),
                    "topspeed": to_int(row["secs"]),
                    "odds": row["dec"],
                }
                payloads.append(payload)

    # 4. Push to Supabase in batches of 100
    if not payloads:
        print(f"  ⚠️ No records found for any region on {date_str}")
        return

    headers = {
        "apikey": S_KEY,
        "Authorization": f"Bearer {S_KEY}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates"
    }
    
    for i in range(0, len(payloads), 100):
        batch = payloads[i:i+100]
        r = requests.post(S_URL, headers=headers, json=batch)
        if r.status_code not in [200, 201]:
            print(f"❌ Error uploading batch: {r.text}")
        else:
            print(f"✅ Uploaded {len(batch)} records.")

def main():
    if len(sys.argv) > 1:
        # Ingest specific date or range
        ingest_date(sys.argv[1])
    else:
        # Default: Ingest last 7 days to start
        for i in range(1, 8):
            date = (datetime.now() - timedelta(days=i)).strftime("%Y/%m/%d")
            ingest_date(date)

if __name__ == "__main__":
    main()
