import { areSameColorTiles, findPieceCoords } from "../helper";
import {
  getBishopMoves,
  getCastlingMove,
  getKingMoves,
  getKingPosition,
  getKnightMoves,
  getPawnCaptures,
  getPawnMoves,
  getPieces,
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
    const notInCheckMoves = [];

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

    moves.forEach(([x, y]) => {
      const positionAfterMove = this.performMove({
        position,
        piece,
        rank,
        file,
        x,
        y,
      });

      if (
        !this.isPlayerInCheck({ positionAfterMove, position, player: piece[0] })
      ) {
        notInCheckMoves.push([x, y]);
      }
    });

    // Return the complete list of valid moves, including regular moves and captures
    return notInCheckMoves;
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
  isPlayerInCheck: function ({ positionAfterMove, position, player }) {
    const enemy = player.startsWith("w") ? "b" : "w";
    let kingPos = getKingPosition(positionAfterMove, player);
    const enemyPieces = getPieces(positionAfterMove, enemy) || []; // Ensure enemyPieces is an array

    // Debugging logs

    const enemyMoves = enemyPieces.reduce((acc, p) => {
      // console.log("Processing Piece:", p); // Log each enemy piece being processed
      return [
        ...acc,
        ...(p.piece.endsWith("p")
          ? getPawnCaptures({
              position: positionAfterMove,
              prevPosition: position,
              ...p,
            })
          : this.getRegularMoves({
              position: positionAfterMove,
              ...p,
            })),
      ];
    }, []);

    if (enemyMoves.some(([x, y]) => kingPos[0] === x && kingPos[1] === y)) {
      console.log("checked");
      return true;
    } else {
      return false;
    }
  },
  isStalemate: function (position, player, castleDirection) {
    const isInCheck = this.isPlayerInCheck({
      positionAfterMove: position,
      player,
    });

    if (isInCheck) return false;

    const pieces = getPieces(position, player);
    const moves = pieces.reduce(
      (acc, p) =>
        (acc = [
          ...acc,
          ...this.getValidMoves({
            position,
            castleDirection,
            ...p,
          }),
        ]),
      []
    );

    return !isInCheck && moves.length === 0;
  },
  insufficientMaterial: function (position) {
    const pieces = position.reduce(
      (acc, rank) => (acc = [...acc, ...rank.filter((spot) => spot)]),
      []
    );

    // King vs. king
    if (pieces.length === 2) return true;

    // King and bishop vs. king
    // King and knight vs. king
    if (
      pieces.length === 3 &&
      pieces.some((p) => p.endsWith("b") || p.endsWith("n"))
    )
      return true;

    // King and bishop vs. king and bishop of the same color as the opponent's bishop
    if (
      pieces.length === 4 &&
      pieces.every((p) => p.endsWith("b") || p.endsWith("k")) &&
      new Set(pieces).size === 4 &&
      areSameColorTiles(
        findPieceCoords(position, "wb")[0],
        findPieceCoords(position, "bb")[0]
      )
    )
      return true;

    return false;
  },
  isCheckMate: function (position, player, castleDirection) {
    const isInCheck = this.isPlayerInCheck({
      positionAfterMove: position,
      player,
    });

    if (!isInCheck) return false;

    const pieces = getPieces(position, player);
    const moves = pieces.reduce(
      (acc, p) =>
        (acc = [
          ...acc,
          ...this.getValidMoves({
            position,
            castleDirection,
            ...p,
          }),
        ]),
      []
    );

    return isInCheck && moves.length === 0;
  },
};

export default arbiter;
