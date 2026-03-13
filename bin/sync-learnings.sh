#!/bin/bash
# Daily learnings sync: Aggregate all learning insights
# Called by racing-daily-startup

WS="/home/ruby"
LEARNING_DIR="$WS/races/performance"
DASHBOARD_DIR="$WS/racing-dashboard/data/learnings"

echo "📚 Aggregating learnings data..."

mkdir -p "$DASHBOARD_DIR"

# Compile all learnings files into a summary
python3 << 'EOF'
import json
from pathlib import Path
from datetime import datetime

WS = "/home/ruby"
learning_src = Path(f"{WS}/races/performance")
dashboard_dst = Path(f"{WS}/racing-dashboard/data/learnings")

# Aggregate all learning files
all_learnings = {
    "timestamp": datetime.now().isoformat(),
    "total_analyses": 0,
    "agents": {
        "ruby": {"insights": [], "count": 0},
        "keenan": {"insights": [], "count": 0},
        "mordin": {"insights": [], "count": 0}
    },
    "recent_learnings": []
}

# Scan for learnings files
for learning_file in sorted(learning_src.glob("*.json"), reverse=True)[:30]:
    try:
        with open(learning_file) as f:
            data = json.load(f)

        if "agents" not in data:
            continue

        all_learnings["total_analyses"] += 1

        for agent in ["ruby", "keenan", "mordin"]:
            if agent in data["agents"]:
                insight = data["agents"][agent]
                if insight and insight != "No learning data available":
                    all_learnings["agents"][agent]["insights"].append(insight)
                    all_learnings["agents"][agent]["count"] += 1

                    all_learnings["recent_learnings"].append({
                        "race_id": data.get("race_id", "Unknown"),
                        "agent": agent,
                        "insight": insight,
                        "timestamp": data.get("timestamp", "")
                    })
    except:
        pass

# Limit recent learnings to last 50
all_learnings["recent_learnings"] = all_learnings["recent_learnings"][:50]

# Save aggregated learnings
output_file = dashboard_dst / "summary.json"
with open(output_file, 'w') as f:
    json.dump(all_learnings, f, indent=2)

print(f"✅ Aggregated {all_learnings['total_analyses']} learning analyses")
print(f"   Ruby: {all_learnings['agents']['ruby']['count']}")
print(f"   Keenan: {all_learnings['agents']['keenan']['count']}")
print(f"   Mordin: {all_learnings['agents']['mordin']['count']}")

EOF

# Sync to GitHub
cd "$WS/racing-dashboard"
git add "data/learnings/" 2>/dev/null
if git commit -m "Auto-Pilot: Update learnings summary" 2>/dev/null; then
    git push 2>/dev/null
    echo "✅ Learnings synced to GitHub"
else
    echo "ℹ️ Learnings already up to date"
fi
