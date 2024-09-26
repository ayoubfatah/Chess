import React from "react";
import { useAppContext } from "../../context/Context";
import arbiter from "../../arbiter/arbiter";
import { generateCandidateMoves } from "../../reducer/actions/move";

export default function Piece({ rank, file, piece }) {
  const { providerState } = useAppContext();
  const { appState, dispatch } = providerState;
  const { turn, position } = appState;

  const currentPosition = appState.position[appState.position.length - 1];

  const onDragStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `${piece},${rank},${file}`);
    setTimeout(() => {
      e.target.style.display = "none";
    }, 0);

    if (turn === piece[0]) {
      const candidateMoves = arbiter.getValidMoves({
        position: currentPosition,
        file,
        rank,
        piece,
        previousPosition: appState.position[appState.position.length - 2],
      }); // legal moves

      dispatch(generateCandidateMoves({ candidateMoves }));
    }
  };

  const onDragEnd = (e) => {
    e.target.style.display = "block";
  };

  return (
    <div
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      draggable={true}
      className={`piece ${piece} p-${file}${rank}`}
    />
  );
}
