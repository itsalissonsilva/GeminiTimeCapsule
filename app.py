from flask import Flask, request, jsonify, render_template
import google.generativeai as genai

app = Flask(__name__)

# Configure Google Generative AI with your API key
api_key = ""  # Ensure your API key is set in your environment variables
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
    app.run(debug=True, port=5001)
