import React from "react";

import { checkGuess } from "../../game-helpers";

function Letter({ letter, result, onKeyClick }) {
  const className = result ? `cell ${result}` : "cell";
  return (
    <button onClick={onKeyClick} className={className}>
      {letter}
    </button>
  );
}

function Row({ letters, checkedLetters, onKeyClick }) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        gap: "0.25rem",
        textAlign: "center",
      }}
    >
      {letters.map((letter, index) => (
        <Letter
          key={index}
          letter={letter}
          onKeyClick={onKeyClick}
          result={checkedLetters[letter]}
        />
      ))}
    </div>
  );
}

function Keyboard({ guesses, answer, onKeyClick }) {
  const letterRows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"].map((rowString) =>
    rowString.split("")
  );
  const checkedLetters = guesses
    .map((guess) => checkGuess(guess, answer))
    .flat()
    .reduce((acc, current) => {
      return { ...acc, [current.letter]: [current.status] };
    }, {});
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      {letterRows.map((row, index) => (
        <Row
          key={index}
          letters={row}
          onKeyClick={onKeyClick}
          checkedLetters={checkedLetters}
        />
      ))}
    </div>
  );
}

export default Keyboard;
