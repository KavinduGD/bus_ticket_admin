import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const chartData = [
  { name: "A", value: 10000, color: "#ef4444" },
  { name: "B", value: 944, color: "#DFDFE0" },
];
function MiddleD() {
  return (
    <div className="w-full h-full bg-gray-200">
      <div className="flex flex-col items-center pt-1">
        <div className="relative flex items-center flex-col">
          <div className="font-tinos font-semibold text-lg text-gray-700 text-center">
            Employee Status
          </div>
          <div className="bg-gray-400 h-[1px] w-[60%] relative mb-2">
            <div className="absolute w-[8px] h-[8px] bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-gray-400" />
          </div>
          <ResponsiveContainer width={150} height={150}>
            <PieChart>
              <Tooltip
                contentStyle={{ background: "white", borderRadius: "5px" }}
              />
              <Pie
                data={chartData}
                innerRadius={"70%"}
                outerRadius={"100%"}
                //paddingAngle={5}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
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
              top: "40%",
              left: "43px",
            }}
          >
            <p className="text-xl font-roboto font-extrabold text-gray-700">
              90%
            </p>
            <p className="font-tinos text-sm">Withing this</p>
            <p className="font-tinos text-sm">month </p>
          </div>
        </div>
        <div className="w-full px-10 flex flex-col gap-2 mt-1">
          <div className="bg-[#F0F0F0] py-1 flex justify-between px-3 rounded-lg shadow-xl text-gray-800  text-sm border-2 border-gray-200">
            <div>Total Presence</div>

            <div>10100</div>
          </div>
          <div className="bg-[#F0F0F0] py-1 flex justify-between px-3 rounded-lg shadow-xl text-gray-800  text-sm border-2 border-gray-200">
            <div>Safe Absence</div>

            <div>944</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiddleD;
