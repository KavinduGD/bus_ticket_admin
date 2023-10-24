import { BusContext } from "../context/busContext";
import { useContext } from "react";

export const useBusContext = () => {
  const context = useContext(BusContext);

  if (!context) {
    throw new Error("useBusContext must be used within a BusContextProvider");
  }

  return context;
};
