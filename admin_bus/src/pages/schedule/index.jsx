import React, { useState } from "react";
import { useScheduleContext } from "../../hooks/useScheduleContext";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
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
import { useRoadRouteContext } from "../../hooks/useRoadRouteContext";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { IconButton } from "@mui/material";

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
      // @ts-expect-error
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

function AddSchedule() {
  const { schedules, dispatch } = useScheduleContext();
  const { roadRoutes, dispatch: roadRouteDispatch } = useRoadRouteContext();

  const [routeId, setRouteId] = useState("");
  const [dayIndex, setDayIndex] = useState(0);

  console.log("schedules", schedules);
  console.log("roadRoutes", roadRoutes);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const columns = [
    {
      field: "scheduleId",
      headerName: "Schedule ID",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
    },

    {
      field: "scheduleType",
      headerName: "Type",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
      renderCell: (params) => {
        if (params.row.scheduleType === "startToEnd") {
          return (
            <div>
              {roadRoutes.find((route) => route._id === routeId).start} to{" "}
              {roadRoutes.find((route) => route._id === routeId).end}
            </div>
          );
        } else {
          return (
            <div>
              {roadRoutes.find((route) => route._id === routeId).end} to{" "}
              {roadRoutes.find((route) => route._id === routeId).start}
            </div>
          );
        }
      },
    },
    {
      field: "startTime",
      headerName: "Start Time",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
      renderCell: (params) => {
        const startTime = new Date(params.row.startTime);
        const timeString = startTime.toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        });

        return <div>{timeString}</div>;
      },
    },
    {
      field: "endTime",
      headerName: "EndTime",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
      renderCell: (params) => {
        const endTime = new Date(params.row.endTime);
        const timeString = endTime.toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        });

        return <div>{timeString}</div>;
      },
    },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      flex: 0.25,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <IconButton onClick={() => {}}>
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
        <IconButton onClick={() => {}}>
          <DeleteOutlinedIcon sx={{ fontSize: 19 }} />
        </IconButton>
      ),
    },
  ];

  return (
    <div className="mx-9  shadow-lg h-full">
      <div className="flex items-center justify-between">
        <h1 className="font-roboto  text-4xl font-normal ml-7 ">Schedule</h1>

        {!(routeId === "") && (
          <div className="flex gap-5 font-roboto  text-red-600 font-semibold text-lg ml-14">
            <span>
              {roadRoutes.find((route) => route._id === routeId).start}
            </span>
            <span>to</span>
            <span>{roadRoutes.find((route) => route._id === routeId).end}</span>
          </div>
        )}
        <div className="flex items-center gap-4 mr-7">
          <p className="font-roboto text-lg ">Select Route -</p>
          <select
            id="routes"
            className={`w-[150px] text-center text-lg h-10 px-2.5  ${
              routeId ? "text-gray-800" : "text-gray-600"
            }  rounded-lg border-[1px] ${
              routeId ? "border-gray-400" : "text-gray-500"
            }   focus:outline-none`}
            value={routeId}
            onChange={(e) => setRouteId(e.target.value)}
          >
            <option value="">Select Route</option>
            {roadRoutes.map((route) => (
              <option value={route._id}>{route.routeId}</option>
            ))}
          </select>
        </div>
      </div>

      <div
        className={routeId === "" ? "hidden" : "flex  mt-1  px-7  h-[500px] "}
      >
        <Carousel
          animation="slide"
          className="w-full "
          autoPlay={false}
          onChange={(index) => setDayIndex(index)}
        >
          {daysOfWeek.map((day, index) => (
            <Paper key={index} className="w-full   flex flex-col h-full gap-3">
              <h2 className="text-2xl font-bold text-center ">{day}</h2>
              <Box sx={{ height: "100%", width: "100%" }}>
                <DataGrid
                  columns={columns}
                  rows={schedules.filter(
                    (schedule) =>
                      schedule.route === routeId && schedule.day === day
                  )}
                  getRowId={(row) => row._id}
                  rowHeight={35}
                  slots={{
                    pagination: CustomPagination,
                  }}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 9,
                      },
                    },
                  }}
                  showColumnVerticalBorder={true}
                  showCellVerticalBorder={true}
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
                      // borderBottom: "none",
                    },
                  }}
                />
              </Box>
            </Paper>
          ))}
        </Carousel>
      </div>
      <div
        className={
          routeId === ""
            ? "mt-[160px] flex justify-center font-bold text-4xl text-red-600 pb-[200px]"
            : "hidden"
        }
      >
        Select a Route
      </div>
    </div>
  );
}

export default AddSchedule;
