import React from "react";
import { isEven } from "../../../helper";

export default function Ranks({ ranks }) {
  return (
    <div className="ranks ">
      {ranks.map((rank) => (
        <span key={rank} className={`rank  ${isEven(rank) ? "dark-color" : "light-color"}`}>
          {rank}
        </span>
      ))}
    </div>
  );
}

 