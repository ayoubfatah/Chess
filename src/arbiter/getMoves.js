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
        break;
      }
      // If the new position contains a piece of the same color, break the loop
      if (position[x][y].startsWith(us)) {
        break;
      }
      // If the new position is empty, add it to moves
      moves.push([x, y]);
    }
  });

  // Return the array of moves
  return moves;
};

export const getKnightMoves = ({ position, rank, file }) => {
  const moves = [];
  const enemy = position[rank][file].startsWith("w") ? "b" : "w";
  const candidates = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];

  candidates.forEach((dir) => {
    const newRank = rank + dir[0];
    const newFile = file + dir[1];
    const cell = position?.[newRank]?.[newFile];

    if (cell !== undefined && (cell.startsWith(enemy) || cell === "")) {
      moves.push([newRank, newFile]);
    }
  });

  return moves;
};

export const getBishopMoves = ({ position, piece, rank, file }) => {
  const moves = [];
  const us = piece[0];
  const enemy = us === "w" ? "b" : "w";

  const direction = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  direction.forEach((dir) => {
    for (let i = 1; i <= 8; i++) {
      const x = rank + i * dir[0];
      const y = file + i * dir[1];
      if (position?.[x]?.[y] === undefined) break;
      if (position[x][y].startsWith(enemy)) {
        moves.push([x, y]);
        break;
      }
      if (position[x][y].startsWith(us)) {
        break;
      }
      moves.push([x, y]);
    }
  });

  return moves;
};

export const getQueenMoves = ({ position, piece, rank, file }) => {
  const moves = [];
  const us = piece[0];
  const enemy = us === "w" ? "b" : "w";

  const direction = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  direction.forEach((dir) => {
    for (let i = 1; i <= 8; i++) {
      const x = rank + i * dir[0];
      const y = file + i * dir[1];
      if (position?.[x]?.[y] === undefined) break;
      if (position[x][y].startsWith(enemy)) {
        moves.push([x, y]);
        break;
      }
      if (position[x][y].startsWith(us)) {
        break;
      }
      moves.push([x, y]);
    }
  });

  return moves;
};

export const getKingMoves = ({ position, piece, rank, file }) => {
  const moves = [];
  const us = piece[0];

  const direction = [
    [1, -1],
    [1, 0],
    [1, 1],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ];

  direction.forEach((dir) => {
    const x = rank + dir[0];
    const y = file + dir[1];
    if (position?.[x]?.[y] !== undefined && !position[x][y].startsWith(us)) {
      moves.push([x, y]);
    }
  });

  return moves;
};

export const getPawnMoves = ({ position, piece, rank, file }) => {
  const moves = [];
  const dir = piece === "wp" ? 1 : -1;
  const us = piece[0];
  const enemy = us === "w" ? "b" : "w";

  if (!position?.[rank + dir][file]) {
    moves.push([rank + dir, file]);
  }

  if ((us === "w" && rank === 1) || (us === "b" && rank === 6)) {
    if (
      position?.[rank + dir]?.[file] === "" &&
      position?.[rank + dir + dir]?.[file] === ""
    ) {
      moves.push([rank + dir + dir, file]);
    }
  }

  if (position[rank][file]) return moves;
};

export const getPawnCaptures = ({ position, piece, rank, file }) => {
  const moves = [];
  const dir = piece === "wp" ? 1 : -1;
  const us = piece[0];
  const enemy = us === "w" ? "b" : "w";
  if (
    position?.[rank + dir]?.[file - 1] &&
    position?.[rank + dir]?.[file - 1].startsWith(enemy)
  ) {
    moves.push([rank + dir, file - 1]);
  }

  if (
    position?.[rank + dir]?.[file + 1] &&
    position?.[rank + dir]?.[file + 1].startsWith(enemy)
  ) {
    moves.push([rank + dir, file + 1]);
  }
  return moves;
};

