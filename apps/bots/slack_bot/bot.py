from flask import Flask, jsonify
from apps.orchestrator.src.agents.need_watch import detect_peak

app = Flask(__name__)

@app.route('/healthz')
def healthz():
    return jsonify({'status': 'ok'})

@app.route('/peak_status')
def peak_status():
    path = '/data/parquet/waiting_children_dummy.parquet'
    try:
        peak = detect_peak(path)
    except Exception:
        peak = False
    return jsonify({'peak': peak})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8004)
