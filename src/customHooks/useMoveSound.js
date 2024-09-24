import { useCallback } from "react";

export function useMoveSound() {
  const playMoveSound = useCallback(() => {
    const audio = new Audio(require("../assets/sounds/cssMoveSound.mp3"));
    audio
      .play()
      .then(() => {})
      .catch((error) => {
        console.error("Error playing sound:", error);
      });
  }, []);

  return playMoveSound;
}
