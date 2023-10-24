import { RoadRouteContext } from "../context/roadRouteContext";
import { useContext } from "react";

export const useRoadRouteContext = () => {
  const context = useContext(RoadRouteContext);

  if (!context) {
    throw new Error(
      "useRoadRouteContext must be used within a RoadRouteContextProvider"
    );
  }

  return context;
};
