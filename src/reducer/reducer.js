import { act } from "react";
import { Status } from "../constant";
import { actionTypes } from "./actions/actionTypes";

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.NEW_MOVE: {
      let { turn, position } = state;
      turn = turn === "w" ? "b" : "w";
      position = [...position, action.payload.newPosition];

      return { ...state, turn, position };
    }

    case actionTypes.GENERATE_CANDIDATE_MOVES: {
      return { ...state, candidateMoves: action.payload.candidateMoves };
    }
    case actionTypes.CLEAR_CANDIDATE_MOVES: {
      return { ...state, candidateMoves: [] };
    }
    case actionTypes.PROMOTION_OPEN: {
      return {
        ...state,
        status: Status.promotion,
        promotionSquare: { ...action.payload },
      };
    }

    case actionTypes.CLOSE_PROMOTION_SQUARE: {
      let { turn } = state;
      turn = turn === "w" ? "b" : "w";
      return {
        ...state,
        status: Status.ongoing,
        promotionSquare: null,
        turn: turn,
      };
    }

    case actionTypes.CAN_CASTLE: {
      let { turn, castlingDirection } = state;
      castlingDirection[turn] = action.payload;
      return {
        ...state,
        castlingDirection,
      };
    }

    case actionTypes.STALEMATE: {
      return {
        ...state,
        status: Status.stalemate,
      };
    }
    case actionTypes.INSUFFICIENT_MATERIAL: {
      return {
        ...state,
        status: Status.insufficient,
      };
    }
    case actionTypes.NEW_GAME: {
      return {
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
