import sys
import json

# Live data for Sandown 15:00 Mares' Bumper (Listed)
data = {
  "race_id": "Sandown_1500_20260307",
  "race_meta": {
    "track": "Sandown",
    "time": "15:00",
    "date": "2026-03-07",
    "race_name": "British Stallion Studs EBF Mares' Standard Open National Hunt Flat Race",
    "class": "Class 1",
    "going": "Soft (Heavy in places)"
  },
  "horses": [
    {
      "name": "Burds Of A Feather",
      "factors": {
        "OR": 0,
        "jockey": "David Bass",
        "trainer": "Max Comley",
        "early_odds": "5.5",
        "form": "1st last"
      },
      "confidence_score": 0.92,
      "data_warnings": []
    },
    {
      "name": "Millstatt Abbey",
      "factors": {
        "OR": 0,
        "jockey": "Gavin Sheehan",
        "trainer": "Noel Williams",
        "early_odds": "6.5",
        "form": "Promising"
      },
      "confidence_score": 0.90,
      "data_warnings": []
    },
    {
      "name": "Timamzel",
      "factors": {
        "OR": 0,
        "jockey": "Caoilin Quinn",
        "trainer": "Gary & Josh Moore",
        "early_odds": "7.0",
        "form": "Well-bred"
      },
      "confidence_score": 0.88,
      "data_warnings": []
    },
    {
      "name": "Lennon Grove",
      "factors": {
        "OR": 0,
        "jockey": "Harry Cobden",
        "trainer": "Paul Nicholls",
        "early_odds": "8.0",
        "form": "Leading stable"
      },
      "confidence_score": 0.94,
      "data_warnings": []
    }
  ]
}

print(json.dumps(data))
