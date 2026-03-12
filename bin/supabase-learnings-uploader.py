import sys
import json
import requests
import os

def upload_learnings(race_id, race_dir):
    res_path = os.path.join(race_dir, "results.json")
    ruby_path = os.path.join(race_dir, "ruby_learn.txt")
    keenan_path = os.path.join(race_dir, "keenan_learn.txt")
    mordin_path = os.path.join(race_dir, "mordin_learn.txt")
    
    try:
        with open(res_path, 'r') as f: results = json.load(f)
        with open(ruby_path, 'r') as f: ruby_s = f.read()
        with open(keenan_path, 'r') as f: keenan_s = f.read()
        with open(mordin_path, 'r') as f: mordin_s = f.read()
        
        data = {
            'race_id': race_id,
            'results': results,
            'insights': {
                'ruby': ruby_s,
                'keenan': keenan_s,
                'mordin': mordin_s
            }
        }
        
        url = 'https://txsuawougiptdlmmiasy.supabase.co/rest/v1/learnings'
        headers = {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4c3Vhd291Z2lwdGRsbW1pYXN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NTczNDksImV4cCI6MjA4ODUzMzM0OX0.5QlkuPtjIxF3dNNUBIlgQeM3ZRw1KH-aoNOt_b9B8d0',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4c3Vhd291Z2lwdGRsbW1pYXN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NTczNDksImV4cCI6MjA4ODUzMzM0OX0.5QlkuPtjIxF3dNNUBIlgQeM3ZRw1KH-aoNOt_b9B8d0',
            'Content-Type': 'application/json'
        }
        r = requests.post(url, headers=headers, json=data)
        print(f"Supabase Response: {r.text}")
    except Exception as e:
        print(f"Upload Error: {e}", file=sys.stderr)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        sys.exit(1)
    upload_learnings(sys.argv[1], sys.argv[2])
