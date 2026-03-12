#!/usr/bin/env python3
import json
import sys
import os
import subprocess
from datetime import datetime

WS = "/home/ruby"
TWITTER_BIN = f"{WS}/.local/bin/twitter"
COOKIE_FILE = f"{WS}/.twitter_cookies"

def log(msg):
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    print(f"[{timestamp}] [TWITTER] {msg}", file=sys.stderr)

def get_sentiment(query):
    if not os.path.exists(COOKIE_FILE):
        log("Error: .twitter_cookies file missing. Need TWITTER_AUTH_TOKEN and TWITTER_CT0.")
        return None

    # Load env vars from file
    env = os.environ.copy()
    with open(COOKIE_FILE, 'r') as f:
        for line in f:
            if '=' in line:
                k, v = line.strip().split('=', 1)
                env[k] = v

    log(f"Searching X for: {query}")
    try:
        cmd = [TWITTER_BIN, "search", query, "--type", "latest", "-n", "10", "--json"]
        result = subprocess.run(cmd, env=env, capture_output=True, text=True)
        
        if result.returncode != 0:
            log(f"Twitter CLI error: {result.stderr}")
            return None
            
        full_res = json.loads(result.stdout)
        if not full_res.get('ok') or 'data' not in full_res:
            log(f"Search failed or no data: {full_res.get('error')}")
            return "No recent buzz detected."

        tweets = full_res['data']
        if not tweets:
            return "No recent buzz detected."

        # Prepare for agent summary
        simplified = []
        for t in tweets:
            text = t.get('text') or ""
            author = t.get('author', {}).get('screenName', 'unknown')
            simplified.append(f"@{author}: {text}")

        context = "\n".join(simplified)
        
        # Use Persad to summarize sentiment
        prompt = f"Analyze the following recent tweets about '{query}' in the context of horse racing. Identify any 'late intelligence' (paddock reports, sweat, agitation, late support). Provide a ONE SENTENCE summary. If no intelligence is found, say 'No significant paddock buzz.'\n\nTWEETS:\n{context}"
        
        agent_cmd = ["openclaw", "agent", "--agent", "persad", "-m", prompt, "--json"]
        agent_res = subprocess.run(agent_cmd, capture_output=True, text=True)
        
        if agent_res.returncode == 0:
            data = json.loads(agent_res.stdout)
            return data['result']['payloads'][0]['text']
        
        return "Sentiment analysis failed."

    except Exception as e:
        log(f"Exception: {e}")
        return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: twitter-sentiment.py 'query'")
        sys.exit(1)
    
    query = sys.argv[1]
    sentiment = get_sentiment(query)
    print(sentiment)
