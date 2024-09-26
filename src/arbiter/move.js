import { copyPosition } from "../helper"; // Import the copyPosition function from the helper module to create a copy of the board position.

export const movePawn = ({ position, piece, rank, file, x, y }) => {
  // Define the movePawn function that takes the current position, piece, its rank and file, and the target x and y coordinates.
  const newPosition = copyPosition(position); // Create a new position by copying the current position to avoid mutating the original state.

  // Check if the target position is empty and the move is not a simple forward move (i.e., the pawn is capturing).
  if (!newPosition[x][y] && x !== rank && y !== file) {
    newPosition[rank][y] = ""; // If the pawn is capturing, clear the piece from the original file (y) of the pawn.
  }

  newPosition[rank][file] = ""; // Clear the original position of the pawn (its current rank and file).
  newPosition[x][y] = piece; // Place the pawn in the new position (x, y).

  return newPosition; // Return the updated position after the move.
};

export const movePiece = ({ position, piece, rank, file, x, y }) => {
  // Define the movePiece function that takes the current position, piece, its rank and file, and the target x and y coordinates.
  const newPosition = copyPosition(position); // Create a new position by copying the current position to avoid mutating the original state.

  newPosition[rank][file] = ""; // Clear the original position of the piece (its current rank and file).
  newPosition[x][y] = piece; // Place the piece in the new position (x, y).

  return newPosition; // Return the updated position after the move.
};


