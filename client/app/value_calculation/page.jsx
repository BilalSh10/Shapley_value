"use client";
import React, { useState } from "react";
import axios from "axios";
import Header from "../../components/myHeader/Header";
import Footer from "../../components/myFooter/Footer";

const page = () => {
  const [players, setPlayers] = useState([
    { rating: null },
    { rating: null },
    { rating: null },
    { rating: null },
    { rating: null },
  ]);
  const [prize, setPrize] = useState(null);
  const [results, setResults] = useState(null);

  const handlePlayerChange = (index, value) => {
    const newPlayers = [...players];
    newPlayers[index].rating = parseFloat(value);
    setPlayers(newPlayers);
  };

  const handleSubmit = async () => {
    if (prize === null || players === null) {
      console.error("There was an error please put the prize", error);
    }
    try {
      const response = await axios.post("http://127.0.0.1:5000/calculate", {
        players: players.map((p) => p.rating),
        prize,
      });
      const valuesArray = Object.values(response.data);
      setResults(valuesArray);
    } catch (error) {
      console.error(
        "There was an error calculating the Shapley values!",
        error
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow p-6 min-h-screen">
        <div className="max-w-4xl mx-auto shadow-xl rounded-lg p-6">
          {players.map((player, index) => (
            <div
              className="grid grid-cols-3 items-center mb-4"
              key={index}
            >
              <label className="text-gray-700 font-semibold">
                Player {index + 1} Rating:
              </label>
              <input
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                value={player?.rating}
                onChange={(e) => handlePlayerChange(index, e.target.value)}
              />
            </div>
          ))}

          <div className="mb-6 flex flex-row justify-evenly items-center">
            <label className="text-gray-700 font-semibold">Prize:</label>
            <input
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              value={prize}
              onChange={(e) => setPrize(parseFloat(e.target.value))}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          >
            Calculate
          </button>

          {results && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Results</h2>
              <ul className="list-disc list-inside space-y-2">
                {results.map((result, index) => (
                  <li key={index} className="text-gray-800">
                    Player {index + 1}:{" "}
                    <span className="font-semibold">${result.toFixed(3)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
