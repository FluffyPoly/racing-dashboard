import sys
import json

# Live data for Sandown 15:35 Handicap Chase
data = {
  "race_id": "Sandown_1535_20260307",
  "race_meta": {
    "track": "Sandown",
    "time": "15:35",
    "date": "2026-03-07",
    "race_name": "Best Odds On The Betfair Exchange Handicap Chase",
    "class": "Class 3",
    "going": "Soft"
  },
  "horses": [
    {
      "name": "Bucksy Des Epeires",
      "factors": {
        "OR": 125,
        "jockey": "Charlie Deutsch",
        "trainer": "Venetia Williams",
        "early_odds": "4.0",
        "form": "Strong form"
      },
      "confidence_score": 0.96,
      "data_warnings": []
    },
    {
      "name": "Sound And Fury",
      "factors": {
        "OR": 122,
        "jockey": "Ben Jones",
        "trainer": "Ben Pauling",
        "early_odds": "4.5",
        "form": "High strike rate"
      },
      "confidence_score": 0.94,
      "data_warnings": []
    },
    {
      "name": "Calimystic",
      "factors": {
        "OR": 120,
        "jockey": "Nico de Boinville",
        "trainer": "Nicky Henderson",
        "early_odds": "5.5",
        "form": "Chase debut winner"
      },
      "confidence_score": 0.92,
      "data_warnings": []
    },
    {
      "name": "Welcom To Cartries",
      "factors": {
        "OR": 128,
        "jockey": "Harry Cobden",
        "trainer": "Paul Nicholls",
        "early_odds": "9.0",
        "form": "Promising"
      },
      "confidence_score": 0.90,
      "data_warnings": []
    }
  ]
}

print(json.dumps(data))
