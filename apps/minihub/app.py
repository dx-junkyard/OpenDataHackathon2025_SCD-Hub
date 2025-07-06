from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/healthz')
def healthz():
    return jsonify({'status': 'ok'})

@app.route('/mcp/pushLINE', methods=['POST'])
def push_line():
    data = request.json or {}
    message = data.get('message', '')
    # Stub: push message to LINE
    return jsonify({'pushed': message})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8002)
