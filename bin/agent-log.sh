#!/bin/bash
AGENT="$1"
TASK="$2"
MODEL="$3"
STATUS="$4"
URL="https://dhkjkisthdvhztqlummu.supabase.co/rest/v1/agent_logs?select=*"
KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoa2praXN0aGR2aHp0cWx1bW11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MzA3NTMsImV4cCI6MjA4ODMwNjc1M30.L9azWbl7Wp1pJn-HFJxRUE1eIyY0gECPzLVXBbrqxW4"
curl -s -X POST "$URL" \\
  -H "apikey: $KEY" \\
  -H "Authorization: Bearer $KEY" \\
  -H "Content-Type: application/json" \\
  -d "{\"agent_name\": \"$AGENT\", \"task_description\": \"$TASK\", \"model_used\": \"$MODEL\", \"status\": \"$STATUS\"}" > /dev/null
