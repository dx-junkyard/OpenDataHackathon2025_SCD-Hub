from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/healthz')
def healthz():
    return jsonify({'status': 'ok'})

@app.route('/mcp/createPoster', methods=['POST'])
def create_poster():
    data = request.json or {}
    route = data.get('route', 'unknown')
    # Stub: generate poster
    return jsonify({'poster': f'Poster for {route}'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8001)
