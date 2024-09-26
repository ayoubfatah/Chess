import { createPosition } from "./helper";

export const Status = {
  ongoing: "Ongoing",
  promotion: "Promotion",
  white: "White wins",
  black: "Black wins",
};

export const initGameState = {
  position: [createPosition()],
  turn: "w",
  candidateMoves: [],
  status: Status.ongoing,
  promotionSquare: null,
};
