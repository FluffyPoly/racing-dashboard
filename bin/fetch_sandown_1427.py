import sys
import json

# Live data for Sandown 14:27 Imperial Cup
data = {
  "race_id": "Sandown_1427_20260307",
  "race_meta": {
    "track": "Sandown",
    "time": "14:27",
    "date": "2026-03-07",
    "race_name": "Betfair Imperial Cup Handicap Hurdle",
    "class": "Class 2",
    "going": "Soft (Heavy in places)"
  },
  "horses": [
    {
      "name": "Mondo Man",
      "factors": {
        "OR": 135,
        "jockey": "Caoilin Quinn",
        "trainer": "Gary & Josh Moore",
        "early_odds": "4.5",
        "form": "1-33L win"
      },
      "confidence_score": 0.98,
      "data_warnings": []
    },
    {
      "name": "Brace For Landing",
      "factors": {
        "OR": 132,
        "jockey": "Nico de Boinville",
        "trainer": "Nicky Henderson",
        "early_odds": "9.0",
        "form": "Consistent"
      },
      "confidence_score": 0.95,
      "data_warnings": []
    },
    {
      "name": "Wreckless Eric",
      "factors": {
        "OR": 130,
        "jockey": "Harry Skelton",
        "trainer": "Dan Skelton",
        "early_odds": "12.0",
        "form": "2nd last year"
      },
      "confidence_score": 0.94,
      "data_warnings": []
    },
    {
      "name": "Go Dante",
      "factors": {
        "OR": 138,
        "jockey": "Sean Bowen",
        "trainer": "Olly Murphy",
        "early_odds": "13.0",
        "form": "Seeking 3rd win"
      },
      "confidence_score": 0.96,
      "data_warnings": []
    },
    {
      "name": "Rubber Ball",
      "factors": {
        "OR": 125,
        "jockey": "Jack Quinlan",
        "trainer": "Neil King",
        "early_odds": "15.0",
        "form": "Improving"
      },
      "confidence_score": 0.90,
      "data_warnings": []
    }
  ]
}

print(json.dumps(data))
