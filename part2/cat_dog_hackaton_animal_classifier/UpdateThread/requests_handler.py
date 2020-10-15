from graphql_handler.graphqlHandler import GraphQLRequests, GraphQlMutation
from generations.conversions import from_entity_parser
from generations.generateAdopters import generate_adopters
from team2_ai_solution.team2_ai_solution import compute_features_df
from Data.app_properties import JAVA_server_url, confusion_matrix, thread_flags
from petTypeDictionary import get_pet_type

import time


##############################################################################
#            when you want to classify an animal using it's graph            #
##############################################################################


def classify_animal(plots, model):
    '''
    plots - > [(ts_1,x_1,y_1,z_1),.....,(ts_n,x_n,y_n,z_n)]
    0<=n<60
    return value:
    item from list - ["None", "cat", "dog", "parrot", "rabbit"]
    '''
    features_df = compute_features_df(plots)
    model_predictions = list(model.predict(features_df))
    return model_predictions


def classify_animal_from_grid_cell(x, y, model):
    graph_handler = GraphQLRequests(JAVA_server_url)
    plots_as_entities = graph_handler.import_gridcell_plots(x, y)
    plots_as_list = [tuple([plot.timestamp, plot.x, plot.y, plot.z]) for plot in plots_as_entities]
    plots_as_list.sort(key=lambda tup: tup[0])
    return classify_animal([plots_as_list], model)[0]


def classify_animals_from_events(model):
    while thread_flags['classifier_flag']:
        graph_handler = GraphQLRequests(JAVA_server_url)
        graph_mutation_handler = GraphQlMutation(JAVA_server_url)
        events = graph_handler.import_events(True)
        for event in events:
            if not thread_flags['classifier_flag']:
                break
            print(event)
            animal = classify_animal_from_grid_cell(event.grid_cell.x, event.grid_cell.y, model)
            if animal != 'None':
                graph_mutation_handler.close_event(event.id, get_pet_type(animal).code)
            else:
                graph_mutation_handler.close_event(event.id, 0)
        time.sleep(1)
