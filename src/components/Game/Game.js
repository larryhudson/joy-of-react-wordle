import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

import GuessInput from "../GuessInput";
import GuessResults from "../GuessResults";
import Keyboard from "../Keyboard";

function Banner({ status, children }) {
  return (
    <div style={{ zIndex: "100" }} className={`${status} banner`}>
      {children}
    </div>
  );
}

function WinBanner({ guessCount, onRestartGame }) {
  return (
    <Banner status="happy">
      <p>
        <strong>Congratulations!</strong> Got it in{" "}
        <strong>
          {guessCount} {guessCount === 1 ? "guess" : "guesses"}
        </strong>
        .
      </p>
      <button onClick={onRestartGame}>Play again</button>
    </Banner>
  );
}

function LoseBanner({ answer, onRestartGame }) {
  return (
    <Banner status="sad">
      <p>
        Sorry, the correct answer is <strong>{answer}</strong>.
      </p>
      <button onClick={onRestartGame}>Play again</button>
    </Banner>
  );
}

function getRandomAnswer() {
  // Pick a random word on every pageload.
  // To make debugging easier, we'll log the solution in the console.
  const answer = sample(WORDS);
  console.info({ answer });
  return answer;
}

function Game() {
  const [answer, setAnswer] = React.useState(() => getRandomAnswer());
  const [guesses, setGuesses] = React.useState([]);
  const [gameStatus, setGameStatus] = React.useState("running");
  const [guessInput, setGuessInput] = React.useState("");

  function handleSubmitGuess(guess) {
    const nextGuesses = [...guesses, guess];
    setGuesses(nextGuesses);

    if (guess.toUpperCase() === answer) {
      setGameStatus("won");
      return;
    }
    if (nextGuesses.length === NUM_OF_GUESSES_ALLOWED) {
      setGameStatus("lost");
    }
  }

  function restartGame() {
    setGuesses([]);
    setAnswer(getRandomAnswer());
    setGameStatus("running");
  }

  function handleKeyClick(event) {
    console.log("handling key click");
    const clickedLetter = event.target.innerText;
    if (guessInput.length >= 5) return;
    setGuessInput(guessInput + clickedLetter);
  }

  return (
    <div>
      <GuessResults answer={answer} guesses={guesses} />
      {gameStatus === "won" && (
        <WinBanner guessCount={guesses.length} onRestartGame={restartGame} />
      )}
      {gameStatus === "lost" && (
        <LoseBanner answer={answer} onRestartGame={restartGame} />
      )}
      <GuessInput
        handleSubmitGuess={handleSubmitGuess}
        gameStatus={gameStatus}
        guess={guessInput}
        setGuess={setGuessInput}
      />
      <Keyboard guesses={guesses} answer={answer} onKeyClick={handleKeyClick} />
    </div>
  );
}

export default Game;
