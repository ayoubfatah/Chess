import {
  getBishopMoves,
  getKingMoves,
  getKnightMoves,
  getPawnCaptures,
  getPawnMoves,
  getQueenMoves,
  getRookMoves,
} from "./getMoves";

const arbiter = {
  getRegularMoves: function ({
    position,
    previousPosition,
    piece,
    rank,
    file,
  }) {
    if (piece.endsWith("r")) {
      return getRookMoves({ position, piece, rank, file });
    }
    if (piece.endsWith("n")) {
      return getKnightMoves({ position, rank, file });
    }
    if (piece === "bb" || piece === "wb") {
      return getBishopMoves({ position, rank, file, piece });
    }
    if (piece.endsWith("q")) {
      return getQueenMoves({ position, rank, file, piece });
    }
    if (piece.endsWith("k")) {
      return getKingMoves({ position, rank, file, piece });
    }
    if (piece.endsWith("p")) {
      return [
        ...getPawnMoves({ position, rank, file, piece }),
        ...getPawnCaptures({ position, rank, file, piece, previousPosition }),
      ];
    }
  },
};

export default arbiter;
