import React, { useRef } from "react";
import { useAppContext } from "../../context/Context";
import { copyPosition } from "../../helper";
import Piece from "./Piece";
import { clearCandidates, makeNewMove } from "../../reducer/actions/move";
import {
  useMoveSound,
  useNotificationSound,
} from "../../customHooks/useMoveSound";
import { useCaptureSound } from "../../customHooks/useCaptureSound";
import arbiter from "../../arbiter/arbiter";

//

export default function Pieces() {
  const { providerState } = useAppContext();
  const { appState, dispatch } = providerState;
  const currentPosition = appState.position[appState.position.length - 1];
  const playMoveLegalSound = useMoveSound();
  const playCaptureSound = useCaptureSound();
  const ref = useRef();

  const calculateCoord = (e) => {
    const { width, left, top } = ref.current.getBoundingClientRect();
    const size = width / 8;

    const y = Math.floor((e.clientX - left) / size);

    const x = 7 - Math.floor((e.clientY - top) / size);

    return { x, y };
  };

  const move = (e) => {
    // Retrieve the piece type (p), rank, and file from the data being dragged
    const [piece, rank, file] = e.dataTransfer.getData("text").split(",");
    // Calculate the x and y coordinates based on the drop event's position
    const { x, y } = calculateCoord(e);
    // Check if the drop coordinates are valid candidate moves
    if (appState.candidateMoves?.find((m) => m[0] === x && m[1] === y)) {
      // Create a new position based on the current position to avoid mutating the original state
      const newPosition = arbiter.performMove({
        position: currentPosition,
        piece,
        rank,
        file,
        x,
        y,
      });

      // Check if the new position contains an enemy piece
      const isEnemyPiece =
        currentPosition[x][y] && currentPosition[x][y][0] !== piece[0];

      // If there is an enemy piece, play the capture sound
      if (isEnemyPiece) {
        playCaptureSound(); // Play sound for capturing an enemy piece
      } else {
        // If it's a legal move without capturing, play the legal move sound
        playMoveLegalSound(); // Play sound for a legal move
      }
      // Dispatch the action to update the game state with the new position
      dispatch(makeNewMove({ newPosition }));
    }
    // Clear the candidate moves after the drop action
    dispatch(clearCandidates());
  };
  const onDrop = (e) => {
    move(e);
  };
  //   so the onDrop can take over the onDragOver functionality
  const onDragOver = (e) => e.preventDefault();

  return (
    <div ref={ref} onDragOver={onDragOver} onDrop={onDrop} className="pieces">
      {currentPosition.map((r, rank) =>
        r.map((f, file) =>
          currentPosition[rank][file] ? (
            <Piece
              key={rank + "-" + file}
              rank={rank}
              file={file}
              piece={currentPosition[rank][file]}
            />
          ) : null
        )
      )}
    </div>
  );
}
