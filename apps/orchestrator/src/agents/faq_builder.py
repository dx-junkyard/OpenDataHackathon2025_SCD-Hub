import json
from typing import List


def build_faq(log_path: str) -> List[str]:
    """Read chat log JSONL and build a markdown FAQ list."""
    lines = []
    with open(log_path) as f:
        for line in f:
            item = json.loads(line)
            q = item.get('question') or item.get('q')
            a = item.get('answer') or item.get('a')
            if q and a:
                lines.append(f"Q. {q}\nA. {a}")
    return lines
