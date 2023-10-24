import { createContext, useReducer } from "react";

export const ScheduleContext = createContext();

export const scheduleReducer = (state, action) => {
  switch (action.type) {
    case "SET_SCHEDULES":
      return {
        schedules: action.payload,
      };
    case "CREATE_SCHEDULE":
      return {
        schedules: [...state.schedules, action.payload],
      };
    case "UPDATE_SCHEDULE":
      const updatedSchedule = action.payload;
      const updatedSchedules = state.schedules.map((schedule) => {
        if (schedule.id === updatedSchedule.id) {
          return updatedSchedule;
        }
        return schedule;
      });
      return {
        schedules: updatedSchedules,
      };
    case "DELETE_SCHEDULE":
      return {
        schedules: state.schedules.filter(
          (schedule) => schedule.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const ScheduleContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(scheduleReducer, { schedules: [] });

  return (
    <ScheduleContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ScheduleContext.Provider>
  );
};
