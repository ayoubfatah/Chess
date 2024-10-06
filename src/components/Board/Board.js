import React, { useEffect, useMemo } from "react";
import { getCharacter } from "../../helper";
import Files from "./bits/Files";
import Ranks from "./bits/Ranks";
import Pieces from "../pieces/Pieces";
import { useAppContext } from "../../context/Context";
import PopUp from "../PopUps/PopUp";
import arbiter from "../../arbiter/arbiter";
import { getKingMoves, getKingPosition } from "../../arbiter/getMoves";

export default function Board() {
  const { providerState } = useAppContext();
  const { appState, dispatch } = providerState;

  const position = appState.position[appState.position.length - 1];

  // highlight check
  const checkTile = (() => {
    const isInCheck = arbiter.isPlayerInCheck({
      positionAfterMove: position,
      player: appState.turn,
    });

    if (isInCheck) {
      const kingPosition = getKingPosition(position, appState.turn);

      return kingPosition;
    }

    return null;
  })();

  const ranks = Array(8)
    .fill()
    .map((x, i) => 8 - i);

  const files = Array(8)
    .fill()
    .map((x, i) => getCharacter(i));

  const getClassName = (i, j) => {
    let className = "tile";
    className += (i + j) % 2 === 0 ? " dark-tile" : " light-tile";

    // Check for candidate moves
    const isCandidateMove = appState.candidateMoves?.find(
      (m) => m[0] === i && m[1] === j
    );

    // Add highlight or attack class
    if (isCandidateMove) {
      if (position[i][j]) {
        className += " attacking";
      } else {
        className += " highlight";
      }

      // If tile contains the king and the king is in check, add "checked"
    }
    if (checkTile && checkTile[0] === i && checkTile[1] === j) {
      className += " checked";
    }
    return className;
  };

  return (
    <div className="board">
      <Ranks ranks={ranks} />
      <div className="tiles">
        {ranks.map((rank, i) => {
          return files.map((file, j) => (
            <div
              className={getClassName(7 - i, j)}
              key={file + i + j + rank}
            ></div>
          ));
        })}
      </div>
      <Pieces />
      <PopUp />
      <Files files={files} />
    </div>
  );
}
