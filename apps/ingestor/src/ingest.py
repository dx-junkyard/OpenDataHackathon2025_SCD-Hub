import pandas as pd
import duckdb
import pathlib
import datetime
import requests
import io

DATE = datetime.date.today().strftime("%Y%m")
URL = "https://example.com/bus_ridership.csv"  # replace with real

df = pd.read_csv(io.BytesIO(requests.get(URL).content))
pq = pathlib.Path(f"/data/parquet/bus_ridership_{datetime.date.today()}.parquet")
pq.parent.mkdir(parents=True, exist_ok=True)
df.to_parquet(pq)

con = duckdb.connect("/data/duckdb/shibuya.db")
con.execute("""CREATE OR REPLACE TABLE ridership AS
SELECT * FROM parquet_scan('/data/parquet/bus_ridership_*.parquet')""")
