import React from "react";
import { isEven } from "../../../helper";

export default function Files({ files }) {
  return (
    <div className="files">
      {files.map((file) => (
        <span
          key={file}
          className={`file  ${
            isEven(file.charCodeAt(0)) ? "dark-color" : "light-color"
          }`}
        >
          {file}
        </span>
      ))}
    </div>
  );
}


