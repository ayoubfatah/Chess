import MovesList from "./components/MovesList"; // Ensure this path is correct
import { createPosition } from "./helper";

export const Status = {
  ongoing: "Ongoing",
  promotion: "Promotion",
  white: "White wins",
  black: "Black wins",
  stalemate: "game draws due to stalemate",
  insufficient: "Game draws due to insufficient material ",
};

export const initGameState = {
  position: [createPosition()],
  turn: "w",
  movesList: [],
  candidateMoves: [],
  status: Status.ongoing,
  promotionSquare: null,
  castlingDirection: {
    w: "both",
    b: "both",
  },
};
