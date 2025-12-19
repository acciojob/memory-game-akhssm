import React, { useState, useEffect } from "react";
import "./../styles/App.css";

const LEVELS = {
  easy: 4,
  normal: 8,
  hard: 16,
};

const App = () => {
  const [screen, setScreen] = useState("landing");
  const [level, setLevel] = useState("easy");
  const [tiles, setTiles] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [tries, setTries] = useState(0);

  const startGame = () => {
    const pairs = LEVELS[level];
    let nums = [];

    for (let i = 0; i < pairs; i++) {
      nums.push(i, i);
    }

    nums.sort(() => Math.random() - 0.5);

    setTiles(nums);
    setFlipped([]);
    setMatched([]);
    setTries(0);
    setScreen("game");
  };

  const flipTile = (index) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(index)
    )
      return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setTries((t) => t + 1);
    }
  };

  useEffect(() => {
    if (flipped.length === 2) {
      const [a, b] = flipped;

      if (tiles[a] === tiles[b]) {
        setMatched((prev) => [...prev, a, b]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 700);
      }
    }
  }, [flipped, tiles]);

  const isSolved = matched.length === tiles.length && tiles.length > 0;

  const newGame = () => {
    setScreen("landing");
  };

  return (
    <div>
      {/* Do not remove the main div */}
      {screen === "landing" && (
        <div className="levels_container">
          <h1>Welcome!</h1>

          <div className="levels">
            <label>
              <input
                type="radio"
                name="level"
                id="easy"
                checked={level === "easy"}
                onChange={() => setLevel("easy")}
              />
              Easy
            </label>

            <label>
              <input
                type="radio"
                name="level"
                id="normal"
                checked={level === "normal"}
                onChange={() => setLevel("normal")}
              />
              Normal
            </label>

            <label>
              <input
                type="radio"
                name="level"
                id="hard"
                checked={level === "hard"}
                onChange={() => setLevel("hard")}
              />
              Hard
            </label>
          </div>

          <button onClick={startGame}>Start</button>
        </div>
      )}

      {screen === "game" && (
        <div className="game_container">
          <h1>GAmE YO</h1>
          <p>Tries: {tries}</p>

          {isSolved && <p className="status">ALL SOLVED!</p>}

          {isSolved && <button onClick={newGame}>New Game</button>}

          <div
            className="cells_container"
            style={{ gridTemplateColumns: "repeat(4, 120px)" }}
          >
            {tiles.map((num, index) => (
              <div
                key={index}
                className={`cell ${
                  matched.includes(index) ? "matched" : ""
                }`}
                onClick={() => flipTile(index)}
              >
                {flipped.includes(index) || matched.includes(index)
                  ? num
                  : ""}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
