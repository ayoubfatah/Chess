export const getRookMoves = ({ position, piece, rank, file }) => {
  const moves = [];
  const us = piece[0];
  const enemy = us === "w" ? "b" : "w";
  // console.log(`Calculating moves for ${us} piece at (${rank}, ${file})`); // Debug log

  // Directions for the rook (vertical and horizontal)
  const direction = [
    [-1, 0], // Move up (along the rank)
    [1, 0], // Move down (along the rank)
    [0, -1], // Move left (along the file)
    [0, 1], // Move right (along the file)
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

  // console.log(`Possible moves: ${JSON.stringify(moves)}`); // Debug log
  return moves;
};
