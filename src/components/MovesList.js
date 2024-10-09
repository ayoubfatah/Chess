import { useAppContext } from "../context/Context";

const MovesList = () => {
  const { providerState } = useAppContext();
  const { appState, dispatch } = providerState;
  const { movesList } = appState;
  return (
    <div className="moves-list">
      {movesList?.map((move, i) => (
        <div key={i} data-number={Math.floor(i / 2) + 1}>
          {move}
        </div>
      ))}
    </div>
  );
};

export default MovesList;
