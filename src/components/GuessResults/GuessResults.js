import React from "react";

import { range } from "../../utils";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

import GuessRow from "../GuessRow";

function GuessResults({ guesses, answer }) {
  return (
    <div>
      <div className="guess-results">
        {range(NUM_OF_GUESSES_ALLOWED).map((num) => (
          <GuessRow key={num} guess={guesses[num]} answer={answer} />
        ))}
      </div>
    </div>
  );
}

export default GuessResults;
