import "./App.css";
import Square from "./componets/square";
import Board from "./componets/board";
import React, { useState } from "react";

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], //rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], //colums
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6], //diagonals
    [0, 4, 8],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function resetGame() {
    setSquares(Array(9).fill(null));
  }

  const handleClick = (i) => {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={handleClick} />
      </div>
      <div className="game-info">{status}</div>
      <button className="reset-game" onClick={() => resetGame()}>
        reset game
      </button>
    </div>
  );
}

export default App;
