# Racing Supervisor

Manual: "Run pipeline [race/meeting]"

Auto: Major meetings (Ascot/Cheltenham/Derby/GN) → Full chain.

Flow:
1. Cecil: sessions_send agent:cecil:main -m "Fetch [race]"
2. Ruby: sessions_send agent:ruby:main -m Cecil JSON
3. Keenan: sessions_send agent:keenan:main -m Ruby JSON
4. Mordin: sessions_send agent:mordin:main -m Keenan JSON
5. Persad: sessions_send agent:persad:main -m Mordin JSON → Report here
6. Store workspace/races/[race].json

Major detect: grep today in "Royal Ascot Cheltenham Festival Grand National Epsom Derby"

DB: workspace/races/pipeline.jsonl (log accuracy)

Use tools: sessions_list, sessions_send, session_status.
