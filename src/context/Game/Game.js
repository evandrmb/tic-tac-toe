import { useState, createContext, useEffect } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const player1 = "X";
  const player2 = "O";

  const initialBoard = Array(3).fill(Array(3).fill(null));
  const initialHistory = [
    {
      board: initialBoard,
      nextPlayer: player1,
    },
  ];

  const [board, setBoard] = useState(initialBoard);
  const [history, setHistory] = useState(initialHistory);
  const [currentMove, setCurrentMove] = useState(0);
  // console.log("After Mark");
  // console.log(`HistoryLength: ${history.length}`);
  // console.log(`CurrentMove: ${currentMove}`);

  useEffect(() => {
    function restart() {
      setTimeout(() => {
        setCurrentMove(0);
        setBoard(initialBoard);
        setHistory(initialHistory);
      }, 3000);
    }

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
      restart();
      return;
    }

    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
      if (
        board[rowIndex].every((square) => square === player1) ||
        board[rowIndex].every((square) => square === player2)
      ) {
        alert(`Player ${board[rowIndex][0]} won!`);
        restart();
        return;
      }
      if (
        board.every((row) => row[rowIndex] === player1) ||
        board.every((row) => row[rowIndex] === player2)
      ) {
        alert(`Player ${board[0][rowIndex]} won!`);
        restart();

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

    row[index] = history[currentMove].nextPlayer;
    boardCopy[rowIndex] = row;

    let nextPlayer = "";
    if (history[currentMove].nextPlayer === "X") {
      nextPlayer = "O";
    } else {
      nextPlayer = "X";
    }

    const move = currentMove + 1;

    if (move < history.length) {
      const historyCopy = history.slice(0, move);

      setHistory([
        ...historyCopy,
        { board: boardCopy, nextPlayer: nextPlayer },
      ]);
      setCurrentMove(historyCopy.length);
    } else {
      setHistory([...history, { board: boardCopy, nextPlayer: nextPlayer }]);
      setCurrentMove(move);
    }

    setBoard(boardCopy);
  }

  function back() {
    if (currentMove > 0) {
      const move = currentMove - 1;
      setCurrentMove(move);
      setBoard(history[move]["board"]);
    }
  }

  function forward() {
    const move = currentMove + 1;
    if (move < history.length) {
      setCurrentMove(move);
      setBoard(history[move]["board"]);
    }
  }

  function getPlayer() {
    return history[currentMove].nextPlayer;
  }

  return (
    <GameContext.Provider
      value={{ getPlayer, markSquare, getSquare, back, forward }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
