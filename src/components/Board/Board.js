import React from "react";
import { getCharacter } from "../../helper";
import Files from "./bits/Files";
import Ranks from "./bits/Ranks";

export default function Board() {
  const ranks = Array(8)
    .fill()
    .map((x, i) => 8 - i);

  const files = Array(8)
    .fill()
    .map((x, i) => getCharacter(i));

  const getClassName = (i, j) => {
    if ((i + j) % 2 === 0) {
      return "tile light-tile";
    } else {
      return " tile dark-tile";
    }
  };
  return (
    <div className="board">
      <Ranks ranks={ranks} />
      <div className="tiles">
        {ranks.map((rank, i) => {
          return files.map((file, j) => (
            <div className={getClassName(i, j)} key={file + i + j + rank}></div>
          ));
        })}
      </div>
      <Files files={files} />
    </div>
  );
}
