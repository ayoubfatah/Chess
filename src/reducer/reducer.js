import { act } from "react";
import { Status } from "../constant";
import { actionTypes } from "./actions/actionTypes";

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.NEW_MOVE: {
      let { turn, position, movesList } = state;
      turn = turn === "w" ? "b" : "w";
      position = [...position, action.payload.newPosition];
      movesList = [...movesList, action.payload.newMove];

      return { ...state, turn, position, movesList };
    }
    case actionTypes.TAKE_BACK: {
      let { position, movesList, turn } = state;
      if (position.length > 1) {
        position = position.slice(0, position.length - 1);
        movesList = movesList.slice(0, movesList.length - 1);
        turn = turn === "w" ? "b" : "w";
      }

      return {
        ...state,
        position,
        movesList,
        turn,
      };
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

    case actionTypes.WIN: {
      return {
        ...state,
        status: action.payload === "b" ? Status.black : Status.white,
      };
    }
    case actionTypes.NEW_GAME: {
      return {
        ...action.payload,
      };
    }

    // taken by white
    case actionTypes.TAKEN_BY_WHITE: {
      let { piecesTakenByWhite } = state;
      piecesTakenByWhite = [...piecesTakenByWhite, action.payload];
      return {
        ...state,
        piecesTakenByWhite,
      };
    }

    case actionTypes.TAKEN_BY_BLACK: {
      let { piecesTakenByBlack } = state;
      piecesTakenByBlack = [...piecesTakenByBlack, action.payload];
      return {
        ...state,
        piecesTakenByBlack,
      };
    }

    default: {
      return state;
    }
  }
};
