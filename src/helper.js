export const getCharacter = (file) => String.fromCharCode(file + 97);

export const isEven = (num) => (num % 2 === 0 ? true : false);

export const createPosition = () => {
  const position = new Array(8).fill("").map((x) => new Array(8).fill(""));

  for (let i = 0; i < 8; i++) {
    position[1][i] = "wp";
  }

  for (let i = 0; i < 8; i++) {
    position[6][i] = "bp";
  }

  // //   white pieces
  position[0][0] = "wr";
  position[0][1] = "wn";
  position[0][2] = "wb";
  position[0][3] = "wq";
  position[0][4] = "wk";

  position[0][5] = "wb";
  position[0][6] = "wn";
  position[0][7] = "wr";

  // //   black pieces
  position[7][0] = "br";
  position[7][1] = "bn";
  position[7][2] = "bb";
  position[7][3] = "bq";
  position[7][4] = "bk";

  position[7][5] = "bb";
  position[7][6] = "bn";
  position[7][7] = "br";

  return position;
};

export const copyPosition = (position) => {
  const newPosition = new Array(8).fill("").map((x) => new Array(8).fill(""));
  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      newPosition[rank][file] = position[rank][file];
    }
  }
  return newPosition;
};

export const areSameColorTiles = (coords1, coords2) =>
  (coords1.x + coords1.y) % 2 === coords2.x + coords2.y;

export const findPieceCoords = (position, type) => {
  let results = [];
  position.forEach((rank, i) => {
    rank.forEach((pos, j) => {
      if (pos === type) results.push({ x: i, y: j });
    });
  });
  return results;
};
export const getNewMoveNotation = ({
  piece,
  rank,
  file,
  x,
  y,
  position,
  promotesTo,
}) => {
  let note = "";

  rank = Number(rank);
  file = Number(file);

  // Check for castling (king-side and queen-side)
  if (piece[1] === "k" && Math.abs(file - y) === 2) {
    if (file < y) {
      return "O-O"; // King-side castling
    } else {
      return "O-O-O"; // Queen-side castling
    }
  }

  // Handle knight moves explicitly
  if (piece[1] === "n") {
    note += "N"; // N for knight
  }
  // Handle other pieces (except pawns)
  else if (piece[1] !== "p") {
    note += piece[1].toUpperCase(); // Add the piece's letter (e.g., R for rook, B for bishop)
  }

  // Handle captures
  if (position[x][y]) {
    note += "x"; // Add capture notation
  }

  // Add destination square
  note += getCharacter(y + 1) + (x + 1);

  // Pawn promotion
  if (promotesTo) {
    note += "=" + promotesTo.toUpperCase();
  }

  return note;
};

export const getCapturedPieceClass = (type) => {
  switch (type) {
    case "p": // Pawn
      return `w-p-captured`;
    case "q": // Queen
      return `w-q-captured`;
    case "r": // Rook
      return `w-r-captured`;
    case "b": // Bishop
      return `w-b-captured`;
    case "n": // Knight
      return `w-n-captured`;
    default:
      return "";
  }
};

export const convertCapturedPieces = (pieces) => {
  const pieceMap = {};

  pieces.forEach((piece) => {
    const type = piece[1]; // 'p', 'b', 'n', 'r', 'q', etc.

    // If piece type exists in map, increment the count
    if (pieceMap[type]) {
      pieceMap[type] += 1;
    } else {
      pieceMap[type] = 1; // Otherwise, initialize the count
    }
  });

  // Convert the pieceMap into the desired array of objects
  return Object.entries(pieceMap).map(([type, count]) => ({ type, count }));
};
