import json
from pathlib import Path


def push_line_kids(message: str) -> None:
    """Append message to night_chatlog.jsonl."""
    res_dir = Path(__file__).parent / 'resources'
    res_dir.mkdir(exist_ok=True)
    log = res_dir / 'night_chatlog.jsonl'
    with open(log, 'a') as f:
        f.write(json.dumps({'message': message}) + '\n')
