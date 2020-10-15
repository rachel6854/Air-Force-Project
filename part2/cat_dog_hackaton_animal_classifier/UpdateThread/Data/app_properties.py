from model import generate_model
from confusion_matrix import compute_confusion_matrix
from requests import get
import codecs
import pickle


def set_confusion_matrix():
    confusion_as_string = codecs.encode(pickle.dumps(confusion_matrix), "base64").decode()
    get(JAVA_server_ip+':'+JAVA_server_port+'/scores/setMatrix', params={"matrix": confusion_as_string})


model = generate_model()
confusion_matrix = compute_confusion_matrix(model)
JAVA_server_port = '9003'
JAVA_server_ip = 'http://129.213.158.42'
JAVA_server_url = JAVA_server_ip+':'+JAVA_server_port+'/graphql'
JAVA_server_score_url = JAVA_server_ip+':'+JAVA_server_port+'/scores/challenge2'
set_confusion_matrix()
thread_flags = dict(classifier_flag=False)
port = 5002