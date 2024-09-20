import React from "react";

export default function Piece({ rank, file, piece }) {
  return <div className={`piece ${piece} p-${file}${rank}`} />;
}
