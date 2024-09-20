import React from "react";

export default function Files({ files }) {
  return (
    <div className="files">
      {files.map((file) => (
        <span>{file}</span>
      ))}
    </div>
  );
}
