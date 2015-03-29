import json
from flask import Flask, jsonify
from flask import render_template
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/hsinchu')
def readHsinchuJson():
    json_data = open('static/data/hsinchu.json')
    data = json.load(json_data)
    json_data.close()
    return jsonify(**data)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
