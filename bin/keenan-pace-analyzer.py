#!/usr/bin/env python3
"""
KEENAN PACE ANALYZER
Systematic race shape calculation based on horse data
Determines pace profile, sectional dominance, and distribution dynamics
"""
import json
import sys
from pathlib import Path

def analyze_pace_profile(ruby_data, cecil_data):
    """Analyze pace dynamics from horse data"""

    try:
        horses = cecil_data.get('horses', [])
        rankings = ruby_data.get('rankings', [])
        race_meta = cecil_data.get('race_meta', {})
        distance = race_meta.get('distance', '1m')

        if not horses or not rankings:
            return None

        # Create lookup for horse data
        horse_map = {h['name']: h for h in horses}
        rank_map = {r['name']: {'rank': i+1, 'prob': r.get('win_probability', 0)}
                   for i, r in enumerate(rankings)}

        # CLASSIFY HORSES BY RACING STYLE
        pace_makers = []      # Early speed, likely to lead
        middle_movers = []    # Mid-race challengers
        closers = []          # Strong finishers

        for horse_name, horse_data in horse_map.items():
            if horse_name not in rank_map:
                continue

            spotlight = horse_data.get('factors', {}).get('spotlight', '').lower()
            comment = horse_data.get('factors', {}).get('comment', '').lower()

            # Detect racing style from text
            is_pace_maker = any(word in spotlight + comment for word in
                              ['lead', 'front', 'pace', 'early', 'quick start', 'early speed'])
            is_closer = any(word in spotlight + comment for word in
                          ['finish', 'late run', 'strong finish', 'close home', 'final furlong'])
            is_middle = any(word in spotlight + comment for word in
                          ['challenge', 'mid-race', 'well-suited', 'improve'])

            horse_info = {
                'name': horse_name,
                'rank': rank_map[horse_name]['rank'],
                'probability': rank_map[horse_name]['prob'],
                'style_indicators': []
            }

            if is_pace_maker:
                pace_makers.append(horse_info)
                horse_info['style_indicators'].append('PACE_MAKER')
            if is_closer:
                closers.append(horse_info)
                horse_info['style_indicators'].append('CLOSER')
            if is_middle:
                middle_movers.append(horse_info)
                horse_info['style_indicators'].append('MIDDLE_MOVER')

            # Default classification if no clear style
            if not horse_info['style_indicators']:
                # Classify by ranking - top horses tend to win from pace
                if horse_info['rank'] <= 3:
                    pace_makers.append(horse_info)
                    horse_info['style_indicators'].append('FORM_BASED')
                else:
                    closers.append(horse_info)
                    horse_info['style_indicators'].append('FORM_BASED')

        # DETERMINE PACE TYPE
        num_pace_makers = len(pace_makers)

        if num_pace_makers >= 2:
            pace_type = "FAST"
            pace_insight = f"Competitive early pace ({num_pace_makers} pace-makers) → Favors strong finishers"
        elif num_pace_makers == 1:
            pace_type = "MODERATE"
            pace_insight = f"Lone pace-maker {pace_makers[0]['name']} may struggle → Closer threat"
        else:
            pace_type = "SLOW"
            pace_insight = "No defined pace-maker → Early leader advantage"

        # PREDICT SECTIONAL DOMINANCE
        early_leader = pace_makers[0] if pace_makers else middle_movers[0] if middle_movers else rankings[0]
        strongest_finisher = closers[0] if closers else rankings[0]

        # CALCULATE FORECAST COMBINATIONS (1-2)
        # Vary based on pace dynamics
        forecast_combos = []

        if pace_type == "FAST" and closers:
            # Fast pace → closers finish strong
            for closer in closers[:2]:
                for second in middle_movers[:2] + pace_makers[:1]:
                    if closer['name'] != second['name']:
                        combo_prob = (closer['probability'] * 0.7) * (second['probability'] * 0.6)
                        forecast_combos.append({
                            'combination': f"{closer['name']} > {second['name']}",
                            'probability': min(combo_prob, 0.25),
                            'reasoning': 'Fast pace sets up closer finish'
                        })
        else:
            # Normal pace → form horses win
            for first in rankings[:3]:
                for second in rankings[1:4]:
                    if first['name'] != second['name']:
                        combo_prob = first.get('win_probability', 0) * second.get('win_probability', 0) * 2
                        forecast_combos.append({
                            'combination': f"{first['name']} > {second['name']}",
                            'probability': min(combo_prob, 0.25),
                            'reasoning': 'Form horses dominate'
                        })

        # Sort and take top 3
        forecast_combos.sort(key=lambda x: x['probability'], reverse=True)
        forecast_combos = forecast_combos[:3]

        # CALCULATE TRICAST COMBINATIONS (1-2-3)
        tricast_combos = []
        for first in rankings[:3]:
            for second in rankings[1:4]:
                for third in rankings[1:5]:
                    if len(set([first['name'], second['name'], third['name']])) == 3:
                        combo_prob = (first.get('win_probability', 0) *
                                    second.get('win_probability', 0) *
                                    third.get('win_probability', 0) * 3)
                        tricast_combos.append({
                            'combination': f"{first['name']} > {second['name']} > {third['name']}",
                            'probability': min(combo_prob, 0.15),
                            'reasoning': f"Based on {pace_type.lower()} pace dynamics"
                        })

        tricast_combos.sort(key=lambda x: x['probability'], reverse=True)
        tricast_combos = tricast_combos[:3]

        # BUILD OUTPUT
        result = {
            'pace_type': pace_type,
            'pace_insight': pace_insight,
            'race_shape': {
                'early': 'Competitive' if num_pace_makers >= 2 else ('Steady' if num_pace_makers == 1 else 'Waiting'),
                'middle': 'Settling' if pace_type == "FAST" else 'Competitive',
                'finish': 'Closer-friendly' if pace_type == "FAST" else 'Form-based'
            },
            'early_leader': {'name': early_leader['name'], 'probability': early_leader.get('probability', 0)},
            'likely_finisher': {'name': strongest_finisher['name'], 'probability': strongest_finisher.get('probability', 0)},
            'pace_makers': [{'name': h['name'], 'rank': h['rank']} for h in pace_makers[:3]],
            'closers': [{'name': h['name'], 'rank': h['rank']} for h in closers[:3]],
            'forecast_top_3': forecast_combos,
            'tricast_top_3': tricast_combos
        }

        return result

    except Exception as e:
        print(f"Error in pace analysis: {e}", file=sys.stderr)
        return None

def main():
    """Analyze pace from race data"""
    if len(sys.argv) < 3:
        print("Usage: keenan-pace-analyzer.py <ruby.json> <cecil.json>")
        sys.exit(1)

    try:
        with open(sys.argv[1]) as f:
            ruby_data = json.load(f)
        with open(sys.argv[2]) as f:
            cecil_data = json.load(f)

        result = analyze_pace_profile(ruby_data, cecil_data)
        if result:
            print(json.dumps(result))
        else:
            print(json.dumps({}))
            sys.exit(1)

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
