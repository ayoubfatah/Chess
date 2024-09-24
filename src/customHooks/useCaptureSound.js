import { useCallback } from "react";

export function useCaptureSound() {
  const playCaptureSound = useCallback(() => {
    const audio = new Audio(require("../assets/sounds/chessCaptureSound.mp3"));
    audio
      .play()
      .then(() => {})
      .catch((error) => {
        console.error("Error playing sound:", error);
      });
  }, []);

  return playCaptureSound;
}
