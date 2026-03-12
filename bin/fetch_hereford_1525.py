import sys
import json

# Live data for Hereford 15:25 Handicap Hurdle
data = {
  "race_id": "Hereford_1525_20260307",
  "race_meta": {
    "track": "Hereford",
    "time": "15:25",
    "date": "2026-03-07",
    "race_name": "Fairplay Daily Price Boosts Novices' Limited Handicap Hurdle",
    "class": "Class 5",
    "going": "Good to Soft"
  },
  "horses": [
    {
      "name": "By The Grace",
      "factors": {
        "OR": 95,
        "jockey": "Daniel Williams",
        "trainer": "Nicky Henderson",
        "early_odds": "3.0",
        "form": "4th last"
      },
      "confidence_score": 0.96,
      "data_warnings": []
    },
    {
      "name": "Neeps And Tatties",
      "factors": {
        "OR": 92,
        "jockey": "Finn Lambert",
        "trainer": "Richard Phillips",
        "early_odds": "7.5",
        "form": "Consistent"
      },
      "confidence_score": 0.92,
      "data_warnings": []
    },
    {
      "name": "Hey Flint",
      "factors": {
        "OR": 100,
        "jockey": "James Turner",
        "trainer": "Nigel Twiston-Davies",
        "early_odds": "9.0",
        "form": "Handicap debut"
      },
      "confidence_score": 0.94,
      "data_warnings": []
    },
    {
      "name": "Churchman",
      "factors": {
        "OR": 88,
        "jockey": "Jack Hogan",
        "trainer": "Alastair Ralph",
        "early_odds": "9.0",
        "form": "Each-way hope"
      },
      "confidence_score": 0.90,
      "data_warnings": []
    }
  ]
}

print(json.dumps(data))
