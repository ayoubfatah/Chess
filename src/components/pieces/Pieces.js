import React, { useRef } from "react";
import { useAppContext } from "../../context/Context";
import { copyPosition } from "../../helper";
import Piece from "./Piece";
import { makeNewMove } from "../../reducer/actions/move";
export default function Pieces() {
  const { providerState } = useAppContext();
  const { appState, dispatch } = providerState;
  const currentPosition = appState.position[appState.position.length - 1];
  console.log(currentPosition, "");

  const ref = useRef();
  const calculateCoord = (e) => {
    const { width, left, top } = ref.current.getBoundingClientRect();
    const size = width / 8;
    const y = Math.floor((e.clientX - left) / size);

    const x = 7 - Math.floor((e.clientY - top) / size);

    return { x, y };
  };
  //   drag and drop logic
  const onDrop = (e) => {
    const newPosition = copyPosition(currentPosition);
    // we need some values here
    // 1 - the piece  that has been move we can get it with e.dataTransfer.getData("text")
    const [p, rank, file] = e.dataTransfer.getData("text").split(",");
    // 2 we need to see where the  piece got dropped

    const { x, y } = calculateCoord(e);
    newPosition[+rank][+file] = "";
    newPosition[x][y] = p;

    dispatch(makeNewMove({ newPosition }));
    // setPosition(newPosition);
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
