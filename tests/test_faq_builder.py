import json
import tempfile
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parents[1]))
from apps.orchestrator.src.agents.faq_builder import build_faq

def test_build_faq():
    tmp = tempfile.NamedTemporaryFile(mode='w+', delete=False)
    tmp.write(json.dumps({'question':'A?','answer':'B'}) + '\n')
    tmp.close()
    faq = build_faq(tmp.name)
    assert 'Q. A?' in faq[0]
    assert 'A. B' in faq[0]
