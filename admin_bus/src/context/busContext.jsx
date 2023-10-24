import { createContext, useReducer } from "react";

export const BusContext = createContext();

export const busReducer = (state, action) => {
  switch (action.type) {
    case "SET_BUSES":
      return {
        buses: action.payload,
      };
    case "CREATE_BUS":
      return {
        buses: [...state.buses, action.payload],
      };
    case "UPDATE_BUS":
      const updatedBus = action.payload;
      const updatedBuses = state.buses.map((bus) => {
        if (bus._id === updatedBus._id) {
          return updatedBus;
        }
        return bus;
      });
      return {
        buses: updatedBuses,
      };
    case "DELETE_BUS":
      return {
        buses: state.buses.filter((bus) => bus._id !== action.payload),
      };
    default:
      return state;
  }
};

export const BusContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(busReducer, { buses: [] });

  return (
    <BusContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BusContext.Provider>
  );
};
