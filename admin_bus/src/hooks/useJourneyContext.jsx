import { JourneyContext } from "../context/journeyContext";
import { useContext } from "react";

export const useJourneyContext = () => {
  const context = useContext(JourneyContext);

  if (!context) {
    throw new Error(
      "useJourneyContext must be used within a JourneyContextProvider"
    );
  }

  return context;
};
