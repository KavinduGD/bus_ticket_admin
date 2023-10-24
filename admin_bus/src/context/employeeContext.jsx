import { createContext, useReducer } from "react";

export const EmployeeContext = createContext();

export const employeeReducer = (state, action) => {
  switch (action.type) {
    case "SET_EMPLOYEES":
      return {
        employees: action.payload,
      };
    case "CREATE_EMPLOYEE":
      return {
        employees: [...state.employees, action.payload],
      };
    case "UPDATE_EMPLOYEE":
      const updatedEmployee = action.payload;
      const updatedEmployees = state.employees.map((employee) => {
        if (employee._id === updatedEmployee._id) {
          return updatedEmployee;
        }
        return employee;
      });
      return {
        employees: updatedEmployees,
      };
    case "DELETE_EMPLOYEE":
      return {
        employees: state.employees.filter(
          (employee) => employee._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const EmployeeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(employeeReducer, { employees: [] });

  return (
    <EmployeeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </EmployeeContext.Provider>
  );
};
