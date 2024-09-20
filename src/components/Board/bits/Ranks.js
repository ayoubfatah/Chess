import React from "react";

export default function Ranks({ ranks }) {
  return (
    <div className="ranks">
      {ranks.map((rank) => (
        <span>{rank}</span>
      ))}
    </div>
  );
}
