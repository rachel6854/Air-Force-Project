from team2_ai_solution import compute_features_df
import numpy as np
import pickle
from Data.app_properties import model

# nir - change this string to the path where the validation.pickle file
# is found in your server
VALIDATION_DATA_PATH = "Data/validation.pickle"

with open(VALIDATION_DATA_PATH, "rb") as f:
    labeled_plots = pickle.load(f)
    
true_labels = [label for plot, label in labeled_plots]
X = compute_features_df([plot for plot, label in labeled_plots]) 
# nir - for this purpose you need to use the model of team 2 - load model from 
# wherever you saved it in your server, i've loaded some model i've saved
# for testing purpose only:

predictions = model.predict(X)
accuracy = np.mean(predictions == true_labels)


def get_team2_score():
    # the score is how much accuracy you achieved above the trivial
    # "None" prediction
    return (accuracy - 0.85)/0.15 * 100


team_score = max(0, int(get_team2_score()))
