import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const chartData = [
  { name: "A", value: 58554, color: "#ef4444" },
  { name: "B", value: 19424, color: "#058999" },
  { name: "C", value: 4347, color: "#F2D289" },
];
function MiddleB() {
  return (
    <div className="w-full h-full bg-gray-200">
      <div className="flex justify-between items-center h-full pl-7 pr-7 gap-14 pt-1">
        <div className="chart  h-full  flex flex-col  items-center relative">
          <div className="font-tinos font-semibold text-lg text-gray-700">
            Journey Status
          </div>
          <div className="bg-gray-400 h-[1px] w-[60%] relative mb-1">
            <div className="absolute w-[8px] h-[8px] bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-gray-400" />
          </div>
          <ResponsiveContainer width={140} height={140}>
            <PieChart>
              <Tooltip
                contentStyle={{ background: "white", borderRadius: "5px" }}
              />
              <Pie
                data={chartData}
                innerRadius={"62%"}
                outerRadius={"100%"}
                //paddingAngle={3}
                dataKey="value"
                startAngle={230}
                endAngle={-50}
                stroke="none"
              >
                {chartData.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div
            className="absolute flex justify-center flex-col text-center font-tinos"
            style={{
              top: "62%",
              left: "11px",
            }}
          >
            <p className="text-xl font-roboto font-extrabold text-gray-700">
              71%
            </p>
            <p className="font-tinos text-base">Journey Efficiency</p>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-3 font-openSans ">
          <div className="bg-[#F0F0F0] py-2 flex justify-between px-3 rounded-lg shadow-xl text-gray-800  text-sm border-2 border-gray-200">
            <div>Safe Journeys</div>

            <div>58554</div>
          </div>
          <div className="bg-[#F0F0F0] py-2 flex justify-between px-3 rounded-lg shadow-xl text-gray-800   text-sm border-2 border-gray-200">
            <div>Late Journeys</div>

            <div>10424</div>
          </div>
          <div className="bg-[#F0F0F0] py-2 flex justify-between px-3 rounded-lg shadow-xl text-gray-800  text-sm border-2 border-gray-200">
            <div>Cancel Journeys</div>

            <div>4347</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiddleB;
