import React, { Children } from "react";
import PromotionBox from "./PromotionBox";
import { useAppContext } from "../../context/Context";
import { Status } from "../../constant";
import { closePromotionSquare } from "../../reducer/actions/popUpAction";

export default function PopUp({ children }) {
  const { providerState } = useAppContext();
  const { appState, dispatch } = providerState;

  if (appState.status === Status.ongoing) return null;
  return <div className="popup">{children}</div>;
}
