import "./App.css";
import Board from "./components/Board/Board.js";
import { GameProvider } from "./context/Game/Game";

function App() {
  return (
    <div className="App">
      <GameProvider>
        <Board></Board>
      </GameProvider>
    </div>
  );
}

export default App;
