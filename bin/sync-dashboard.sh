#!/bin/bash
# sync-dashboard.sh [race_id] [type: prediction|learning]
RACE_ID="$1"
TYPE="$2"
REPO_DIR="/home/ruby/racing-dashboard"

# Ensure we are in the right directory
cd "$REPO_DIR" || exit

# Stage only the data folder to keep it clean
git add data/

# Commit with a structured message
git commit -m "Auto-Pilot: Update $TYPE for $RACE_ID"

# Push to GitHub using the token-authenticated URL we set up earlier
# This is what bridges your private network to the public Vercel app
git push origin master

echo "🚀 Dashboard data synchronized to GitHub: $RACE_ID ($TYPE)"
