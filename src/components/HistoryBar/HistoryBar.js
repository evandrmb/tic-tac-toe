import { useContext } from "react";
import GameContext from "../../context/Game/Game";
import "./styles.css";

const HistoryBar = () => {
  const { back, forward } = useContext(GameContext);

  return (
    <ul className="bar">
      <li className="bar__item">
        <button className="bar__item__button" onClick={() => back()}>
          {"<"}
        </button>
      </li>
      <li className="bar__item">
        <button className="bar__item__button" onClick={() => forward()}>
          {">"}
        </button>
      </li>
    </ul>
  );
};

export default HistoryBar;
