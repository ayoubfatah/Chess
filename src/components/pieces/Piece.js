import React from "react";

export default function Piece({ rank, file, piece }) {
  const onDragStart = (e) => {
    // to remove the plus icon that shows up when dragging a piece
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `${piece},${rank},${file}`);
    // Trigger visibility  adding setTimeout so the piece will stay visible while dragging it
    setTimeout(() => {
      e.target.style.display = "none";
    }, 0);
  };

  const onDragEnd = (e) => (e.target.style.display = "block");
  return (
    <div
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      draggable={true}
      className={`piece ${piece} p-${file}${rank}`}
    />
  );
}
