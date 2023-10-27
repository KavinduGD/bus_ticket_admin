import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart,
  ComposedChart,
  Cell,
} from "recharts";
const data = [
  {
    name: "Jun 4",
    passengers: 174,
  },
  {
    name: "Jul 1",
    passengers: 165,
  },
  {
    name: "Jul 2",
    passengers: 164,
  },
  {
    name: "Jul 3",

    passengers: 144,
  },
  {
    name: "Jul 4",
    passengers: 245,
  },
  {
    name: "Aug 1",
    passengers: 157,
  },
  {
    name: "Aug 2",
    passengers: 246,
  },
  {
    name: "Aug 3",
    passengers: 145,
  },
  {
    name: "Aug 4",
    passengers: 267,
  },
  {
    name: "Oct 1",
    passengers: 217,
  },
  {
    name: "Oct 2",
    passengers: 156,
  },
  {
    name: "Oct 3",
    passengers: 196,
  },
  {
    name: "Oct 4",
    passengers: 256,
  },
];
const data1 = [
  {
    name: "Jun 4",
    passengers: 174,
  },
  {
    name: "Jul 1",
    passengers: 165,
  },
  {
    name: "Jul 2",
    passengers: 164,
  },
  {
    name: "Jul 3",

    passengers: 144,
  },
  {
    name: "Jul 4",
    passengers: 245,
  },
  {
    name: "Aug 1",
    passengers: 157,
  },
  {
    name: "Aug 2",
    passengers: 246,
  },
  {
    name: "Aug 3",
    passengers: 145,
  },
  {
    name: "Aug 4",
    passengers: 267,
  },
  {
    name: "Oct 1",
    passengers: 217,
  },
  {
    name: "Oct 2",
    passengers: 156,
  },
  {
    name: "Oct 3",
    passengers: 196,
  },
  {
    name: "Oct 4",
    passengers: 256,
  },
  {
    name: "Oct 5",
    passengers: 156,
  },
];

function PredictChart() {
  const [predict, setPredict] = useState(false);
  var chart = data;
  if (predict) {
    chart = data1;
  }
  return (
    <div className="w-full h-full bg-gray-100 rounded-lg">
      <div className="flex flex-col w-full h-full pl-2 pr-2">
        <div className="flex  flex-col items-center pt-2">
          <div className="font-tinos font-semibold text-lg text-gray-700 text-center mt-1">
            Passenger Predict
          </div>
          <div className="bg-gray-400 h-[1px] w-[20%] relative mb-2">
            <div className="absolute w-[8px] h-[8px] bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-gray-400" />
          </div>
        </div>
        <div className="flex items-center font-roboto text-[12px] gap-7 justify-center mt-1">
          <div className="text-gray-500">--- Time</div>
          <div className="flex items-center gap-1">
            <div className="bg-[#028D91] h-[10px] w-[10px]" />
            <div className="text-[#028D91]">Week</div>
          </div>
        </div>
        <div className="w-full h-full pr-2">
          <ResponsiveContainer width="100%" height={310}>
            <ComposedChart data={chart}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis
                dataKey="name"
                fontSize={11}
                style={{ fontFamily: "roboto", fontWeight: "300" }}
              />
              <YAxis
                type="number"
                domain={[0, "dataMax + 20"]}
                fontSize={10}
                width={43}
                tickCount={8}
                style={{ fontFamily: "roboto", fontWeight: "300" }}
              />
              <Tooltip />
              <Bar dataKey="passengers" barSize={23}>
                {chart.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      predict && entry.name === "Oct 5" ? "#EF4444" : "#028D91"
                    }
                  />
                ))}
              </Bar>
              <Line
                dataKey="passengers"
                stroke="#D15152"
                dot={{
                  stroke: "red",
                  strokeWidth: 1,
                  r: 3,
                  fill: "#D15152",
                }}
                strokeWidth={2}
              />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="flex justify-between px-9 items-center mt-3">
            <p className="font-roboto">
              Click the Predict button ne get the today passenger prediction
            </p>
            <button
              className="bg-[#028D91] px-10 py-1 rounded-lg text-white font-roboto text-sm"
              onClick={() => {
                setPredict(!predict);
              }}
            >
              {predict ? "Reverse Prediction" : "predict"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PredictChart;
