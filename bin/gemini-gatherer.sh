#!/bin/bash
race_topic="$1"
target_date="${2:-$(date +"%d %B %Y")}"
today_id=$(date -d "$target_date" +"%Y%m%d")
today_iso=$(date -d "$target_date" +"%Y-%m-%d")

if [ -z "$race_topic" ]; then
    echo "Usage: gemini-gatherer.sh 'Track Time' [Date]"
    exit 1
fi

# CRITICAL: Delete any previous session to prevent data leakage between races
gemini --delete-session latest > /dev/null 2>&1

prompt="Use your google_web_search tool to find the LIVE racecard for '$race_topic' on $target_date in the UK/IRE. Extract the exact runners, jockeys, trainers, OR, and early odds.
Output ONLY a raw STRICT JSON object with no markdown formatting. The JSON must match this structure:
{
  \"race_id\": \"Track_Time_$today_id\",
  \"race_meta\": {
    \"track\": \"...\",
    \"time\": \"...\",
    \"date\": \"$today_iso\",
    \"race_name\": \"...\",
    \"class\": \"...\",
    \"going\": \"...\"
  },
  \"horses\": [
    {
      \"name\": \"...\",
      \"factors\": {
        \"OR\": 0,
        \"jockey\": \"...\",
        \"trainer\": \"...\",
        \"early_odds\": \"...\",
        \"form\": \"...\"
      },
      \"confidence_score\": 0.95,
      \"data_warnings\": []
    }
  ]
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
