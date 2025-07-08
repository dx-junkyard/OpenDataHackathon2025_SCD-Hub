from flask import Flask, request, jsonify
import json
from pathlib import Path

app = Flask(__name__)

@app.route('/healthz')
def healthz():
    return jsonify({'status': 'ok'})

@app.route('/kids', methods=['POST'])
def kids():
    data = request.json or {}
    text = data.get('text', '')
    log = Path('../minihub/resources/night_chatlog.jsonl')
    log.parent.mkdir(exist_ok=True)
    with open(log, 'a') as f:
        f.write(json.dumps({'text': text}) + '\n')
    return jsonify({'logged': text})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8003)
