#!/bin/bash
# Cheltenham Early Prediction Script
TIMES=("13:20" "14:00" "14:40" "15:20" "16:00" "16:40" "17:20")
DATE_ID="20260310"
WS="/home/ruby"

for TIME in "${TIMES[@]}"; do
    RACE_TOPIC="Cheltenham $TIME"
    CLEAN_TIME=$(echo $TIME | tr -d ':')
    RACE_ID="Cheltenham_${CLEAN_TIME}_${DATE_ID}"
    TMP_JSON="$WS/tmp/${RACE_ID}_raw.json"
    
    echo "🏇 Processing EARLY prediction for $RACE_TOPIC (Tomorrow)..."
    
    # 1. Fetch Racecard - Using updated gatherer with explicit date
    tomorrow_date=$(date -d "tomorrow" +"%d %B %Y")
    bash "$WS/bin/gemini-gatherer.sh" "$RACE_TOPIC" "$tomorrow_date" > "$TMP_JSON"
    
    # 2. Run Pipeline
    if [ -f "$TMP_JSON" ] && [ $(stat -c%s "$TMP_JSON") -gt 100 ]; then
        bash "$WS/bin/race-pipeline" "$RACE_ID" "$TMP_JSON"
        echo "$RACE_ID" >> "$WS/races/state/early_cheltenham.list"
    else
        echo "❌ Failed to gather early data for $RACE_TOPIC"
    fi
done
