import React, { useRef, useState } from "react";
import Piece from "./Piece";
import { copyPosition, createPosition } from "../../helper";
export default function Pieces() {
  const [position, setPosition] = useState(createPosition);
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
    const newPosition = copyPosition(position);
    // we need some values here
    // 1 - the piece  that has been move we can get it with e.dataTransfer.getData("text")
    const [p, rank, file] = e.dataTransfer.getData("text").split(",");
    // 2 we need to see where the  piece got dropped
    console.log(p, "ikhan");
    const { x, y } = calculateCoord(e);
    newPosition[rank][file] = "";
    newPosition[x][y] = p;
    setPosition(newPosition);
  };

  //   so the onDrop can take over the onDragOver functionality
  const onDragOver = (e) => e.preventDefault();
  return (
    <div ref={ref} onDragOver={onDragOver} onDrop={onDrop} className="pieces">
      {position.map((r, rank) =>
        r.map((f, file) =>
          position[rank][file] ? (
            <Piece
              key={rank + "-" + file}
              rank={rank}
              file={file}
              piece={position[rank][file]}
            />
          ) : null
        )
      )}
    </div>
  );
}
