from requests_handler import classify_animals_from_events
from Data.app_properties import thread_flags, port, model, JAVA_server_score_url
from flask import Flask, request
import threading
from team2_scorer import team_score
from generations.generateQuacopters import generate_quadcopters
from requests import get
from team2_scorer import get_team2_score

classifier = threading.Thread(target=classify_animals_from_events, args=(model,), daemon=True)

threads = dict(classifier=classifier)

app = Flask(__name__)


@app.route('/', methods=['POST', 'GET'])
def hello():
    if request.method == 'GET':
        return "Hello _GET"
    elif request.method == 'POST':
        return "Hello _POST"
    else:
        return None


@app.route('/generate_data', methods=['POST', 'GET'])
def generate_data():
    if request.method == 'POST':
        generate_quadcopters(4)
        return "generated"
    return None


@app.route('/get_status', methods=['POST', 'GET'])
def get_status():
    if thread_flags['classifier_flag']:
        return str(team_score)
    else:
        return str(200 + team_score)


@app.route('/close_events', methods=['POST', 'GET'])
def close_events():
#    if request.method == 'POST':
    thread = threads['classifier']
    if thread.is_alive():
        thread_flags['classifier_flag'] = False
        print("finished closing events...")
        thread.join()
    else:
        thread = classifier
        threads['classifier'] = thread
        thread_flags['classifier_flag'] = True
        print("closing events...")
        thread.start()
    return "closed events!"
#    return "In order to close the events send a POST request to this endpoint"


if __name__ == '__main__':
    team_score = get_team2_score()
    get(JAVA_server_score_url, params={'grade': int(team_score)})
    close_events()
    print("starting app")
    app.run("127.0.0.1", port)
    close_events()

