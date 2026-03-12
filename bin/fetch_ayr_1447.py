import sys
import json

# Live data for Ayr 14:47 Mares' Handicap Hurdle
data = {
  "race_id": "Ayr_1447_20260307",
  "race_meta": {
    "track": "Ayr",
    "time": "14:47",
    "date": "2026-03-07",
    "race_name": "Mothers Day Lunch At Western House Mares' Handicap Hurdle",
    "class": "Class 4",
    "going": "Soft"
  },
  "horses": [
    {
      "name": "Bollin Matilda",
      "factors": {
        "OR": 105,
        "jockey": "Theo Gillard",
        "trainer": "Donald Whillans",
        "early_odds": "3.0",
        "form": "2-last time"
      },
      "confidence_score": 0.96,
      "data_warnings": []
    },
    {
      "name": "Keep On Cobbling",
      "factors": {
        "OR": 114,
        "jockey": "Ciaran Gethings",
        "trainer": "Henry Daly",
        "early_odds": "4.0",
        "form": "1-Nov"
      },
      "confidence_score": 0.92,
      "data_warnings": ["102-day break"]
    },
    {
      "name": "Fox's Fancy",
      "factors": {
        "OR": 120,
        "jockey": "Derek Fox",
        "trainer": "Lucinda Russell",
        "early_odds": "5.0",
        "form": "Consistent"
      },
      "confidence_score": 0.94,
      "data_warnings": []
    },
    {
      "name": "Tread Softly Now",
      "factors": {
        "OR": 110,
        "jockey": "Charlie Maggs",
        "trainer": "Ian Duncan",
        "early_odds": "6.0",
        "form": "CD Winner"
      },
      "confidence_score": 0.90,
      "data_warnings": []
    }
  ]
}

print(json.dumps(data))
