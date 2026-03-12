import sys
import json
import requests

def upload_to_supabase(table, data):
    url = "https://txsuawougiptdlmmiasy.supabase.co/rest/v1/" + table
    headers = {
        "apikey": "",
        "Authorization": "Bearer ",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates"
    }
    
    try:
        response = requests.post(url, headers=headers, json=data)
        if response.status_code in [200, 201]:
            print(f"✅ Successfully uploaded to {table}")
        else:
            print(f"❌ Failed to upload to {table}: {response.text}", file=sys.stderr)
    except Exception as e:
        print(f"❌ Error uploading to {table}: {e}", file=sys.stderr)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        sys.exit(1)
    
    table_name = sys.argv[1]
    # Use raw string or file read to avoid shell escaping issues with complex JSON
    try:
        json_data = json.loads(sys.argv[2], strict=False)
        upload_to_supabase(table_name, json_data)
    except Exception as e:
        print(f"❌ JSON Parse Error: {e}", file=sys.stderr)
        sys.exit(1)
