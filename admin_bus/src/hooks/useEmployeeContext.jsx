import { EmployeeContext } from "../context/employeeContext";
import { useContext } from "react";

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);

  if (!context) {
    throw new Error(
      "useEmployeeContext must be used within a EmployeeContextProvider"
    );
  }
  return context;
};
