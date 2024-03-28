from flask import Flask, request, jsonify, render_template, redirect
import google.generativeai as genai

app = Flask(__name__)

@app.before_request
def before_request():
    # Check if the request is not secure and is not running locally
    if not request.is_secure and request.url.startswith('http://'):
        url = request.url.replace('http://', 'https://', 1)
        code = 301
        return redirect(url, code=code)

# Configure Google Generative AI with your API key
api_key = ""
genai.configure(api_key=api_key)

@app.route('/')
def index():
    return render_template('timecapsule.html')

@app.route('/fetch_history', methods=['POST'])
def fetch_history():
    year = request.json.get('year')
    model = genai.GenerativeModel('gemini-pro')

    prompt = f"What were the significant events in the year {year}?"
    response = model.generate_content(prompt)

    return jsonify({'text': response.text})

if __name__ == '__main__':
    app.run()