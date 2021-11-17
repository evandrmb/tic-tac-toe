import { useState, createContext, useEffect } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [player, setPlayer] = useState("X");
  const [board, setBoard] = useState(Array(3).fill(Array(3).fill(null)));

  useEffect(() => {
    const player1 = "X";
    const player2 = "O";

    const diagonal1 =
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      (board[2][2] === player1 || board[2][2] === player2);

    const diagonal2 =
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      (board[1][1] === player1 || board[1][1] === player2);

    if (diagonal1 || diagonal2) {
      alert(`Player ${board[1][1]} won!`);
      return;
    }

    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
      if (
        board[rowIndex].every((square) => square === player1) ||
        board[rowIndex].every((square) => square === player2)
      ) {
        alert(`Player ${board[rowIndex][0]} won!`);

        return;
      }
      if (
        board.every((row) => row[rowIndex] === player1) ||
        board.every((row) => row[rowIndex] === player2)
      ) {
        alert(`Player ${board[0][rowIndex]} won!`);

        return;
      }
    }
  }, [board]);

  function getSquare(rowIndex, index) {
    return board[rowIndex][index];
  }

  function markSquare(rowIndex, index) {
    const boardCopy = board.slice();

    const row = board[rowIndex].slice();

    row[index] = player;
    boardCopy[rowIndex] = row;

    if (player === "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }

    setBoard(boardCopy);
  }

  return (
    <GameContext.Provider value={{ player, markSquare, getSquare }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
