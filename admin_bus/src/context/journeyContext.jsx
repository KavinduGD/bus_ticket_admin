import { createContext, useReducer } from "react";

export const JourneyContext = createContext();

export const journeyReducer = (state, action) => {
  switch (action.type) {
    case "SET_JOURNEYS":
      return {
        journeys: action.payload,
      };
    case "CREATE_JOURNEY":
      return {
        journeys: [...state.journeys, action.payload],
      };
    case "UPDATE_JOURNEY":
      const updatedJourney = action.payload;
      const updatedJourneys = state.journeys.map((journey) => {
        if (journey.journeyId === updatedJourney.journeyId) {
          journey = { ...journey, ...updatedJourney };
        }
        return journey;
      });
      return {
        journeys: updatedJourneys,
      };
    case "DELETE_JOURNEY":
      return {
        journeys: state.journeys.filter(
          (journey) => journey.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const JourneyContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(journeyReducer, { journeys: [] });

  return (
    <JourneyContext.Provider value={{ ...state, dispatch }}>
      {children}
    </JourneyContext.Provider>
  );
};
