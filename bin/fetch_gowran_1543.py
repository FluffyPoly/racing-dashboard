import sys
import json

# Live data for Gowran Park 15:43 Handicap Hurdle
data = {
  "race_id": "GowranPark_1543_20260307",
  "race_meta": {
    "track": "Gowran Park",
    "time": "15:43",
    "date": "2026-03-07",
    "race_name": "Holden Fleet Handicap Hurdle",
    "class": "Handicap",
    "going": "Heavy"
  },
  "horses": [
    {
      "name": "Ag Obair Go Crua",
      "factors": {
        "OR": 105,
        "jockey": "Darragh O'Keeffe",
        "trainer": "J. P. Flavin",
        "early_odds": "4.0",
        "form": "Tramore winner"
      },
      "confidence_score": 0.96,
      "data_warnings": []
    },
    {
      "name": "Minority Interest",
      "factors": {
        "OR": 102,
        "jockey": "Tiernan Power Roche",
        "trainer": "P. J. Rothwell",
        "early_odds": "6.5",
        "form": "Solid CD form"
      },
      "confidence_score": 0.94,
      "data_warnings": []
    },
    {
      "name": "Doing It In Style",
      "factors": {
        "OR": 98,
        "jockey": "Keith Donoghue",
        "trainer": "Gavin Cromwell",
        "early_odds": "7.0",
        "form": "Consistent"
      },
      "confidence_score": 0.92,
      "data_warnings": []
    },
    {
      "name": "Marlpark",
      "factors": {
        "OR": 100,
        "jockey": "Daniel King",
        "trainer": "John Patrick Ryan",
        "early_odds": "8.5",
        "form": "Improving"
      },
      "confidence_score": 0.90,
      "data_warnings": []
    }
  ]
}

print(json.dumps(data))
