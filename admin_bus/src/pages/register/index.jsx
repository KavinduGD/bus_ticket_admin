import React, { useEffect, useState } from "react";
import { useEmployeeContext } from "../../hooks/useEmployeeContext";
import {
  DataGrid,
  GridToolbar,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Box from "@mui/material/Box";
import adminAxios from "../../baseUrl";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { IconButton, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const inputStyle =
  "w-full  px-2.5  pb-2.5 pt-4 text-sm text-gray-900 rounded-lg border-[2px] border-gray-400   focus:outline-none   focus:border-gray-600 shadow-lg";
const errorStyle =
  "w-full  px-2.5  pb-2.5 pt-4 text-sm text-red-400 rounded-lg border-[2px] border-red-400   focus:outline-none   shadow-lg";
const labelStyle =
  "absolute top-[-10px] left-5 bg-white text-base font-roboto text-gray-600";
const errorLabelStyle =
  "absolute top-[-10px] left-5 bg-white text-base font-roboto text-red-400";

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  return (
    <Pagination
      color="secondary"
      variant="text"
      shape="circular"
      page={page + 1}
      count={pageCount}
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}
function Register() {
  const { employees, dispatch: employeeDispatch } = useEmployeeContext();
  const [addEmployeeClicked, setAddEmployeeClicked] = useState(false);
  const [employee, setEmployee] = useState({
    employeeID: "",
    employeeName: "",
    employeeEmail: "",
    employeeRole: "0",
    employeeContact: "",
  });
  const [error, setError] = useState("");
  const [numError, setNumError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [selectedRow, setSelectedRows] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    setEmployee({
      ...employee,
      employeeID: `E${
        employees && employees.length
          ? parseInt(employees[employees.length - 1].employeeID.split("E")[1]) +
            1
          : 1
      }`,
    });
  }, [employees]);

  const handleAddEmployee = () => {
    setAddEmployeeClicked(!addEmployeeClicked);
  };

  const handleEditEmp = (bus) => {
    setSelectedRows(bus);
    setIsEditDialogOpen(true);
  };

  const cancelDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedRows(null);
  };
  const saveUpdateEmp = async () => {
    console.log(selectedRow);

    try {
      const response = await adminAxios.put(
        `/api/employee/${selectedRow._id}`,
        selectedRow
      );

      if (response.status === 200) {
        employeeDispatch({ type: "UPDATE_EMPLOYEE", payload: selectedRow });
        setIsEditDialogOpen(false);
        setSelectedRows(null);
      } else {
        alert("Employee Update Failed");
      }
    } catch (error) {
      console.log("Error Updating Data ", error);
    }
  };
  const handleDeleteEmp = async (id) => {
    console.log(id);
    try {
      const response = await adminAxios.delete(`/api/employee/${id}`);

      if (response.status === 200) {
        employeeDispatch({ type: "DELETE_EMPLOYEE", payload: id });
      } else {
        alert("Employee Delete Failed");
      }
    } catch (error) {
      console.log("Error Deleting Data ", error);
    }
  };

  const columns = [
    {
      field: "employeeID",
      headerName: "Employee ID",
      width: 90,
      flex: 0.35,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "employeeName",
      headerName: "Employee Name",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
      renderCell: (params) => (
        <div className="w-[70%] flex">{params.row.employeeName}</div>
      ),
    },
    {
      field: "employeeEmail",
      headerName: "Employee Email",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
      renderCell: (params) => (
        <div className="w-[70%] flex">{params.row.employeeEmail}</div>
      ),
    },
    {
      field: "employeeRole",
      headerName: "Employee Role",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
      renderCell: (params) => (
        <div className="w-[40%] text-[13px]">
          {params.row.employeeRole.toUpperCase()}
        </div>
      ),
    },
    {
      field: "employeeContact",
      headerName: "Employee Contact",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
    },

    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      flex: 0.25,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            handleEditEmp(params.row);
          }}
        >
          <DriveFileRenameOutlineIcon sx={{ fontSize: 18 }} />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      flex: 0.25,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            handleDeleteEmp(params.row._id);
          }}
        >
          <DeleteOutlinedIcon sx={{ fontSize: 19 }} />
        </IconButton>
      ),
    },
  ];

  const saveEmp = async (e) => {
    e.preventDefault();

    if (
      employee.employeeName == "" ||
      employee.employeeEmail == "" ||
      employee.employeeRole == "0" ||
      employee.employeeContact == ""
    ) {
      setError("Please fill all the fields");
      return;
    }

    if (employee.employeeContact.length != 10) {
      setError("Invalid Contact Number");
      setNumError(true);
      return;
    }
    setNumError(false);

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(employee.employeeEmail)) {
      setError("Invalid Email Address");
      setEmailError(true);
      return;
    }

    setEmailError(false);
    setError("");

    console.log(employee);

    try {
      const res = adminAxios
        .post("api/employee", employee)
        .then((res) => {
          console.log("Employee Added", res.data);
          setEmployee({
            employeeID: "",
            employeeName: "",
            employeeEmail: "",
            employeeRole: "0",
            employeeContact: "",
          });
          console.log(res.data._id);
          alert("Employee Added Successfully");
          employeeDispatch({
            type: "CREATE_EMPLOYEE",
            payload: { ...employee, _id: res.data._id },
          });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-9">
      <div className="flex justify-between items-center px-7 ">
        <h1 className="font-roboto mb-3 text-4xl font-normal ">Employees</h1>
        <button
          className="text-sm px-8 py-2 bg-red-600 text-white rounded-md font-roboto"
          onClick={handleAddEmployee}
        >
          {addEmployeeClicked ? "Back" : "Add Employees"}
        </button>
      </div>
      <div className={addEmployeeClicked ? "hidden" : "px-7"}>
        <Box sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={employees}
            columns={columns}
            rowHeight={35}
            getRowId={(row) => row.employeeID}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 7,
                },
              },
            }}
            showColumnVerticalBorder={true}
            showCellVerticalBorder={true}
            slots={{
              toolbar: GridToolbar,
              pagination: CustomPagination,
            }}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                color: "#dc2626",
                fontFamily: "roboto",
                fontSize: "18px",
                fontWeight: "bold",
                //border: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: "#fff",
                color: "#000",
                fontFamily: "sans-serif",
                fontSize: "14px",
                fontWeight: "400",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#fff",
                paddingRight: "45%",
              },
              "& .MuiDataGrid-toolbarContainer": {
                backgroundColor: "#d6d3d1",
                //center the toolbar
                paddingLeft: "10%",

                "& .MuiButton-text": {
                  color: "#636363",
                },
              },
              //remove cell horizontal border
              "& .MuiDataGrid-cell": {
                //borderBottom: "none",
              },
            }}
          />
        </Box>
      </div>
      <div className={addEmployeeClicked ? "px-7 mt-4" : "hidden"}>
        <form>
          <div className="flex flex-col gap-10">
            <div className="row1 flex justify-between gap-4">
              <div class="relative  w-full">
                <input
                  type="text"
                  id="empID"
                  className={inputStyle}
                  value={`E${
                    employees && employees.length
                      ? parseInt(
                          employees[employees.length - 1].employeeID.split(
                            "E"
                          )[1]
                        ) + 1
                      : 1
                  }`}
                />

                <label for="empID" className={labelStyle}>
                  Employee ID
                </label>
              </div>
              {/* E Name */}
              <div class="relative  w-full">
                <input
                  type="text"
                  id="eName"
                  className={inputStyle}
                  value={employee.employeeName}
                  placeholder="Enter Employee Name"
                  onChange={(e) => {
                    setEmployee({ ...employee, employeeName: e.target.value });
                  }}
                />
                <label for="eName" className={labelStyle}>
                  Employee Name
                </label>
              </div>
            </div>

            <div className="row2 flex gap-3">
              <div class="relative  w-full">
                <input
                  type="text"
                  id="eEmail"
                  className={emailError ? errorStyle : inputStyle}
                  value={employee.employeeEmail}
                  placeholder="Enter Employee Email"
                  onChange={(e) => {
                    setEmployee({ ...employee, employeeEmail: e.target.value });
                  }}
                />
                <label
                  for="eEmail"
                  className={emailError ? errorLabelStyle : labelStyle}
                >
                  Employee Email
                </label>
                {emailError && <p className="text-red-400 text-sm">{error}</p>}
              </div>
              <div class="relative  w-full">
                <label for="role" className={labelStyle}>
                  Employee Role
                </label>
                <select
                  id="roles"
                  className={inputStyle}
                  value={employee.employeeRole}
                  onChange={(e) => {
                    setEmployee({ ...employee, employeeRole: e.target.value });
                  }}
                >
                  <option selected value="0">
                    Choose a Role
                  </option>
                  <option value="driver">Driver</option>
                  <option value="conductor">Conductor</option>
                  <option value="inspector">Inspector</option>
                </select>
              </div>
            </div>
            <div className="row2 flex ">
              <div class="relative  w-[49.4%]">
                <input
                  type="text"
                  id="con"
                  className={numError ? errorStyle : inputStyle}
                  value={employee.employeeContact}
                  placeholder="Enter Contact Number"
                  onChange={(e) => {
                    setEmployee({
                      ...employee,
                      employeeContact: e.target.value,
                    });
                  }}
                />
                <label
                  for="con"
                  className={numError ? errorLabelStyle : labelStyle}
                >
                  Contact Number
                </label>
                {numError && <p className="text-red-400 text-sm">{error}</p>}
              </div>
            </div>

            <div className="row4 flex  flex-col items-center">
              {error === "Please fill all the fields" && (
                <p className="text-red-400 text-sm mb-2">{error}</p>
              )}

              <button
                type="submit"
                onClick={saveEmp}
                className="bg-red-600 text-white px-[300px] py-3 font-semibold font-roboto rounded-md"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
      <Dialog open={isEditDialogOpen}>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
          <form>
            {columns
              .filter(
                (column) => column.field !== "edit" && column.field !== "delete"
              )
              .map((column) => {
                if (column.field === "employeeRole") {
                  return (
                    <>
                      <FormControl fullWidth>
                        <InputLabel>{column.headerName}</InputLabel>
                        <Select
                          labelId="empRole"
                          label={column.headerName}
                          fullWidth
                          value={selectedRow ? selectedRow[column.field] : ""}
                          onChange={(e) =>
                            setSelectedRows({
                              ...selectedRow,
                              [column.field]: e.target.value,
                            })
                          }
                        >
                          <MenuItem value="driver">Driver</MenuItem>
                          <MenuItem value="conductor">Conductor</MenuItem>
                          <MenuItem value="inspector">Inspector</MenuItem>
                        </Select>
                      </FormControl>
                    </>
                  );
                } else {
                  return (
                    <>
                      <TextField
                        key={column.field}
                        value={selectedRow ? selectedRow[column.field] : ""}
                        label={column.headerName}
                        fullWidth
                        margin="normal"
                        disabled={column.field === "employeeID"}
                        onChange={(e) =>
                          setSelectedRows({
                            ...selectedRow,
                            [column.field]: e.target.value,
                          })
                        }
                      />
                    </>
                  );
                }
              })}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDialog} color="error">
            Cancel
          </Button>
          <Button onClick={saveUpdateEmp} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Register;
