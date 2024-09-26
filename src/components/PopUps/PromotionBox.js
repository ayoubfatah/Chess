import React from "react";
import { useAppContext } from "../../context/Context";
import { copyPosition } from "../../helper";
import {
  clearCandidates,
  clearPromotion,
  makeNewMove,
} from "../../reducer/actions/move";
import { closePromotionSquare } from "../../reducer/actions/popUpAction";

export default function PromotionBox() {
  const { providerState } = useAppContext();
  const { appState, dispatch } = providerState;
  const { promotionSquare } = appState;

  if (!promotionSquare) {
    return null;
  }

  const options = ["q", "b", "kn", "r"];
  const color = promotionSquare.x === 7 ? "w" : "b";

  const getPromotionBoxPosition = () => {
    const style = {};
    if (promotionSquare.x === 7) style.top = "-12.5%";
    else {
      style.top = " 97.5%";
    }

    if (promotionSquare.y <= 1) {
      style.left = "0x";
    } else if (promotionSquare.y >= 6) {
      style.right = "0x";
    } else {
      style.left = `${12.5 * promotionSquare.y - 20}%`;
    }
    return style;
  };
  const onClick = (piece) => {
    const newPosition = copyPosition(
      appState.position[appState.position.length - 1]
    );
    newPosition[promotionSquare.rank][promotionSquare.file] = "";
    newPosition[promotionSquare.x][promotionSquare.y] = color + piece;
    dispatch(clearCandidates());
    dispatch(makeNewMove({ newPosition }));
    dispatch(closePromotionSquare());
  };
  return (
    <div
      className="popup-pieces-box promotion-choices"
      style={getPromotionBoxPosition()}
    >
      {options.map((piece) => (
        <div
          onClick={() => {
            onClick(piece);
          }}
          key={piece}
          className={`piece ${color}${piece}`}
        ></div>
      ))}
    </div>
  );
}
