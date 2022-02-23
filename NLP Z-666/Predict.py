import flask
from flask import Flask, Response, request, jsonify
from flask_cors import CORS
from Nostradamus import Seer
import json

app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = True

Nostradamus = Seer()

@app.route('/Nostradamus/predict_2', methods=['POST'])
def p2():
        # POST request
    if request.method == 'POST':
        data = request.get_json()
          # parse as JSON
        predict_2 = Nostradamus.predict_2(data)
        result = {}
        result["result"] = predict_2
        return result, 200

@app.route('/Nostradamus/predict_4', methods=['POST'])
def p4():
        # POST request
    if request.method == 'POST':
        data = request.get_json()
          # parse as JSON
        predict_4 = Nostradamus.predict_4(data)
        result = {}
        result["result"] = predict_4
        return result, 200

"""     if request.method == 'GET':
        predict_2 = Nostradamus.predict_2({
            "text": userinput
        })
        resp = flask.make_response(jsonify(predict_2), 200)
        resp.headers['Access-Control-Allow-Origin'] = 'http://localhost'
        return resp """


""" 
predict_4 = Nostradamus.predict_4({
    "text": userinput
})

@app.route('/Nostradamus/predict_4', methods=['GET'])
def p4():
    resp = flask.make_response(jsonify(predict_4), 200)
    resp.headers['Access-Control-Allow-Origin'] = 'http://localhost'
    return resp """

app.run(host="localhost")