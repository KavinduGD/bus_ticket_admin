import React, { useEffect, useState } from "react";
import { useBusContext } from "../../hooks/useBusContext";
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
const inputStyle =
  "w-full  px-2.5  pb-2.5 pt-4 text-sm text-gray-900 rounded-lg border-[2px] border-gray-400   focus:outline-none   focus:border-gray-600 shadow-lg";
const errorStyle =
  "w-full  px-2.5  pb-2.5 pt-4 text-sm text-red-400 rounded-lg border-[2px] border-red-400   focus:outline-none   shadow-lg";
const labelStyle =
  "absolute top-[-10px] left-5 bg-white text-base font-roboto text-gray-600";
const errorLabelStyle =
  "absolute top-[-10px] left-5 bg-white text-base font-roboto text-red-400";

function BusDetails() {
  const { buses, dispatch: busDispatch } = useBusContext();
  const { employees, dispatch: employeeDispatch } = useEmployeeContext();

  const [addBusClicked, setAddBusClicked] = useState(false);
  const [bus, setBus] = useState({
    busID: "",
    registrationNumber: "",
    chassisNumber: "",
    seatCount: "",
    busType: "0",
    busDriver: "0",
    busConductor: "0",
  });
  const [error, setError] = useState("");
  const [registrationNumError, setRegistrationNumError] = useState(false);
  const [chassisNumError, setChassisNumError] = useState(false);
  const [seatCountError, setSeatCountError] = useState(false);
  const [selectedRow, setSelectedRows] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    setBus({
      ...bus,
      busID: `B${
        buses && buses.length
          ? parseInt(buses[buses.length - 1].busID.split("B")[1]) + 1
          : 1
      }`,
    });
  }, [buses]);

  const handleAddBus = () => {
    setAddBusClicked(!addBusClicked);
  };

  const checkError = () => {};

  const saveBus = (e) => {
    e.preventDefault();
    if (
      bus.registrationNumber === "" ||
      bus.chassisNumber === "" ||
      bus.seatCount === "" ||
      bus.busType === "0" ||
      bus.busDriver === "0" ||
      bus.busConductor === "0"
    ) {
      setError("Please fill all the fields");
      return;
    }
    //check the registration number is a already entered one
    if (
      bus.registrationNumber ===
      buses.find((b) => b.registrationNumber === bus.registrationNumber)
        ?.registrationNumber
    ) {
      setError("This registration number is already entered");
      setRegistrationNumError(true);
      return;
    }
    setRegistrationNumError(false);
    //check the chassis number is a already entered one
    if (
      bus.chassisNumber ===
      buses.find((b) => b.chassisNumber === bus.chassisNumber)?.chassisNumber
    ) {
      setError("This chassis number is already entered");
      setChassisNumError(true);
      return;
    }
    setChassisNumError(false);

    if (bus.seatCount > 200) {
      setError("Seat count should be less than 200");
      setSeatCountError(true);
      return;
    }
    setSeatCountError(false);

    setError("");

    try {
      const res = adminAxios
        .post("/api/bus", bus)
        .then((res) => {
          console.log("bus Added", res.data);
          setBus({
            busID: "",
            registrationNumber: "",
            chassisNumber: "",
            seatCount: "",
            busType: "0",
            busDriver: "0",
            busConductor: "0",
          });
          alert("Bus Added Successfully");
          console.log(res.data._id);
          busDispatch({
            type: "CREATE_BUS",
            payload: { ...bus, _id: res.data._id },
          });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditBus = (bus) => {
    setSelectedRows(bus);
    setIsEditDialogOpen(true);
  };

  const cancelDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedRows(null);
  };

  const saveUpdateBus = async () => {
    console.log(selectedRow);

    try {
      const response = await adminAxios.put(
        `/api/bus/${selectedRow._id}`,
        selectedRow
      );

      if (response.status === 200) {
        busDispatch({ type: "UPDATE_BUS", payload: selectedRow });
        setIsEditDialogOpen(false);
        setSelectedRows(null);
      } else {
        alert("Bus Update Failed");
      }
    } catch (error) {
      console.log("Error Updating Data ", error);
    }
  };

  const handleDeleteBus = async (id) => {
    console.log(id);
    try {
      const response = await adminAxios.delete(`/api/bus/${id}`);

      if (response.status === 200) {
        busDispatch({ type: "DELETE_BUS", payload: id });
      } else {
        alert("Bus Delete Failed");
      }
    } catch (error) {
      console.log("Error Deleting Data ", error);
    }
  };

  const columns = [
    {
      field: "busID",
      headerName: "Bus ID",
      width: 90,
      flex: 0.35,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "registrationNumber",
      headerName: "Registration Number",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "chassisNumber",
      headerName: "Chassis Number",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "busType",
      headerName: "Bus Type",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "seatCount",
      headerName: "Seat Count",
      width: 90,
      flex: 0.35,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "busDriver",
      headerName: "Driver Name",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
      renderCell: (params) => (
        <div className="flex justify-start text-[13px] w-[90%]">
          {employees.map((employee) => {
            if (employee._id === params.row.busDriver) {
              return employee.employeeName;
            }
          })}
        </div>
      ),
    },
    {
      field: "busConductor",
      headerName: "Conductor Name",
      width: 90,
      flex: 0.5,
      //align: "center",
      headerAlign: "center",
      type: "string",
      renderCell: (params) => (
        <div className="flex justify-start text-[13px] w-[90%]">
          {employees.map((employee) => {
            if (employee._id === params.row.busConductor) {
              return employee.employeeName;
            }
          })}
        </div>
      ),
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
            handleEditBus(params.row);
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
            handleDeleteBus(params.row._id);
          }}
        >
          <DeleteOutlinedIcon sx={{ fontSize: 19 }} />
        </IconButton>
      ),
    },
  ];

  return (
    <div className={`mx-9  shadow-lg ${addBusClicked ? "pb-14" : ""}`}>
      <div className="flex justify-between items-center px-7 ">
        <h1 className="font-roboto mb-3 text-4xl font-normal ">Buses</h1>
        <button
          className="px-8 py-2 bg-red-600 text-white rounded-md font-roboto text-sm"
          onClick={handleAddBus}
        >
          {addBusClicked ? "Back" : "Add Bus"}
        </button>
      </div>

      <div className={addBusClicked ? "hidden" : "px-7"}>
        <Box sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={buses}
            columns={columns}
            rowHeight={35}
            getRowId={(row) => row.busID}
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

      <div className={addBusClicked ? "mt-4 px-7" : "hidden"}>
        <form>
          <div className="flex flex-col gap-10">
            <div className="row1 flex justify-between gap-4">
              <div class="relative  w-full">
                <input
                  type="text"
                  id="busNumber"
                  className={inputStyle}
                  value={`B${
                    buses && buses.length
                      ? parseInt(buses[buses.length - 1].busID.split("B")[1]) +
                        1
                      : 1
                  }`}
                />

                <label
                  for="busNumber"
                  //change the lable text color when in put is focused
                  className={labelStyle}
                >
                  Bus ID
                </label>
              </div>
              <div class="relative  w-full">
                <input
                  type="text"
                  id="busNumber1"
                  className={registrationNumError ? errorStyle : inputStyle}
                  value={bus.registrationNumber}
                  placeholder="Enter Registration Number"
                  onChange={(e) => {
                    setBus({ ...bus, registrationNumber: e.target.value });
                  }}
                />
                <label
                  for="busNumber1"
                  className={
                    registrationNumError ? errorLabelStyle : labelStyle
                  }
                >
                  Registration Number
                </label>
                {registrationNumError && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}
              </div>
            </div>
            <div className="row2 flex gap-3">
              <div class="relative  w-full">
                <input
                  type="text"
                  id="busNumber3"
                  className={chassisNumError ? errorStyle : inputStyle}
                  value={bus.chassisNumber}
                  placeholder="Enter Chassis Number"
                  onChange={(e) => {
                    setBus({ ...bus, chassisNumber: e.target.value });
                  }}
                />
                <label
                  for="busNumber3"
                  className={chassisNumError ? errorLabelStyle : labelStyle}
                >
                  Chassis Number
                </label>
                {chassisNumError && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}
              </div>
              <div class="relative  w-full">
                <input
                  type="number"
                  id="busNumber1"
                  className={seatCountError ? errorStyle : inputStyle}
                  value={bus.seatCount}
                  onChange={(e) => {
                    setBus({ ...bus, seatCount: e.target.value });
                  }}
                  placeholder="Enter Seat Count"
                />
                <label
                  for="busNumber1"
                  className={seatCountError ? errorLabelStyle : labelStyle}
                >
                  Seat Count
                </label>
                {seatCountError && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}
              </div>
            </div>

            <div className="row3 flex gap-3">
              <div class="relative  w-full">
                <label for="busNumber1" className={labelStyle}>
                  Bus Type
                </label>
                <select
                  id="countries"
                  className={inputStyle}
                  value={bus.busType}
                  onChange={(e) => {
                    setBus({ ...bus, busType: e.target.value });
                  }}
                >
                  <option selected value="0">
                    Choose a Type
                  </option>
                  <option value="Shuttle bus">Shuttle bus</option>
                  <option value="Minicoach">Minicoach</option>
                  <option value="Double-decker bus">Double-decker bus</option>
                  <option value="Low-floor bus">Low-floor bus</option>
                </select>
              </div>
              {/* driver */}
              <div class="relative  w-full">
                <label for="busNumber1" className={labelStyle}>
                  Driver Name
                </label>
                <select
                  id="countries"
                  className={inputStyle}
                  value={bus.busDriver}
                  onChange={(e) => {
                    setBus({ ...bus, busDriver: e.target.value });
                  }}
                >
                  <option selected value="0">
                    Choose a Driver
                  </option>
                  {employees.map((employee) => {
                    if (employee.employeeRole === "driver") {
                      return (
                        <option key={employee._id} value={employee._id}>
                          {employee.employeeID} -{employee.employeeName}
                        </option>
                      );
                    }
                    return null;
                  })}
                </select>
              </div>
              <div class="relative  w-full ">
                <label for="busNumber1" className={labelStyle}>
                  Conductor Name
                </label>
                <select
                  id="countries"
                  className={inputStyle}
                  value={bus.busConductor}
                  onChange={(e) => {
                    setBus({ ...bus, busConductor: e.target.value });
                  }}
                >
                  <option selected value="0">
                    Choose a Conducer
                  </option>
                  {employees.map((employee) => {
                    if (employee.employeeRole === "conductor") {
                      return (
                        <option key={employee._id} value={employee._id}>
                          {employee.employeeID} - {employee.employeeName}
                        </option>
                      );
                    }
                    return null;
                  })}
                </select>
              </div>
            </div>

            <div className="row4 flex  flex-col items-center">
              {error === "Please fill all the fields" && (
                <p className="text-red-400 text-sm mb-2">{error}</p>
              )}

              <button
                onClick={saveBus}
                className="bg-red-600 text-white px-[300px] py-3 font-semibold font-roboto rounded-md"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>

      <Dialog open={isEditDialogOpen}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <form>
            {columns
              .filter(
                (column) => column.field !== "edit" && column.field !== "delete"
              )
              .map((column) => {
                if (column.field === "busType") {
                  return (
                    <>
                      <FormControl
                        fullWidth
                        style={{ marginTop: "16px", marginBottom: "8px" }}
                      >
                        <InputLabel id="busType">
                          {column.headerName}
                        </InputLabel>
                        <Select
                          labelId="busType"
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
                          <MenuItem value="Shuttle bus">Shuttle bus</MenuItem>
                          <MenuItem value="Minicoach">Minicoach</MenuItem>
                          <MenuItem value="Double-decker bus">
                            Double-decker bus
                          </MenuItem>
                          <MenuItem value="Low-floor bus">
                            Low-floor bus
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </>
                  );
                } else if (column.field === "busDriver") {
                  return (
                    <>
                      <FormControl fullWidth style={{ marginTop: "17px" }}>
                        <InputLabel id="busDriver">
                          {column.headerName}
                        </InputLabel>
                        <Select
                          fullWidth
                          labelId="busDriver"
                          label={column.headerName}
                          value={selectedRow ? selectedRow[column.field] : ""}
                          onChange={(e) =>
                            setSelectedRows({
                              ...selectedRow,
                              [column.field]: e.target.value,
                            })
                          }
                        >
                          {employees.map((employee) => {
                            if (employee.employeeRole === "driver") {
                              return (
                                <MenuItem
                                  key={employee._id}
                                  value={employee._id}
                                >
                                  {employee.employeeID} -{" "}
                                  {employee.employeeName}
                                </MenuItem>
                              );
                            }
                            return null;
                          })}
                        </Select>
                      </FormControl>
                    </>
                  );
                } else if (column.field === "busConductor") {
                  return (
                    <>
                      <FormControl fullWidth style={{ marginTop: "22px" }}>
                        <InputLabel id="busConductor">
                          {column.headerName}
                        </InputLabel>
                        <Select
                          fullWidth
                          labelId="busConductor"
                          label={column.headerName}
                          value={selectedRow ? selectedRow[column.field] : ""}
                          onChange={(e) =>
                            setSelectedRows({
                              ...selectedRow,
                              [column.field]: e.target.value,
                            })
                          }
                        >
                          {employees.map((employee) => {
                            if (employee.employeeRole === "conductor") {
                              return (
                                <MenuItem
                                  key={employee._id}
                                  value={employee._id}
                                >
                                  {employee.employeeID} -{" "}
                                  {employee.employeeName}
                                </MenuItem>
                              );
                            }
                            return null;
                          })}
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
                        disabled={column.field === "busID"}
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
          <Button onClick={saveUpdateBus} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BusDetails;
