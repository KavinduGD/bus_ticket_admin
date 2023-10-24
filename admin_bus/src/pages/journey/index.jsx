import "./journey.css";
import React, { useEffect, useState } from "react";
import { useRoadRouteContext } from "../../hooks/useRoadRouteContext";
import { useJourneyContext } from "../../hooks/useJourneyContext";
import { useScheduleContext } from "../../hooks/useScheduleContext";
import { useBusContext } from "../../hooks/useBusContext";
import { useEmployeeContext } from "../../hooks/useEmployeeContext";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  usePickerLayout,
  pickersLayoutClasses,
  PickersLayoutRoot,
  PickersLayoutContentWrapper,
} from "@mui/x-date-pickers/PickersLayout";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import dayjs from "dayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import adminAxios from "../../baseUrl";
import { Box } from "@mui/material";

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
function CustomLayout(props) {
  const { toolbar, tabs, content } = usePickerLayout(props);

  return (
    <PickersLayoutRoot
      ownerState={props}
      sx={{ height: "400px", width: "310px" }}
    >
      {toolbar}

      <PickersLayoutContentWrapper
        className={pickersLayoutClasses.contentWrapper}
      >
        {tabs}
        {content}
      </PickersLayoutContentWrapper>
    </PickersLayoutRoot>
  );
}
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function Journey() {
  const { roadRoutes, dispatch: roadRouteDispatch } = useRoadRouteContext();
  const { journeys, dispatch: journeyDispatch } = useJourneyContext();
  const { schedules, dispatch: scheduleDispatch } = useScheduleContext();
  const { buses, dispatch: busDispatch } = useBusContext();
  const { employees, dispatch: employeeDispatch } = useEmployeeContext();

  const [routeId, setRouteId] = useState("");
  const [date, setDate] = useState("");
  const [needSchedules, setNeedSchedules] = useState([]);
  const [needJourneys, setNeedJourneys] = useState([]);

  const handleUpdateBus = async (journeyId, busId) => {
    var updateValues;
    if (busId === "0") {
      updateValues = {
        journeyId: journeyId,
        bus: null,
        bookedSeats: 0,
      };
    } else {
      const seatCount = buses.find((bus) => bus._id === busId).seatCount;
      updateValues = {
        journeyId: journeyId,
        bus: busId,
        bookedSeats: seatCount,
      };
    }

    try {
      const response = await adminAxios.put(
        `/api/journey/updateByJourneyId/${journeyId}`,
        updateValues
      );
      journeyDispatch({ type: "UPDATE_JOURNEY", payload: updateValues });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateInspector = async (journeyId, inspectorId) => {
    const inspectorId1 = inspectorId === "0" ? null : inspectorId;

    const updateValues = { journeyId: journeyId, inspector: inspectorId1 };

    try {
      const response = await adminAxios.put(
        `/api/journey/updateByJourneyId/${journeyId}`,
        updateValues
      );
      journeyDispatch({ type: "UPDATE_JOURNEY", payload: updateValues });
    } catch (error) {
      console.log(error);
    }
  };

  const wayFun = (scheduleType, route) => {
    const start = roadRoutes.find((roadRoute) => roadRoute._id === route).start;
    const end = roadRoutes.find((roadRoute) => roadRoute._id === route).end;

    if (scheduleType === "startToEnd") {
      return (
        <div>
          {start} - {end}
        </div>
      );
    } else {
      return (
        <div>
          {end} - {start}
        </div>
      );
    }
  };

  useEffect(() => {
    var testSchedule;
    //schedule
    if (routeId && date) {
      testSchedule = schedules.filter(
        (schedule) =>
          schedule.route === routeId &&
          schedule.day === daysOfWeek[date.day().toString()]
      );
      setNeedSchedules(testSchedule);
    }

    //journey
    var testJourney;
    if (routeId && date) {
      testJourney = journeys.filter(
        (journey) =>
          journey.route === routeId &&
          dayjs(journey.date).format("YYYY-MM-DD") ===
            dayjs(date).format("YYYY-MM-DD")
      );

      setNeedJourneys(testJourney);
    }
    if (routeId && date) {
      if (!testJourney || testJourney.length === 0) {
        //create a new journey on journey context for each schedule
        testSchedule.forEach(async (schedule) => {
          const newJourney = {
            journeyId:
              schedule.scheduleId + "J" + dayjs(date).format("YYYYMMDD"),
            route: routeId,
            date: dayjs(date).format("YYYY-MM-DD"),
            schedule: schedule._id,
            bus: null,
            bookedSeats: 0,
            inspector: null,
          };
          try {
            const response = await adminAxios.post("/api/journey", newJourney);
          } catch (error) {
            console.log(error);
          }

          journeyDispatch({ type: "CREATE_JOURNEY", payload: newJourney });
        });
      }
    }
  }, [routeId, date, journeys]);

  const columns = [
    {
      field: "journeyId",
      headerName: "Journey ID",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "Way",
      headerName: "Way",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
      renderCell: (params) => (
        <>
          {wayFun(
            schedules.find((schedule) => schedule._id === params.row.schedule)
              .scheduleType,
            params.row.route
          )}
        </>
      ),
    },

    {
      field: "Start Time",
      headerName: "Start",
      width: 90,
      flex: 0.25,
      align: "center",
      headerAlign: "center",
      type: "string",
      renderCell: (params) => (
        <div>
          {dayjs(
            schedules.find((schedule) => schedule._id == params.row.schedule)
              .startTime
          ).format("hh-mm")}
        </div>
      ),
    },
    {
      field: "EndTime",
      headerName: "End",
      width: 90,
      flex: 0.25,
      align: "center",
      headerAlign: "center",
      type: "string",
      renderCell: (params) => (
        <div>
          {dayjs(
            schedules.find((schedule) => schedule._id == params.row.schedule)
              .endTime
          ).format("hh-mm")}
        </div>
      ),
    },
    {
      field: "Bus",
      headerName: "Bus",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
      renderCell: (params) => (
        <div className="flex flex-col items-start w-[70%]">
          <select
            className="text-center text-xs rounded-[3px]  h-[17px] px-15  text-gray-800   border-[1px]  border-gray-300   focus:outline-none w-full custom-scrollbar"
            value={params.row.bus === null ? "0" : params.row.bus}
            onChange={(e) => {
              handleUpdateBus(params.row.journeyId, e.target.value);
            }}
          >
            <option value="0">select a Bus</option>
            {buses.map((bus) => (
              <option value={bus._id}>{bus.busID}</option>
            ))}
          </select>
          {params.row.bus ? (
            <div className="flex gap-1 mt-1 text-[12px]">
              <span>Seat Count - </span>

              <span>
                {params.row.bus ? (
                  <div>{params.row.bookedSeats}</div>
                ) : (
                  <div></div>
                )}
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
      ),
    },

    {
      field: "Bus Details",
      headerName: "Bus Details",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
      renderCell: (params) =>
        params.row.bus ? (
          <div className="text-[11px] flex flex-col gap-1">
            <p>
              D-
              {
                employees.find(
                  (employee) =>
                    employee._id ===
                    buses.find((bus) => bus._id === params.row.bus).busDriver
                ).employeeName
              }
            </p>
            <p>
              {
                employees.find(
                  (employee) =>
                    employee._id ===
                    buses.find((bus) => bus._id === params.row.bus).busDriver
                ).employeeContact
              }
            </p>
            <p>
              C-
              {
                employees.find(
                  (employee) =>
                    employee._id ===
                    buses.find((bus) => bus._id === params.row.bus).busConductor
                ).employeeName
              }
            </p>
            <p>
              {
                employees.find(
                  (employee) =>
                    employee._id ===
                    buses.find((bus) => bus._id === params.row.bus).busConductor
                ).employeeContact
              }
            </p>
          </div>
        ) : (
          <div className="text-[12px]">-Select a bus-</div>
        ),
    },
    {
      field: "Inspector",
      headerName: "Inspector",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
      renderCell: (params) => (
        <div className="flex flex-col items-start w-[70%]">
          <select
            className="text-center text-xs rounded-[3px]  h-[17px] px-15  text-gray-800   border-[1px]  border-gray-300   focus:outline-none w-full custom-scrollbar"
            value={params.row.inspector === null ? "0" : params.row.inspector}
            onChange={(e) => {
              handleUpdateInspector(params.row.journeyId, e.target.value);
            }}
          >
            <option value="0"> No Inspector</option>
            {employees
              .filter((employee) => employee.employeeRole === "inspector")
              .map((employee) => (
                <option value={employee._id}>{employee.employeeID}</option>
              ))}
          </select>
          <div className="mt-1 text-[12px]">
            {params.row.inspector ? (
              <div>
                {
                  employees.find(
                    (employee) => employee._id === params.row.inspector
                  ).employeeName
                }
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="mx-5">
      <div className="flex justify-between items-center ">
        <h1 className="font-roboto mb-3 text-4xl font-normal w-[75%]">
          Journey
        </h1>

        <div className="flex flex-1">
          <select
            id="countries"
            className="text-center text-lg font-bold font-roboto h-10 px-2.5  text-gray-800  rounded-lg border-[2px]  border-gray-400   focus:outline-none w-full"
            value={routeId}
            onChange={(e) => {
              setRouteId(e.target.value);
            }}
          >
            <option value="">Select Route</option>
            {roadRoutes.map((route) => (
              <option value={route._id}>{route.routeId}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-between w-full items-start">
        <div className={routeId && date ? "w-[75%]" : "hidden"}>
          <div className="mr-3">
            <Box className="w-full h-full ">
              <DataGrid
                rows={needJourneys}
                columns={columns}
                getRowId={(row) => row.journeyId}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                showColumnVerticalBorder={true}
                showCellVerticalBorder={true}
                rowHeight={90}
                slots={{
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
                    // borderBottom: "none",
                  },
                }}
              />
            </Box>
          </div>
        </div>
        <div className={routeId && date ? "hidden" : "flex-1"}>
          <p className="mt-[160px] flex justify-center font-bold text-4xl text-red-600 pb-[200px] w-[75%]]">
            Select a Date and a Route
          </p>
        </div>
        <div className=" border-[2px] border-gray-400 flex w-[25%] h-full">
          <Box className="w-full h-full flex justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                slots={{
                  layout: CustomLayout,
                }}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
              />
            </LocalizationProvider>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Journey;
