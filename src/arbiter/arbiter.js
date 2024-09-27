import {
  getBishopMoves,
  getCastlingMove,
  getKingMoves,
  getKnightMoves,
  getPawnCaptures,
  getPawnMoves,
  getQueenMoves,
  getRookMoves,
} from "./getMoves";
import { movePawn, movePiece } from "./move";

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
      return getPawnMoves({ position, rank, file, piece });
    }
  },
  getValidMoves: function ({
    position,
    previousPosition,
    castlingDirection,
    piece,
    rank,
    file,
  }) {
    // Call the getRegularMoves method to get the basic valid moves for the piece
    let moves = this.getRegularMoves({
      position, // Current position of the board
      previousPosition, // The position of the board before the last move
      piece, // The piece for which we are calculating valid moves
      rank, // The rank (row) of the piece on the board
      file, // The file (column) of the piece on the board
    });

    // Check if the piece is a pawn (indicated by 'p' at the end of its identifier)
    if (piece.endsWith("p")) {
      // If it's a pawn, add its capture moves to the list of valid moves
      moves = [
        ...moves, // Spread the existing moves into a new array
        ...getPawnCaptures({
          position, // Current position of the board
          rank, // The rank of the pawn
          file, // The file of the pawn
          piece, // The pawn piece itself
          previousPosition, // The position of the board before the last move
        }),
      ];
    }

    if (piece.endsWith("k")) {
      // If it's a pawn, add its capture moves to the list of valid moves
      moves = [
        ...moves, // Spread the existing moves into a new array
        ...getCastlingMove({
          position, // Current position of the board
          rank, // The rank of the pawn
          file, // The file of the pawn
          piece, // The pawn piece itself
          castlingDirection,
        }),
      ];
    }

    // Return the complete list of valid moves, including regular moves and captures
    return moves;
  },
  performMove: function ({
    position,
    piece,
    rank,
    file,
    x,
    y,
    previousPosition,
  }) {
    if (piece.endsWith("p")) {
      return movePawn({ position, piece, rank, file, x, y });
    } else {
      return movePiece({ position, piece, rank, file, x, y });
    }
  },
};

export default arbiter;
