export const getRookMoves = ({ position, piece, rank, file }) => {
  // Initialize an empty array to store the moves
  const moves = [];

  // Determine the color of the piece (white or black)
  const us = piece[0];

  // Determine the color of the enemy pieces
  const enemy = us === "w" ? "b" : "w";

  // Define the directions for the rook to move (up, down, left, right)
  const direction = [
    [-1, 0], // Move up (along the rank)
    [1, 0], // Move down (along the rank)
    [0, -1], // Move left (along the file)
    [0, 1], // Move right (along the file)
  ];

  // Iterate through each direction
  direction.forEach((direction) => {
    // Check for moves up to 8 squares in each direction
    for (let i = 1; i <= 8; i++) {
      // Calculate the new position based on the direction and iteration
      const x = rank + i * direction[0];
      const y = file + i * direction[1];

      // If the new position is off the board, break the loop
      if (position?.[x]?.[y] === undefined) break;

      // If the new position contains an enemy piece, add it to moves and break the loop
      if (position[x][y].startsWith(enemy)) {
        moves.push([x, y]);
        break; // Stop moving in this direction after capturing
      }

      // If the new position contains a piece of the same color, break the loop
      if (position[x][y].startsWith(us)) {
        break; // Stop moving in this direction if blocked by own piece
      }

      // If the new position is empty, add it to moves
      moves.push([x, y]);
    }
  });

  // Return the array of moves
  return moves;
};

export const getKnightMoves = ({ position, rank, file }) => {
  // Initialize an empty array to store the possible moves for the knight
  const moves = [];

  // Determine the color of the enemy pieces based on the knight's current position
  const enemy = position[rank][file].startsWith("w") ? "b" : "w";

  // Define the possible movement patterns for a knight
  // Knights move in an "L" shape: two squares in one direction and then one square perpendicular
  const candidates = [
    [-2, -1], // Move up two squares and left one square
    [-2, 1], // Move up two squares and right one square
    [-1, -2], // Move up one square and left two squares
    [-1, 2], // Move up one square and right two squares
    [1, -2], // Move down one square and left two squares
    [1, 2], // Move down one square and right two squares
    [2, -1], // Move down two squares and left one square
    [2, 1], // Move down two squares and right one square
  ];

  // Iterate through each possible movement direction
  candidates.forEach((dir) => {
    // Calculate the new rank and file based on the knight's movement
    const newRank = rank + dir[0];
    const newFile = file + dir[1];

    // Check if the new position is within the bounds of the board
    const cell = position?.[newRank]?.[newFile];

    // If the cell is defined and either contains an enemy piece or is empty, add it to the possible moves
    if (cell !== undefined && (cell.startsWith(enemy) || cell === "")) {
      moves.push([newRank, newFile]); // Add the new position to the moves array
    }
  });

  // Return the array of possible moves for the knight
  return moves;
};

export const getBishopMoves = ({ position, piece, rank, file }) => {
  // Initialize an empty array to store the possible moves for the bishop
  const moves = [];

  // Determine the color of the bishop (white or black) based on the piece string
  const us = piece[0];

  // Determine the color of the enemy pieces
  const enemy = us === "w" ? "b" : "w";

  // Define the possible diagonal movement directions for the bishop
  const direction = [
    [-1, -1], // Move diagonally up-left
    [-1, 1], // Move diagonally up-right
    [1, -1], // Move diagonally down-left
    [1, 1], // Move diagonally down-right
  ];

  // Iterate through each diagonal direction
  direction.forEach((dir) => {
    // Check for moves up to 8 squares in each diagonal direction
    for (let i = 1; i <= 8; i++) {
      // Calculate the new position based on the direction and iteration
      const x = rank + i * dir[0]; // New rank
      const y = file + i * dir[1]; // New file

      // If the new position is off the board, break the loop
      if (position?.[x]?.[y] === undefined) break;

      // If the new position contains an enemy piece, add it to moves and break the loop
      if (position[x][y].startsWith(enemy)) {
        moves.push([x, y]); // Add the enemy position to possible moves
        break; // Stop moving in this direction after capturing
      }

      // If the new position contains a piece of the same color, break the loop
      if (position[x][y].startsWith(us)) {
        break; // Stop moving in this direction if blocked by own piece
      }

      // If the new position is empty, add it to moves
      moves.push([x, y]); // Add the empty position to possible moves
    }
  });

  // Return the array of possible moves for the bishop
  return moves;
};

export const getQueenMoves = ({ position, piece, rank, file }) => {
  const moves = [
    ...getBishopMoves({ position, piece, rank, file }),
    ...getRookMoves({ position, piece, rank, file }),
  ];

  return moves;
};

export const getKingMoves = ({ position, piece, rank, file }) => {
  // Initialize an empty array to store the possible moves for the king
  const moves = [];

  // Determine the color of the king (white or black) based on the piece string
  const us = piece[0];

  // Define the possible movement directions for the king (one square in any direction)
  const direction = [
    [1, -1], // Move down one square and left one square
    [1, 0], // Move down one square
    [1, 1], // Move down one square and right one square
    [0, -1], // Move left one square
    [0, 1], // Move right one square
    [-1, -1], // Move up one square and left one square
    [-1, 0], // Move up one square
    [-1, 1], // Move up one square and right one square
  ];

  // Iterate through each direction
  direction.forEach((dir) => {
    // Calculate the new position based on the direction
    const x = rank + dir[0];
    const y = file + dir[1];

    // If the new position is valid and does not contain a piece of the same color, add it to moves
    if (position?.[x]?.[y] !== undefined && !position[x][y].startsWith(us)) {
      moves.push([x, y]);
    }
  });

  // Return the array of possible moves for the king
  return moves;
};

export const getPawnMoves = ({ position, piece, rank, file }) => {
  // Initialize an empty array to store the possible moves for the pawn
  const moves = [];

  // Determine the direction of movement based on the pawn's color
  const dir = piece === "wp" ? 1 : -1; // White pawns move up, black pawns move down
  const us = piece[0]; // Determine the color of the pawn
  const enemy = us === "w" ? "b" : "w"; // Determine the color of the enemy pieces

  // Check if the square directly in front of the pawn is empty
  if (!position?.[rank + dir][file]) {
    moves.push([rank + dir, file]); // Add the forward move to the possible moves
  }

  // Check for double move from the starting position
  if ((us === "w" && rank === 1) || (us === "b" && rank === 6)) {
    if (
      position?.[rank + dir]?.[file] === "" && // Check if the square in front is empty
      position?.[rank + dir + dir]?.[file] === "" // Check if the square two in front is empty
    ) {
      moves.push([rank + dir + dir, file]); // Add the double move to the possible moves
    }
  }

  // Return the array of possible moves for the pawn
  return moves;
};

export const getPawnCaptures = ({
  position,
  piece,
  rank,
  file,
  previousPosition,
}) => {
  // Initialize an empty array to store the possible captures for the pawn
  const moves = [];

  // Determine the direction of movement based on the pawn's color
  const dir = piece === "wp" ? 1 : -1; // White pawns move up, black pawns move down
  const us = piece[0]; // Determine the color of the pawn
  const enemy = us === "w" ? "b" : "w"; // Determine the color of the enemy pieces

  // Check if the square diagonally left in front of the pawn contains an enemy piece
  if (
    position?.[rank + dir]?.[file - 1] && // Check if the square is defined
    position?.[rank + dir]?.[file - 1].startsWith(enemy) // Check if it contains an enemy piece
  ) {
    moves.push([rank + dir, file - 1]); // Add the capture move to the possible moves
  }

  // Check if the square diagonally right in front of the pawn contains an enemy piece
  if (
    position?.[rank + dir]?.[file + 1] && // Check if the square is defined
    position?.[rank + dir]?.[file + 1].startsWith(enemy) // Check if it contains an enemy piece
  ) {
    moves.push([rank + dir, file + 1]); // Add the capture move to the possible moves
  }

  // en-passant logic

  // Determine the enemy pawn based on the direction of movement
  const enemyPawn = dir === 1 ? "bp" : "wp"; // If moving up (dir === 1), the enemy pawn is black; if moving down (dir === -1), it's white.

  // Define the files (columns) to check for potential en passant captures
  const files = [file - 1, file + 1]; // Check the left and right diagonal squares of the pawn's current position.

  // Check if there was a previous position (to determine if en passant is possible)
  if (previousPosition) {
    // Check if the pawn is in the correct rank for en passant (4 for white, 3 for black)
    if ((dir === 1 && rank === 4) || (dir === -1 && rank === 3)) {
      // Check if the square diagonally left in front of the pawn contains an enemy pawn

      // Iterate through the files to check for en passant conditions
      files.forEach((f) => {
        if (position?.[rank][f] === enemyPawn) {
          // Check if the square directly in front of the enemy pawn is also occupied by the enemy pawn
          if (
            position?.[rank][f] === enemyPawn && // The square in front of the enemy pawn must also contain the enemy pawn
            position?.[rank + dir + dir][f] === "" && // The square two in front of the enemy pawn must be empty
            previousPosition?.[rank + dir + dir][f] === enemyPawn && // The previous position must have the enemy pawn in the same file
            previousPosition?.[rank][f] === "" // The square in front of the enemy pawn must be empty in the previous position
          ) {
            // If all conditions are met, add the en passant capture move to the possible moves
            moves.push([rank + dir, f]); // Add the position where the pawn can capture the enemy pawn en passant
          }
        }
      });
    }
  }

  // Return the array of possible captures for the pawn
  return moves;
};
