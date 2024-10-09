export const getCharacter = (file) => String.fromCharCode(file + 97);

export const isEven = (num) => (num % 2 === 0 ? true : false);

export const createPosition = () => {
  const position = new Array(8).fill("").map((x) => new Array(8).fill(""));

  // for (let i = 0; i < 8; i++) {
  //   position[1][i] = "wp";
  // }

  // for (let i = 0; i < 8; i++) {
  //   position[6][i] = "bp";
  // }

  // //   white pieces
  position[0][0] = "wr";
  // position[0][1] = "wkn";
  // position[0][2] = "wb";
  // position[0][3] = "wq";
  // position[0][4] = "wk";
  position[7][5] = "wk";
  // position[0][5] = "wb";
  // position[0][6] = "wkn";
  // position[0][7] = "wr";

  // //   black pieces
  // position[7][0] = "br";
  // position[7][1] = "bkn";
  // position[7][2] = "bb";
  // position[7][3] = "bq";
  // position[7][4] = "bk";
  position[7][7] = "bk";
  // position[7][5] = "bb";
  // position[7][6] = "bkn";
  // position[7][7] = "br";

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
