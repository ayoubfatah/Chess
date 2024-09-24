import React from "react";
import { getCharacter } from "../../helper";
import Files from "./bits/Files";
import Ranks from "./bits/Ranks";
import Pieces from "../pieces/Pieces";
import { useAppContext } from "../../context/Context";

export default function Board() {
  const { providerState } = useAppContext();
  const { appState, dispatch } = providerState;

  const position = appState.position[appState.position.length - 1];

  const ranks = Array(8)
    .fill()
    .map((x, i) => 8 - i);

  const files = Array(8)
    .fill()
    .map((x, i) => getCharacter(i));

  const getClassName = (i, j) => {
    let className = "tile";
    className += (i + j) % 2 === 0 ? " dark-tile" : " light-tile";
    // This line checks if the current tile (i, j) is part of the candidate moves for the current piece.
    if (appState.candidateMoves?.find((m) => m[0] === i && m[1] === j)) {
      // if a piece exist it would be an enemy only
      if (position[i][j]) {
        className += "  attacking";
      } else {
        className += "  highlight";
      }
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
      <Files files={files} />
    </div>
  );
}
