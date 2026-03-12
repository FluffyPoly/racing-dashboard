import sys
import json

# Live data for Ayr 15:55 Handicap Chase
data = {
  "race_id": "Ayr_1555_20260307",
  "race_meta": {
    "track": "Ayr",
    "time": "15:55",
    "date": "2026-03-07",
    "race_name": "Handicap Chase",
    "class": "Class 3",
    "going": "Soft"
  },
  "horses": [
    {
      "name": "Primoz",
      "factors": {
        "OR": 125,
        "jockey": "Derek Fox",
        "trainer": "Lucinda Russell",
        "early_odds": "2.5",
        "form": "Promising chaser"
      },
      "confidence_score": 0.96,
      "data_warnings": []
    },
    {
      "name": "Ned Tanner",
      "factors": {
        "OR": 122,
        "jockey": "Sean Quinlan",
        "trainer": "Nick Alexander",
        "early_odds": "3.75",
        "form": "Consistent at Ayr"
      },
      "confidence_score": 0.94,
      "data_warnings": []
    },
    {
      "name": "Classic Maestro",
      "factors": {
        "OR": 118,
        "jockey": "TBC",
        "trainer": "Jennie Candlish",
        "early_odds": "6.0",
        "form": "Solid form"
      },
      "confidence_score": 0.90,
      "data_warnings": []
    },
    {
      "name": "Dare To Shout",
      "factors": {
        "OR": 115,
        "jockey": "TBC",
        "trainer": "Ann Hamilton",
        "early_odds": "8.0",
        "form": "Proven stayer"
      },
      "confidence_score": 0.92,
      "data_warnings": []
    }
  ]
}

print(json.dumps(data))
