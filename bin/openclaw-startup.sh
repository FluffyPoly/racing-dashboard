#!/bin/bash
# OpenClaw startup wrapper that loads environment variables from .env

set -a
if [ -f /home/ruby/.env ]; then
    source /home/ruby/.env
fi
set +a

# Export for OpenClaw to use
export TELEGRAM_BOT_TOKEN
export DISCORD_BOT_TOKEN
export OPENROUTER_KEY
export SUPABASE_KEY

# Start OpenClaw gateway
exec openclaw gateway "$@"
