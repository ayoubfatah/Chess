import { useEffect, useReducer } from "react";
import Board from "./components/Board/Board";
import AppContext from "./context/Context";
import "./styles.css";
import { reducer } from "./reducer/reducer";

import { createPosition } from "./helper";
import PromotionBox from "./components/PopUps/PromotionBox";
import { initGameState } from "./constant";
import Control from "./components/Control";

import TakeBack from "./components/TakeBack";
import MovesList from "./components/MovesList";

function App() {
  const [appState, dispatch] = useReducer(reducer, initGameState);
  const providerState = {
    appState,
    dispatch,
  };

  return (
    <AppContext.Provider value={{ providerState }}>
      <div className="App">
        <Board />
        <Control>
          <MovesList />
          <TakeBack />
        </Control>
      </div>
    </AppContext.Provider>
  );
}

export default App;
