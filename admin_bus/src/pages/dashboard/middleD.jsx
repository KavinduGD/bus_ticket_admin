import React from "react";
import { FaUserNinja } from "react-icons/fa6";
import { GiInjustice } from "react-icons/gi";

function MiddleD() {
  return (
    <div
      className="w-full h-full  bg-contain pl-8 pr-8 flex justify-center items-center"
      style={{
        backgroundImage:
          "url(https://cdn11.bigcommerce.com/s-l2xlls5oyw/images/stencil/original/products/31352/46634/15c5a9b1-2996-44cf-beb9-c8e2b8559058__87246.1661175221.jpg)",
      }}
    >
      <div className="flex gap-10 ">
        <div className="bg-red-500 w-full h-[90px] rounded-3xl flex flex-col px-7 py-4 justify-center gap-1">
          <div className="flex items-center justify-between gap-5">
            <div className="text-[#FEF2EC] text-2xl ">
              <FaUserNinja />
            </div>
            <div className="text-[#FEF2EC] text-2xl font-sans font-bold ">
              56834
            </div>
          </div>
          <div className="flex justify-end font-sans text-[#FEF2EC]  text-[12px]">
            Penalties in Oct
          </div>
        </div>

        <div className="bg-red-500 w-full h-[90px] rounded-3xl flex flex-col px-7 py-4 justify-center gap-1">
          <div className="flex items-center justify-between gap-5">
            <div className="text-[#FEF2EC] text-3xl ">
              <GiInjustice />
            </div>
            <div className="text-[#FEF2EC] text-2xl font-sans font-bold ">
              9453
            </div>
          </div>
          <div className="flex justify-end font-sans text-[#FEF2EC] text-[12px] ">
            paid in Oct
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiddleD;
//FEF2EC
