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

    // Shuffle the tiles
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
        const timer = setTimeout(() => setFlipped([]), 700);
        return () => clearTimeout(timer);
      }
    }
  }, [flipped, tiles]);

  const isSolved = tiles.length > 0 && matched.length === tiles.length;

  const newGame = () => {
    setScreen("landing");
  };

  return (
    <div id="main">
      {screen === "landing" && (
        <div className="levels_container">
          <h1>Welcome!</h1>
          <h4>Select Level</h4>

          <div className="levels">
            {Object.keys(LEVELS).map((lvl) => (
              <label key={lvl}>
                <input
                  type="radio"
                  name="level"
                  id={lvl}
                  checked={level === lvl}
                  onChange={() => setLevel(lvl)}
                />
                {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
              </label>
            ))}
          </div>

          <button onClick={startGame}>Start</button>
        </div>
      )}

      {screen === "game" && (
        <div className="game_container">
          <h4>Tries: {tries}</h4>

          {isSolved && <p className="status">ALL SOLVED!</p>}
          {isSolved && <button onClick={newGame}>New Game</button>}

          <div
            className="cells_container"
            style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(4, 120px)",
              gap: "10px" 
            }}
          >
            {tiles.map((num, index) => (
              <div
                key={index}
                className={`cell ${
                  matched.includes(index) ? "matched" : ""
                }`}
                onClick={() => flipTile(index)}
              >
                {(flipped.includes(index) || matched.includes(index)) && (
                  <span>{num}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;