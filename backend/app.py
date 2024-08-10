from flask import Flask, request, jsonify
import numpy as np
from flask_cors import CORS
from itertools import combinations
from math import factorial
from collections import defaultdict

app = Flask(__name__)
CORS(app)

# Function to calculate marginal contribution of a player
def marginal_contribution(coalition, player, ratings):
    coalition_value = sum(ratings[p - 1] for p in coalition)  # Adjust for 1-based indexing
    new_coalition_value = coalition_value + ratings[player - 1]  # Adjust for 1-based indexing
    return new_coalition_value - coalition_value

# Calculate Shapley value for a player
def shapley_value(player, total_players, ratings):
    players = set(total_players)
    players.remove(player)
    num_players = len(total_players)
    sum_contributions = 0

    for i in range(len(players) + 1):
        for coalition in combinations(players, i):
            coalition = list(coalition)
            marginal = marginal_contribution(coalition, player, ratings)
            sum_contributions += marginal

    average_marginal_contribution_per_player = (1 / factorial(num_players)) * sum_contributions
    average_marginal_contribution_per_player = round(average_marginal_contribution_per_player, 4)

    return average_marginal_contribution_per_player

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    ratings = data['players']
    prize = data['prize']

    total_players = [index + 1 for index, player in enumerate(ratings)]

    shapley_vals = {player: shapley_value(player, total_players, ratings) for player in total_players}
    total_sum = sum(shapley_vals.values())

    result = defaultdict()

    for i in range(1, 6):
        shapley_val_per_player = (shapley_vals[i] / total_sum) * prize
        result[i] = shapley_val_per_player
    
    result_dict = dict(result)  # Convert defaultdict to dict
    return jsonify(result_dict)  # Return the dictionary directly

if __name__ == '__main__':
    app.run(debug=True)