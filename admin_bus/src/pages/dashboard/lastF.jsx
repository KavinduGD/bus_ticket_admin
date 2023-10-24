import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const chartData = [
  { name: "Colombo", value: 5554, color: "#056770 " },
  { name: "Gampaha", value: 3424, color: "#078A92" },
  { name: "Kaluthara", value: 4347, color: "#B12B2A" },
  { name: "Galle", value: 6446, color: "#D15152" },
];
var total = chartData.reduce(
  (accumulator, city) => accumulator + city.value,
  0
);
console.log(total);

function LastF() {
  return (
    <div className="w-full h-full bg-gray-200">
      <div className="flex flex-col items-center pt-1">
        <div className="relative flex items-center flex-col">
          <div className="font-tinos font-semibold text-lg text-gray-700 text-center">
            Top Crowed Districts
          </div>
          <div className="bg-gray-400 h-[1px] w-[60%] relative mb-2">
            <div className="absolute w-[8px] h-[8px] bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-gray-400" />
          </div>
          <ResponsiveContainer width={180} height={180}>
            <PieChart>
              <Tooltip
                contentStyle={{ background: "white", borderRadius: "5px" }}
              />

              <Pie
                data={chartData}
                innerRadius={"45%"}
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
            className="absolute  font-roboto text-white font-semibold text-sm"
            style={{
              top: "46%",
              left: "22px",
            }}
          >
            {((chartData[1].value / total) * 100).toFixed(0)}%
          </div>
          <div
            className="absolute  font-roboto text-white font-semibold text-sm"
            style={{
              top: "42%",
              left: "133px",
            }}
          >
            {((chartData[3].value / total) * 100).toFixed(0)}%
          </div>
          <div
            className="absolute  font-roboto text-white font-semibold text-sm"
            style={{
              top: "77%",
              left: "50px",
            }}
          >
            {((chartData[2].value / total) * 100).toFixed(0)}%
          </div>
          <div
            className="absolute  font-roboto text-white font-semibold text-sm"
            style={{
              top: "72%",
              left: "125px",
            }}
          >
            {((chartData[0].value / total) * 100).toFixed(0)}%
          </div>
        </div>

        <div className="flex justify-between w-full px-4 mt-3">
          {chartData.map((city) => (
            <div className="flex flex-col items-center">
              <div
                className={`h-[8px] w-[8px] rounded-full `}
                style={{ backgroundColor: city.color }}
              ></div>
              <div className="text-[12px] font-roboto font-light">
                {city.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LastF;
