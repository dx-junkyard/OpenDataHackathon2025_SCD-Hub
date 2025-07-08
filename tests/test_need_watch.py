import pandas as pd
import tempfile
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parents[1]))
from apps.orchestrator.src.agents.need_watch import detect_peak

def test_detect_peak_true():
    df = pd.DataFrame({'waiting':[30,60]})
    tmp = tempfile.NamedTemporaryFile(suffix='.parquet', delete=False)
    df.to_parquet(tmp.name)
    assert detect_peak(tmp.name, threshold=50) is True

def test_detect_peak_false():
    df = pd.DataFrame({'waiting':[10,20]})
    tmp = tempfile.NamedTemporaryFile(suffix='.parquet', delete=False)
    df.to_parquet(tmp.name)
    assert detect_peak(tmp.name, threshold=50) is False
