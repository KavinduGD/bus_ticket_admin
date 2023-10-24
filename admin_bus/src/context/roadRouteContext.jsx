import { createContext, useReducer } from "react";

export const RoadRouteContext = createContext();

export const roadRouteReducer = (state, action) => {
  switch (action.type) {
    case "SET_ROAD_ROUTES":
      return {
        roadRoutes: action.payload,
      };
    case "CREATE_ROAD_ROUTE":
      return {
        roadRoutes: [...state.roadRoutes, action.payload],
      };
    case "UPDATE_ROAD_ROUTE":
      const updatedRoadRoute = action.payload;
      const updatedRoadRoutes = state.roadRoutes.map((roadRoute) => {
        if (roadRoute.id === updatedRoadRoute.id) {
          return updatedRoadRoute;
        }
        return roadRoute;
      });
      return {
        roadRoutes: updatedRoadRoutes,
      };
    case "DELETE_ROAD_ROUTE":
      return {
        roadRoutes: state.roadRoutes.filter(
          (roadRoute) => roadRoute.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const RoadRouteContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(roadRouteReducer, { roadRoutes: [] });

  return (
    <RoadRouteContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RoadRouteContext.Provider>
  );
};
