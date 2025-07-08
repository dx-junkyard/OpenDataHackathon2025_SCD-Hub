"""Ingest waiting children CSV and load into DuckDB."""

import datetime
import io
import os
import pathlib

import duckdb
import pandas as pd
import requests

from dotenv import load_dotenv

load_dotenv()

# Environment variables
WAITING_CHILDREN_URL = os.getenv("WAITING_CHILDREN_URL")
PARQUET_DIR = pathlib.Path(os.getenv("PARQUET_DIR", "/data/parquet"))
DUCKDB_PATH = os.getenv("DUCKDB_PATH", "/data/duckdb/shibuya.db")

if not WAITING_CHILDREN_URL:
    raise RuntimeError("WAITING_CHILDREN_URL is not set")

DATE = datetime.date.today().strftime("%Y%m")

df = pd.read_csv(io.BytesIO(requests.get(WAITING_CHILDREN_URL).content))

pq = PARQUET_DIR / f"waiting_children_{datetime.date.today()}.parquet"
PARQUET_DIR.mkdir(parents=True, exist_ok=True)
df.to_parquet(pq)

con = duckdb.connect(DUCKDB_PATH)
con.execute(
    """CREATE OR REPLACE TABLE waiting_children AS
SELECT * FROM parquet_scan('{}')""".format(str(PARQUET_DIR / 'waiting_children_*.parquet'))
)
