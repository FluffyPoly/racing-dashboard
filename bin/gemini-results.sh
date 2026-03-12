#!/bin/bash
race_topic="$1"

if [ -z "$race_topic" ]; then
    echo "Usage: gemini-results.sh 'Track Time'"
    exit 1
fi

# CRITICAL: Delete any previous session to prevent data leakage between races
gemini --delete-session latest > /dev/null 2>&1

today_date=$(date +"%d %B %Y")

prompt="Use your google_web_search tool to find the OFFICIAL RESULT for the '$race_topic' horse race TODAY ($today_date) in the UK/IRE. 
Output ONLY a raw STRICT JSON object with no markdown formatting. The JSON must match this structure:
{
  \"winner\": \"Winning Horse Name\",
  \"order\": [\"1st Place Name\", \"2nd Place Name\", \"3rd Place Name\"]
}
DO NOT include any conversational text. ONLY output the JSON."

raw_output=$(gemini -y -p "$prompt")

# Clean output to get just the JSON
python3 -c "
import json, sys, re
text = sys.stdin.read()
match = re.search(r'\{.*\}', text, re.DOTALL)
if match:
    try:
        data = json.loads(match.group(0))
        print(json.dumps(data))
    except:
        pass
" <<< "$raw_output"
