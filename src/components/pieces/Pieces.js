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

  const onDrop = (e) => {
    const newPosition = copyPosition(currentPosition);

    const [p, rank, file] = e.dataTransfer.getData("text").split(",");

    const { x, y } = calculateCoord(e);

    if (appState.candidateMoves?.find((m) => m[0] === x && m[1] === y)) {
      if (p.endsWith("p") && !newPosition[x][y] && x !== rank && y !== file) {
        newPosition[rank][y] = "";
      }
      newPosition[+rank][+file] = "";
      newPosition[x][y] = p;
      dispatch(makeNewMove({ newPosition }));

      // Check if the new position contains an enemy piece
      const isEnemyPiece =
        currentPosition[x][y] && currentPosition[x][y][0] !== p[0];

      if (isEnemyPiece) {
        // If it does, dispatch a capture sound
        playCaptureSound();
      } else {
        // If it's a legal move, play the legal move sound
        playMoveLegalSound();
      }
    } else {
      // Handle illegal move (optional)
      // alert("error sound ");
    }
    // Clear the candidate moves
    dispatch(clearCandidates());
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
