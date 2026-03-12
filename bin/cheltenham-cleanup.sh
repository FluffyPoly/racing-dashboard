#!/bin/bash
# Cheltenham Early Prediction Cleanup
# Runs 1 hour before first race to allow normal T-30m pipeline to take over
WS="/home/ruby"
LIST="$WS/races/state/early_cheltenham.list"

if [ ! -f "$LIST" ]; then
    echo "No early Cheltenham predictions found to clean."
    exit 0
fi

while read -r RACE_ID; do
    echo "🧹 Cleaning early prediction for $RACE_ID..."
    
    # 1. Remove from completed.log so auto-pilot triggers again
    grep -v "${RACE_ID}_predicted" "$WS/races/state/completed.log" > "$WS/races/state/completed.log.tmp" && mv "$WS/races/state/completed.log.tmp" "$WS/races/state/completed.log"
    
    # 2. Remove local JSON data
    rm -f "$WS/racing-dashboard/data/predictions/${RACE_ID}.json"
    
    # 3. We keep DB records as they will be overwritten by merge-duplicates
done < "$LIST"

# Clear the list
rm -f "$LIST"

# Push cleanup to GitHub to clear the dashboard view
cd "$WS/racing-dashboard" && git add . && git commit -m "Cleanup: Remove early Cheltenham predictions for fresh T-30m run" && git push origin master && git checkout main && git merge master && git push origin main --force && git checkout master

echo "✅ Early Cheltenham predictions purged. System ready for live festival pipeline."
