import {
  getBishopMoves,
  getKingMoves,
  getKnightMoves,
  getQueenMoves,
  getRookMoves,
} from "./getMoves";

const arbiter = {
  getRegularMoves: function ({ position, piece, rank, file }) {
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
  },
};

export default arbiter;
