import json
from pprint import pprint
from flask import Flask, jsonify
from flask import render_template
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/data')
def readData():
    json_data = open('static/data/data.json')
    data = json.load(json_data)
    pprint(data)
    json_data.close()
    return jsonify(**data)


@app.route('/geodata')
def readGeoData():
    json_data = open('static/data/test.geojson')
    data = json.load(json_data)
    # pprint(data)
    json_data.close()
    return jsonify(**data)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
