import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Dashboard from "./pages/dashboard";
import AddSchedule from "./pages/schedule";
import BusDetails from "./pages/bus";
import Register from "./pages/register";
import RoadRoutes from "./pages/rordRoutes";
import { useEffect, useState } from "react";
import { useBusContext } from "./hooks/useBusContext";
import adminAxios from "./baseUrl";
import Journey from "./pages/journey";
import { useJourneyContext } from "./hooks/useJourneyContext";
import { useRoadRouteContext } from "./hooks/useRoadRouteContext";
import { useScheduleContext } from "./hooks/useScheduleContext";
import { useEmployeeContext } from "./hooks/useEmployeeContext";
import LoginPage from "./pages/loginpage";
import { useUserContext } from "./hooks/useUserContext";
import Report from "./pages/report";

function App() {
  const { buses, dispatch: busDispatch } = useBusContext();
  const { journeys, dispatch: journeyDispatch } = useJourneyContext();
  const { roadRoutes, dispatch: roadRouteDispatch } = useRoadRouteContext();
  const { schedules, dispatch: scheduleDispatch } = useScheduleContext();
  const { employees, dispatch: employeeDispatch } = useEmployeeContext();
  const { user, dispatch: userDispatch } = useUserContext();

  useEffect(() => {
    try {
      adminAxios
        .get("/api/bus")
        .then((res) => {
          busDispatch({ type: "SET_BUSES", payload: res.data });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    try {
      adminAxios
        .get("/api/journey")
        .then((res) => {
          journeyDispatch({ type: "SET_JOURNEYS", payload: res.data });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      adminAxios
        .get("/api/roadRoute")
        .then((res) => {
          roadRouteDispatch({ type: "SET_ROAD_ROUTES", payload: res.data });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    try {
      adminAxios
        .get("/api/schedule")
        .then((res) => {
          scheduleDispatch({ type: "SET_SCHEDULES", payload: res.data });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      adminAxios
        .get("/api/employee")
        .then((res) => {
          employeeDispatch({ type: "SET_EMPLOYEES", payload: res.data });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      const manager = localStorage.getItem("manager");
      console.log("there is ", manager);

      if (manager) {
        userDispatch({ type: "LOGIN", payload: manager });
        console.log("this is con user", user);
      }
    }
  }, []);

  return (
    <div className="app min-h-screen flex flex-col h-full">
      <div className={user == null ? "hidden" : ""}>
        <Navbar />
      </div>
      <div className="content_middle  flex-1 h-full">
        <Routes>
          <Route
            path="/"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/routes"
            element={user ? <RoadRoutes /> : <Navigate to="/login" />}
          />
          <Route
            path="/schedule"
            element={user ? <AddSchedule /> : <Navigate to="/login" />}
          />
          <Route
            path="/journey"
            element={user ? <Journey /> : <Navigate to="/login" />}
          />
          <Route
            path="/bus"
            element={user ? <BusDetails /> : <Navigate to="/login" />}
          />
          <Route
            path="/employee"
            element={user ? <Register /> : <Navigate to="/login" />}
          />
          <Route
            path="/report"
            element={user ? <Report /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <LoginPage />}
          />
        </Routes>
      </div>
      <div className={user == null ? "hidden" : "mt-auto"}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
