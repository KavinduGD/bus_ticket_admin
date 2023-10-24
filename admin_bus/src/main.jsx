import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { BusContextProvider } from "./context/busContext.jsx";
import { JourneyContextProvider } from "./context/journeyContext.jsx";
import { RoadRouteContextProvider } from "./context/roadRouteContext.jsx";
import { ScheduleContextProvider } from "./context/scheduleContext.jsx";
import { EmployeeContextProvider } from "./context/employeeContext.jsx";
import { UserContextProvider } from "./context/userContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <RoadRouteContextProvider>
          <ScheduleContextProvider>
            <JourneyContextProvider>
              <BusContextProvider>
                <EmployeeContextProvider>
                  <App />
                </EmployeeContextProvider>
              </BusContextProvider>
            </JourneyContextProvider>
          </ScheduleContextProvider>
        </RoadRouteContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
