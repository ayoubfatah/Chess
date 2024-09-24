import { useEffect, useReducer } from "react";
import Board from "./components/Board/Board";
import AppContext from "./context/Context";
import "./styles.css";
import { reducer } from "./reducer/reducer";

import { createPosition } from "./helper";

function App() {
  const [appState, dispatch] = useReducer(reducer, {
    position: [createPosition()],
    turn: "w",
    candidateMoves: [],
  });
  const providerState = {
    appState,
    dispatch,
  };

  return (
    <AppContext.Provider value={{ providerState }}>
      <div className="App">
        <Board />
      </div>
    </AppContext.Provider>
  );
}

export default App;
