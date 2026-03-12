import sys
import json

# Live data for Gowran Park 14:34 Mares Maiden Hurdle
data = {
  "race_id": "GowranPark_1434_20260307",
  "race_meta": {
    "track": "Gowran Park",
    "time": "14:34",
    "date": "2026-03-07",
    "race_name": "William Hill Each Way Extra Challenge Series Mares Maiden Hurdle",
    "class": "Maiden",
    "going": "Heavy"
  },
  "horses": [
    {
      "name": "Likealightswitch",
      "factors": {
        "OR": 115,
        "jockey": "Harry Sexton",
        "trainer": "Adrian Sexton",
        "early_odds": "1.25",
        "form": "2nd last time"
      },
      "confidence_score": 0.98,
      "data_warnings": []
    },
    {
      "name": "Shesakindofmagic",
      "factors": {
        "OR": 110,
        "jockey": "Miss A. B. O'Connor",
        "trainer": "Anthony McCann",
        "early_odds": "2.75",
        "form": "Consistent"
      },
      "confidence_score": 0.95,
      "data_warnings": []
    },
    {
      "name": "Chautuaqua",
      "factors": {
        "OR": 105,
        "jockey": "D. G. Hogan",
        "trainer": "Denis Gerard Hogan",
        "early_odds": "6.0",
        "form": "Solid"
      },
      "confidence_score": 0.92,
      "data_warnings": []
    },
    {
      "name": "Rebel Queen",
      "factors": {
        "OR": 102,
        "jockey": "Mr. M. J. Kenneally",
        "trainer": "Colin Motherway",
        "early_odds": "7.0",
        "form": "Improving"
      },
      "confidence_score": 0.90,
      "data_warnings": []
    }
  ]
}

print(json.dumps(data))
