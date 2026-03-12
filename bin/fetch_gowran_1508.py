import sys
import json

# Live data for Gowran Park 15:08 Handicap Hurdle
data = {
  "race_id": "GowranPark_1508_20260307",
  "race_meta": {
    "track": "Gowran Park",
    "time": "15:08",
    "date": "2026-03-07",
    "race_name": "BoyleSports Cheltenham Bank Builder Jackpot Handicap Hurdle",
    "class": "Handicap",
    "going": "Heavy"
  },
  "horses": [
    {
      "name": "Rebel Gold",
      "factors": {
        "OR": 135,
        "jockey": "Alan O'Sullivan",
        "trainer": "Patrick T Foley",
        "early_odds": "4.33",
        "form": "Good form"
      },
      "confidence_score": 0.95,
      "data_warnings": []
    },
    {
      "name": "Galavanting George",
      "factors": {
        "OR": 128,
        "jockey": "Keith Donoghue",
        "trainer": "Gavin Cromwell",
        "early_odds": "4.33",
        "form": "Highly rated"
      },
      "confidence_score": 0.94,
      "data_warnings": []
    },
    {
      "name": "Piccolo Player",
      "factors": {
        "OR": 125,
        "jockey": "M J Kenneally",
        "trainer": "John Patrick Ryan",
        "early_odds": "6.5",
        "form": "Solid"
      },
      "confidence_score": 0.92,
      "data_warnings": []
    },
    {
      "name": "Global Skies",
      "factors": {
        "OR": 120,
        "jockey": "Danny Gilligan",
        "trainer": "Ross O'Sullivan",
        "early_odds": "7.0",
        "form": "Improver"
      },
      "confidence_score": 0.90,
      "data_warnings": []
    },
    {
      "name": "Royal Soldier",
      "factors": {
        "OR": 122,
        "jockey": "Donagh Meyler",
        "trainer": "Thomas Gibney",
        "early_odds": "7.0",
        "form": "Consistent"
      },
      "confidence_score": 0.91,
      "data_warnings": []
    }
  ]
}

print(json.dumps(data))
