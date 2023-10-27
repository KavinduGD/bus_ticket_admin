import React from "react";
import Modal from "react-modal";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { IconButton } from "@mui/material";
import dayjs from "dayjs";
import LastG from "../dashboard/lastG";
import PredictChart from "./pradeictChart";

Modal.setAppElement("#root"); // Set the root element as the app element for accessibility

function ChartModal({ isOpen, onRequestClose, route, date }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Chart Modal"
      overlayClassName="chart-modal-overlay"
      className="chart-modal-content"
    >
      {/* Add your chart component or content here */}
      <div className="h-[500px] ">
        <div className="flex justify-between items-end font-roboto font-medium ">
          <div className="flex gap-[70px] pl-[200px]">
            <p className="text-2xl ">{route}</p>
            <p className="text-2xl ">{dayjs(date).format("dddd")}</p>
            <p className="text-2xl ">
              {dayjs(date).format("DD -  MMM  - YYYY")}
            </p>
          </div>
          <div>
            <IconButton onClick={onRequestClose}>
              <HighlightOffIcon sx={{ color: "#000" }} />
            </IconButton>
          </div>
        </div>
        <div className="w-full h-[450px] mt-3">
          <PredictChart />
        </div>
      </div>
    </Modal>
  );
}

export default ChartModal;
