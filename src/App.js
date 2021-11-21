import "./App.css";
import Board from "./components/Board/Board.js";
import HistoryBar from "./components/HistoryBar/HistoryBar";
import { GameProvider } from "./context/Game/Game";

function App() {
  return (
    <div className="App">
      <GameProvider>
        <div className="display">
          <Board></Board>
          <HistoryBar className="historyBar"></HistoryBar>
        </div>
      </GameProvider>
    </div>
  );
}

export default App;
