import { ScheduleContext } from "../context/scheduleContext";
import { useContext } from "react";

export const useScheduleContext = () => {
  const context = useContext(ScheduleContext);

  if (!context) {
    throw new Error(
      "useScheduleContext must be used within a ScheduleContextProvider"
    );
  }

  return context;
};
