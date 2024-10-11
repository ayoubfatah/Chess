import React from "react";
import { useAppContext } from "../../context/Context";
import { copyPosition } from "../../helper";
import {
  clearCandidates,
  clearPromotion,
  makeNewMove,
} from "../../reducer/actions/move";
import { closePromotionSquare } from "../../reducer/actions/popUpAction";
import { Status } from "../../constant";
import { setupNewGame } from "../../reducer/actions/game";

export default function GameEnds() {
  const { providerState } = useAppContext();
  const { appState, dispatch } = providerState;
  const { status } = appState;
  if (status === Status.ongoing || status === Status.promotion) {
    return null;
  }
  const isWin = status.endsWith("wins");
  const newGame = () => {
    dispatch(setupNewGame());
  };
  console.log("status", status);
  return (
    <div className="popup-pieces-box popup--inner__center ">
      <h1>{isWin ? status : "Draw"}</h1>
      <p>{!isWin && status}</p>
      <div className={status}></div>
      <button onClick={newGame}>New Game</button>
    </div>
  );
}
