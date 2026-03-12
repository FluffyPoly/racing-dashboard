import sys
import json
import requests
import os

def upload_race(race_id, race_dir):
    cecil_path = os.path.join(race_dir, "cecil.json")
    dash_path = os.path.join(race_dir, "dashboard.json")
    
    try:
        with open(cecil_path, 'r') as f: cecil = json.load(f)
        with open(dash_path, 'r') as f: dashboard = json.load(f)
        
        data = {
            'id': race_id,
            'track': cecil['race_meta']['track'],
            'post_time': cecil['race_meta']['time'],
            'race_name': cecil['race_meta']['race_name'],
            'class': cecil['race_meta']['class'],
            'going': cecil['race_meta']['going'],
            'full_data': dashboard
        }
        
        url = 'https://txsuawougiptdlmmiasy.supabase.co/rest/v1/races'
        headers = {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4c3Vhd291Z2lwdGRsbW1pYXN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NTczNDksImV4cCI6MjA4ODUzMzM0OX0.5QlkuPtjIxF3dNNUBIlgQeM3ZRw1KH-aoNOt_b9B8d0',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4c3Vhd291Z2lwdGRsbW1pYXN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NTczNDksImV4cCI6MjA4ODUzMzM0OX0.5QlkuPtjIxF3dNNUBIlgQeM3ZRw1KH-aoNOt_b9B8d0',
            'Content-Type': 'application/json',
            'Prefer': 'resolution=merge-duplicates'
        }
        r = requests.post(url, headers=headers, json=data)
        print(f"Supabase Response: {r.text}")
    except Exception as e:
        print(f"Upload Error: {e}", file=sys.stderr)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        sys.exit(1)
    upload_race(sys.argv[1], sys.argv[2])
