import React from "react";
import { useAppContext } from "../../context/Context";
import { convertCapturedPieces, getCapturedPieceClass } from "../../helper";

// Helper function to get the appropriate class name for each piece type

// Main component to render captured pieces

export default function CapturedPiecesByWhite() {
  const { providerState } = useAppContext();
  const { appState } = providerState;
  const { piecesTakenByWhite } = appState;

  // Convert piecesTakenByWhite into counts of each type
  const pieceWithoutColor = convertCapturedPieces(piecesTakenByWhite);

  return (
    <div className="captured">
      <div className="captured-pieces">
        {pieceWithoutColor.map((piece, index) =>
          // Render multiple divs based on the piece count
          Array.from({ length: piece.count }).map((_, idx) => (
            <div
              key={`${index}-${idx}`}
              className={getCapturedPieceClass(piece.type)}
            ></div>
          ))
        )}
      </div>
    </div>
  );
}
