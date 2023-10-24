import React from "react";
import dayjs from "dayjs";
import { GiReceiveMoney } from "react-icons/gi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaBusAlt } from "react-icons/fa";
function LeftRowA() {
  return (
    <div className="h-full bg-red-500 w-full  ">
      <div className="flex flex-col items-center h-full w-full font-roboto text-white font-medium text-2xl pb-3 pt-5">
        <div className=" text tracking-wide font-semibold mb-1">
          {dayjs().format("MMMM - YYYY")}
        </div>
        <div className="bg-white h-[1px] mb-5 w-[50%] relative">
          <div className="absolute w-[10px] h-[10px] bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="flex flex-col items-center h-full w-full gap-5 px-5 ">
          <div className="bg-white h-full w-full rounded-xl flex flex-col px-4 py- gap-2 justify-center ">
            <div className="flex justify-between font-tinos ">
              <div className="text-lg text-gray-900 font-light">Revenue</div>
              <div className="text-xl text-red-400">
                <GiReceiveMoney />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-gray-700 text-xl">Rs.563603.34</div>
              <div className="text-red-400 text-sm">(-3%)</div>
            </div>
          </div>
          <div className="bg-white h-full w-full rounded-xl flex flex-col px-4 py- gap-2 justify-center ">
            <div className="flex justify-between font-tinos ">
              <div className="text-lg text-gray-900 font-light">Costs</div>
              <div className="text-xl text-red-400">
                <FaMoneyBillTrendUp />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-gray-700 text-xl">Rs.45745.00</div>
              <div className="text-red-400 text-sm">(+6%)</div>
            </div>
          </div>{" "}
          <div className="bg-white h-full w-full rounded-xl flex flex-col px-4 py- gap-2 justify-center ">
            <div className="flex justify-between font-tinos ">
              <div className="text-lg text-gray-900 font-light">Profit</div>
              <div className="text-xl text-red-400">
                <FaMoneyCheckAlt />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-gray-700 text-xl">Rs.6907757.55</div>
              <div className="text-red-400 text-sm">(-7%)</div>
            </div>
          </div>{" "}
          <div className="bg-white h-full w-full rounded-xl flex flex-col px-4 py- gap-2 justify-center ">
            <div className="flex justify-between font-tinos ">
              <div className="text-lg text-gray-900 font-light">
                Average Journeys
              </div>
              <div className="text-xl text-red-400">
                <FaBusAlt />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-gray-700 text-xl">673</div>
              <div className="text-red-400 text-sm">(+12%)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftRowA;
