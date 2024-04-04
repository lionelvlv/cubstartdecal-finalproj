import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Handle Cross-Origin Resource Sharing (CORS)

OPENAI_API_KEY = 'your_openai_api_key'
OPENAI_API_URL = 'https://api.openai.com/v1/engines/davinci/completions'

@app.route('/generate-text', methods=['POST'])
def generate_text():
    data = request.json
    prompt_text = data.get('text', '')

    headers = {
        'Authorization': f'Bearer {OPENAI_API_KEY}',
        'Content-Type': 'application/json',
    }

    payload = {
        'prompt': prompt_text,
        'max_tokens': 50,
        'temperature': 0.7,
    }

    response = requests.post(OPENAI_API_URL, headers=headers, json=payload)
    result = response.json()

    generated_text = result['choices'][0]['text'] if result['choices'] else 'No text generated.'

    return jsonify({'generated_text': generated_text})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
