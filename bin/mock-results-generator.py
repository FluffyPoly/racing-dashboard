#!/usr/bin/env python3
"""
Mock Results Generator: Creates realistic race results for testing
Used when real results aren't available (simulated dates, testing, etc.)
"""
import json
import random
from pathlib import Path

def generate_mock_result(race_id, predicted_top_3):
    """Generate a mock race result"""

    # Simulate different outcome scenarios
    scenario = random.random()

    if scenario < 0.2:  # 20% chance: prediction correct (confidence builder)
        winner = predicted_top_3[0]
        order = predicted_top_3[:3] if len(predicted_top_3) >= 3 else predicted_top_3 + ["Unknown"] * (3 - len(predicted_top_3))
    elif scenario < 0.5:  # 30% chance: second choice wins
        winner = predicted_top_3[1] if len(predicted_top_3) > 1 else predicted_top_3[0]
        order = [predicted_top_3[1], predicted_top_3[0], predicted_top_3[2] if len(predicted_top_3) > 2 else "Unknown"]
    else:  # 50% chance: unexpected winner (learning opportunity)
        # Pick a random position or create new horse
        if random.random() < 0.7:
            order = list(predicted_top_3)
            random.shuffle(order)
        else:
            order = ["Unexpected Winner", predicted_top_3[0], predicted_top_3[1] if len(predicted_top_3) > 1 else "Unknown"]
        winner = order[0]

    return {
        "winner": winner,
        "order": order
    }

def main():
    """Generate mock results for races that need them"""
    import sys

    if len(sys.argv) < 3:
        print("Usage: mock-results-generator.py 'race_id' '[\"horse1\", \"horse2\", \"horse3\"]'")
        sys.exit(1)

    race_id = sys.argv[1]
    try:
        predicted = json.loads(sys.argv[2])
    except:
        print("Error parsing predicted horses JSON")
        sys.exit(1)

    result = generate_mock_result(race_id, predicted)
    print(json.dumps(result))

if __name__ == "__main__":
    main()
