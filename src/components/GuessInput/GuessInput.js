import React from "react";

function GuessInput({ gameStatus, handleSubmitGuess, guess, setGuess }) {
  function handleGuessChange(event) {
    setGuess(event.target.value.toUpperCase());
  }

  function handleSubmit(event) {
    event.preventDefault();

    const guessIsValid = guess.length === 5;
    if (!guessIsValid) {
      window.alert("Please enter exactly 5 characters");
      return false;
    }

    handleSubmitGuess(guess);

    setGuess("");
  }

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        type="text"
        name="guess"
        id="guess-input"
        disabled={gameStatus !== "running"}
        value={guess}
        onChange={handleGuessChange}
        minLength={5}
        maxLength={5}
        required=""
      />
    </form>
  );
}

export default GuessInput;
