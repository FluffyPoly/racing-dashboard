import sys
import json

# Live data for Ayr 15:20 Handicap Hurdle
data = {
  "race_id": "Ayr_1520_20260307",
  "race_meta": {
    "track": "Ayr",
    "time": "15:20",
    "date": "2026-03-07",
    "race_name": "3B Crane Hire Handicap Hurdle",
    "class": "Class 4",
    "going": "Soft"
  },
  "horses": [
    {
      "name": "Triple Crown Ted",
      "factors": {
        "OR": 115,
        "jockey": "Derek Fox",
        "trainer": "Lucinda Russell",
        "early_odds": "3.0",
        "form": "Promising"
      },
      "confidence_score": 0.95,
      "data_warnings": []
    },
    {
      "name": "Gamigin",
      "factors": {
        "OR": 112,
        "jockey": "Sean Quinlan",
        "trainer": "Noel C Kelly",
        "early_odds": "4.5",
        "form": "Consistent"
      },
      "confidence_score": 0.92,
      "data_warnings": []
    },
    {
      "name": "Chanceawetmorning",
      "factors": {
        "OR": 108,
        "jockey": "Gregor Walkingshaw",
        "trainer": "Noel C Kelly",
        "early_odds": "7.0",
        "form": "Testing conditions suit"
      },
      "confidence_score": 0.88,
      "data_warnings": []
    },
    {
      "name": "Cormier",
      "factors": {
        "OR": 120,
        "jockey": "Brian Hughes",
        "trainer": "Brian Ellison",
        "early_odds": "8.0",
        "form": "Classy but weight a factor"
      },
      "confidence_score": 0.94,
      "data_warnings": []
    }
  ]
}

print(json.dumps(data))
