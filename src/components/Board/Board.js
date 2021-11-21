import { useContext } from "react";
import GameContext from "../../context/Game/Game";
import Square from "../Square/Square";
import "./styles.css";

const Board = () => {
  const { getPlayer } = useContext(GameContext);

  return (
    <div className="board">
      <h2 className="board__helper">Current Player is: {getPlayer()}</h2>
      <div className="board__row">
        <Square row={0} column={0}></Square>
        <Square row={0} column={1}></Square>
        <Square row={0} column={2}></Square>
      </div>
      <div className="board__row">
        <Square row={1} column={0}></Square>
        <Square row={1} column={1}></Square>
        <Square row={1} column={2}></Square>
      </div>
      <div className="board__row">
        <Square row={2} column={0}></Square>
        <Square row={2} column={1}></Square>
        <Square row={2} column={2}></Square>
      </div>
    </div>
  );
};

export default Board;
