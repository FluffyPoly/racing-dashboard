#!/bin/bash
# Load environment variables for OpenRouter
if [ -f ~/.env ]; then
    set -a
    source ~/.env
    set +a
fi

race_input="$1"

if [ -z "$race_input" ]; then
    echo "Usage: gemini-results.sh 'race_id_or_track_time'"
    exit 1
fi

# race_input could be either race_id (e.g., "Cheltenham_1400_20260312") or race_topic (e.g., "Cheltenham 14:00")
# Convert underscores to spaces and colons back for the prompt
race_topic=$(echo "$race_input" | sed 's/_[0-9]\{8\}$//' | sed 's/_/:/g' | sed 's/:/: /')
race_id="$race_input"

today_date=$(date +"%d %B %Y")

prompt="Find the OFFICIAL RESULT for '$race_topic' horse race TODAY ($today_date) in UK/IRE.
Output ONLY this JSON (no markdown): {\"winner\": \"Horse Name\", \"order\": [\"1st\", \"2nd\", \"3rd\"]}"

# REAL RESULTS: Fetch actual race results from rpscrape
# Extract track and time from race_input for rpscrape lookup
track=$(echo "$race_input" | sed 's/_[0-9]\{8\}$//' | sed 's/_/ /g')
time=$(echo "$race_input" | grep -oE '[0-9]{4}$' | sed 's/^//' | awk '{print substr($0,1,2) ":" substr($0,3)}')

# Try rpscrape first for REAL results
python3 /home/ruby/bin/rpscrape-results.py "$track" "$time" "$(date +%Y-%m-%d)" 2>/dev/null

# Check if rpscrape returned valid results
if [ $? -eq 0 ]; then
    exit 0
fi

# If rpscrape fails (no results available yet - race not finished), return empty
# Do NOT fall back to mock data - wait for real results
exit 1
