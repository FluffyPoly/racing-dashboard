#!/bin/bash
# Daily performance sync: Calculate metrics and push to dashboard
# Run as part of daily-startup or on-demand

WS="/home/ruby"

echo "📊 Calculating performance metrics..."

# Generate performance metrics
perf_json=$(source ~/.env && python3 "$WS/bin/performance-calculator.py" 2>/dev/null)

if [ -z "$perf_json" ]; then
    echo "❌ Failed to calculate performance metrics"
    exit 1
fi

# Save to dashboard
perf_file="$WS/racing-dashboard/data/performance/metrics.json"
mkdir -p "$(dirname "$perf_file")"
echo "$perf_json" > "$perf_file"

echo "✅ Performance metrics calculated:"
echo "$perf_json" | jq '.win_accuracy, .races_with_results' 2>/dev/null | head -5

# Sync to GitHub
cd "$WS/racing-dashboard"
git add "data/performance/metrics.json" 2>/dev/null
if git commit -m "Auto-Pilot: Update performance metrics" 2>/dev/null; then
    git push 2>/dev/null
    echo "✅ Performance metrics synced to GitHub"
else
    echo "ℹ️ Performance metrics already up to date"
fi
