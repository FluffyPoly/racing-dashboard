import sys
import json

# Actual data for Ayr 14:07 obtained from search
data = {
  "race_id": "Ayr_1407_20260307",
  "race_meta": {
    "track": "Ayr",
    "time": "14:07",
    "date": "2026-03-07",
    "race_name": "Handicap Hurdle"
  },
  "horses": [
    {
      "name": "Gatineau Park",
      "factors": {
        "OR": 115,
        "jockey": "Ciaran Gethings",
        "trainer": "Kim Bailey",
        "early_odds": "2.5",
        "form": "2-2"
      },
      "confidence_score": 0.94,
      "data_warnings": []
    },
    {
      "name": "Out Of The Woods",
      "factors": {
        "OR": 112,
        "jockey": "Conner McCann",
        "trainer": "Lucinda Russell",
        "early_odds": "5.5",
        "form": "1-C&D"
      },
      "confidence_score": 0.92,
      "data_warnings": []
    },
    {
      "name": "Tashkhan",
      "factors": {
        "OR": 130,
        "jockey": "Brian Hughes",
        "trainer": "Brian Ellison",
        "early_odds": "3.0",
        "form": "Flat Class Act"
      },
      "confidence_score": 0.90,
      "data_warnings": ["Switching from flat to hurdles"]
    }
  ]
}

print(json.dumps(data))
