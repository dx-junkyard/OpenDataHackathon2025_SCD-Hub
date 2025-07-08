import pandas as pd


def detect_peak(parquet_path: str, threshold: int = 50) -> bool:
    """Return True if the maximum waiting children count exceeds threshold."""
    df = pd.read_parquet(parquet_path)
    return bool(df['waiting'].max() > threshold)
