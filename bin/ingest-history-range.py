#!/usr/bin/env python3
import sys
import subprocess
from datetime import datetime, timedelta

# Target jump season context: Oct 2025 - Present (Approx 6 months)
def main():
    start_date = datetime(2025, 10, 1)
    end_date = datetime.now() - timedelta(days=1)
    
    current = start_date
    while current <= end_date:
        date_str = current.strftime("%Y/%m/%d")
        # Call the single date ingestor
        subprocess.run(["python3", "/home/ruby/bin/ingest-history.py", date_str])
        current += timedelta(days=1)

if __name__ == "__main__":
    main()
