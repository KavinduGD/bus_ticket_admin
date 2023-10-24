import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Nov",
    Colombo: 2400,
    Kandy: 2600,
    Polonnaruwa: 3400,
    Ampara: 6369,
  },
  {
    name: "Dec",
    Colombo: 3400,
    Kandy: 2550,
    Polonnaruwa: 1400,
    Ampara: 4529,
  },
  {
    name: "Jan",
    Colombo: 1800,
    Kandy: 2800,
    Polonnaruwa: 4400,
    Ampara: 1869,
  },
  {
    name: "Feb",
    Colombo: 4580,
    Kandy: 2300,
    Polonnaruwa: 2400,
    Ampara: 2454,
  },
  {
    name: "Mar",
    Colombo: 4500,
    Kandy: 6400,
    Polonnaruwa: 2800,
    Ampara: 3389,
  },
  {
    name: "Apr",
    Colombo: 4000,
    Kandy: 2400,
    Polonnaruwa: 2400,
    Ampara: 4555,
  },
  {
    name: "May",
    Colombo: 3000,
    Kandy: 1398,
    Polonnaruwa: 2210,
    Ampara: 3339,
  },
  {
    name: "Jun",
    Colombo: 2000,
    Kandy: 6800,
    Polonnaruwa: 2290,
    Ampara: 2339,
  },
  {
    name: "jul",
    Colombo: 2780,
    Kandy: 3908,
    Polonnaruwa: 2000,
    Ampara: 1111,
  },
  {
    name: "Aug",
    Colombo: 1890,
    Kandy: 4800,
    Polonnaruwa: 2181,
    Ampara: 4555,
  },
  {
    name: "Sep",
    Colombo: 2390,
    Kandy: 3800,
    Polonnaruwa: 2500,
    Ampara: 4539,
  },
  {
    name: "Oct",
    Colombo: 3490,
    Kandy: 4300,
    Polonnaruwa: 2100,
    Ampara: 6369,
  },
];

function MiddleC() {
  return (
    <div className="w-full h-full bg-gray-200">
      <div className="flex flex-col w-full h-full pl-2 pr-2">
        <div className="flex  flex-col items-center">
          <div className="font-tinos font-semibold text-lg text-gray-700 text-center">
            Most Profit Cities
          </div>
          <div className="bg-gray-400 h-[1px] w-[20%] relative mb-2">
            <div className="absolute w-[8px] h-[8px] bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-gray-400" />
          </div>
        </div>
        <div className="w-full h-full pr-2">
          <ResponsiveContainer width="100%" height={165}>
            <LineChart data={data}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis
                dataKey="name"
                fontSize={11}
                style={{ fontFamily: "roboto", fontWeight: "300" }}
              />
              <YAxis
                type="number"
                domain={["dataMin-100", "dataMax + 40"]}
                fontSize={12}
                width={40}
                tickCount={8}
                style={{ fontFamily: "roboto", fontWeight: "300" }}
              />
              <Tooltip />
              <Legend
                iconType="plainline"
                verticalAlign="top"
                height={30}
                wrapperStyle={{ fontSize: "12px", fontFamily: "roboto" }}
              />
              <Line
                dataKey="Kandy"
                stroke="#D15152"
                dot={false}
                strokeWidth={2}
              />
              <Line
                dataKey="Colombo"
                stroke="#CD9E46"
                dot={false}
                strokeWidth={2}
              />
              <Line
                dataKey="Polonnaruwa"
                stroke="#028C98"
                dot={false}
                strokeWidth={2}
              />
              <Line
                dataKey="Ampara"
                stroke="#44D3C1"
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default MiddleC;
