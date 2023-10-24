import React from "react";
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
} from "recharts";
const data = [
  {
    name: "Nov",
    pro: 7400000,
  },
  {
    name: "Dec",
    pro: 6545250,
  },
  {
    name: "Jan",
    pro: 6446670,
  },
  {
    name: "Feb",

    pro: 4400434,
  },
  {
    name: "Mar",
    pro: 4525255,
  },
  {
    name: "Apr",
    pro: 5734745,
  },
  {
    name: "May",
    pro: 4643778,
  },
  {
    name: "Jun",
    pro: 4544674,
  },
  {
    name: "jul",
    pro: 6765777,
  },
  {
    name: "Aug",
    pro: 7786888,
  },
  {
    name: "Sep",
    pro: 5634564,
  },
  {
    name: "Oct",
    pro: 6435453,
  },
];

function LastG() {
  return (
    <div className="w-full h-full bg-gray-200">
      <div className="flex flex-col w-full h-full pl-2 pr-2">
        <div className="flex  flex-col items-center pt-2">
          <div className="font-tinos font-semibold text-lg text-gray-700 text-center">
            Monthly Profit
          </div>
          <div className="bg-gray-400 h-[1px] w-[20%] relative mb-2">
            <div className="absolute w-[8px] h-[8px] bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-gray-400" />
          </div>
        </div>
        <div className="flex items-center font-roboto text-[12px] gap-7 justify-center mt-1">
          <div className="text-gray-500">--- Time</div>
          <div className="flex items-center gap-1">
            <div className="bg-[#028D91] h-[10px] w-[10px]" />
            <div className="text-[#028D91]">Month</div>
          </div>
        </div>
        <div className="w-full h-full pr-2">
          <ResponsiveContainer width="100%" height={210}>
            <ComposedChart data={data}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <Line
                dataKey="pro"
                stroke="#D15152"
                dot={false}
                strokeWidth={2}
              />
              <XAxis
                dataKey="name"
                fontSize={11}
                style={{ fontFamily: "roboto", fontWeight: "300" }}
              />
              <YAxis
                type="number"
                domain={[0, "dataMax + 100"]}
                fontSize={10}
                width={43}
                tickCount={8}
                style={{ fontFamily: "roboto", fontWeight: "300" }}
              />

              <Tooltip />

              <Bar
                dataKey="pro"
                fill="#028D91"
                barSize={16}

                // activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default LastG;
