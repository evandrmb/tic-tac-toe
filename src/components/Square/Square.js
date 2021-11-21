import { useContext } from "react";
import GameContext from "../../context/Game/Game";
import "./styles.css";

const Square = ({ row, column }) => {
  const { markSquare, getSquare } = useContext(GameContext);

  return (
    <button
      className="square"
      onClick={() => {
        markSquare(row, column);
      }}
    >
      {getSquare(row, column)}
    </button>
  );
};

export default Square;
