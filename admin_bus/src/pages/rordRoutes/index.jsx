import React from "react";
import { useRoadRouteContext } from "../../hooks/useRoadRouteContext";
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
import { useEmployeeContext } from "../../hooks/useEmployeeContext";
import IconButton from "@mui/material/IconButton";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
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

function RoadRoutes() {
  const { roadRoutes, dispatch: roadRouteDispatch } = useRoadRouteContext();
  const { employees, dispatch: employeeDispatch } = useEmployeeContext();

  const columns = [
    {
      field: "routeId",
      headerName: "Route ID",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "start",
      headerName: "Start",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "end",
      headerName: "End",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "transportManager",
      headerName: "Manager Name",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
      renderCell: (params) => (
        <div>
          {employees.map((employee) => {
            if (employee._id === params.row.transportManager) {
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
      flex: 0.5,
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
      flex: 0.5,
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
    <div className="mx-9 shadow-lg">
      <h1 className="font-roboto mb-3 text-4xl font-normal ml-7">Routes</h1>
      <div className="mx-7">
        <Box sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={roadRoutes}
            columns={columns}
            rowHeight={35}
            getRowId={(row) => row._id}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 7,
                },
              },
            }}
            slots={{
              toolbar: GridToolbar,
              pagination: CustomPagination,
            }}
            showColumnVerticalBorder={true}
            showCellVerticalBorder={true}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                color: "#dc2626",
                fontFamily: "roboto",
                fontSize: "18px",
                fontWeight: "bold",
                // border: "none",
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
    </div>
  );
}

export default RoadRoutes;
