import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { useUserContext } from "../../hooks/useUserContext";
import { ImCancelCircle } from "react-icons/im";
import { BsFillPersonFill } from "react-icons/bs";
import { HiMiniInboxArrowDown } from "react-icons/hi2";

function Navbar() {
  const [profileClicked, setProfileClicked] = useState(false);
  const { user, dispatch } = useUserContext();

  const logoutFun = () => {
    setProfileClicked(false);
    localStorage.removeItem("manager");
    dispatch({ type: "LOGOUT" });
  };

  const normalLink =
    "border-b-4 border-gray-300 hover:border-red-600 bg-gray-200 rounded-md hover:bg-gray-400 ";
  const clickedLink = "border-b-[5px] border-red-600 bg-gray-200 rounded-md";
  return (
    <div className=" mt-0  sm:mt-4  mb-3 font-roboto font-semibold ">
      <div className="flex justify-between items-start">
        <div className="flex flex-col sm:flex-row ml-[50px] mb-2 gap-7 items-center text-sm">
          <NavLink
            to={""}
            className={({ isActive }) => (isActive ? clickedLink : normalLink)}
          >
            <div className="w-[100px] flex justify-center h-8 items-center">
              Dashboard
            </div>
          </NavLink>
          <NavLink
            to={"routes"}
            className={({ isActive }) => (isActive ? clickedLink : normalLink)}
          >
            <div className="w-[100px] flex justify-center h-8 items-center">
              Routes
            </div>
          </NavLink>
          <NavLink
            to={"schedule"}
            className={({ isActive }) => (isActive ? clickedLink : normalLink)}
          >
            <div className="w-[100px] flex justify-center h-8 items-center">
              Schedules
            </div>
          </NavLink>
          <NavLink
            to={"journey"}
            className={({ isActive }) => (isActive ? clickedLink : normalLink)}
          >
            <div className="w-[100px] flex justify-center h-8 items-center">
              Journey
            </div>
          </NavLink>
          <NavLink
            to={"bus"}
            className={({ isActive }) => (isActive ? clickedLink : normalLink)}
          >
            <div className="w-[100px] flex justify-center h-8 items-center">
              Bus
            </div>
          </NavLink>
          <NavLink
            to={"employee"}
            className={({ isActive }) => (isActive ? clickedLink : normalLink)}
          >
            <div className="w-[100px] flex justify-center h-8 items-center">
              Employees
            </div>
          </NavLink>
          <NavLink
            to={"report"}
            className={({ isActive }) => (isActive ? clickedLink : normalLink)}
          >
            <div className="w-[100px] flex justify-center h-8 items-center">
              Reports
            </div>
          </NavLink>
        </div>
        <div className="user mr-10 flex items-center gap-3">
          <div
            className="flex font-roboto font-normal items-center gap-3 cursor-pointer"
            onClick={() => {
              console.log("clicked");
              setProfileClicked(!profileClicked);
            }}
          >
            <img
              className="w-8 h-8 rounded-full object-cover"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4C-SeRPvwiOmAx-A2C5LGRU_0KQmG7-Kj7R_9QpYgJA&s"
              alt=""
            />
            <span className="text-[14px] font-roboto">T.K.G.Dharmasiri</span>
          </div>
          <div className="relative">
            <img
              className="w-6 h-6 rounded-full object-cover"
              src="https://png.pngtree.com/png-clipart/20190705/original/pngtree-vector-notification-icon-png-image_4187244.jpg"
              alt=""
            />
            <span className="absolute top-[-5px] right-[-4px] bg-red-600 text-white w-4 h-4 text-xs flex  items-center justify-center rounded-full">
              1
            </span>
          </div>
        </div>
      </div>
      <hr className="h-[3px] bg-gray-400" />
      {profileClicked && (
        <div className=" bg-white absolute right-[160px] top-[40px] w-[230px]  z-10 font-roboto border-[1px] rounded-md border-gray-400">
          <div className="px-3 py-2 w-full h-full text-sm font-normal flex-col flex">
            <div className="flex  items-center justify-between pb-2">
              <div>Manager Profile</div>
              <div
                className=" rounded-full p-3 hover:bg-slate-200 "
                onClick={() => {
                  setProfileClicked(false);
                }}
              >
                <ImCancelCircle />
              </div>
            </div>
            <div className="flex justify-between p-1 ">
              <div>
                <img
                  className="w-[70px] h-[70px] rounded-full object-cover "
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4C-SeRPvwiOmAx-A2C5LGRU_0KQmG7-Kj7R_9QpYgJA&s"
                  alt=""
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="">T.K.G.Dharamsiri</p>
                <p className="text-[12px] font-light">Transport manager</p>
                <p className="text-[12px] font-light">Gamapaha</p>
              </div>
            </div>
            <div className="px-2 flex flex-col w-full pt-4 pb-4">
              <div className=" flex  justify-between items-center border-t-[1px] border-b-[1px] border-gray-300 py-2 px-4 hover:bg-gray-100">
                <div className="w-10 h-10 bg-[#E5FAFB]  rounded-md text-[20px] flex items-center justify-center text-[#03C9D7] ">
                  <BsFillPersonFill />
                </div>
                <div className=" ">
                  <p>My profile</p>
                  <p className="text-xs font-light">Account Settings</p>
                  <p></p>
                </div>
              </div>
              <div className=" flex  justify-between items-center border-t-[1px] border-b-[1px] border-gray-300 py-2 px-4 hover:bg-gray-100">
                <div className="w-10 h-10 bg-[#E5FAFB]  rounded-md text-[20px] flex items-center justify-center text-[#03C9D7] font-extrabold">
                  <HiMiniInboxArrowDown />
                </div>
                <div className="">
                  <p>My Inbox</p>
                  <p className="text-xs font-light">Message and Email</p>
                  <p></p>
                </div>
              </div>
            </div>
            <button
              className="bg-red-600 text-white px-3 py-[6px] rounded-lg text-xs font-normal"
              onClick={logoutFun}
            >
              logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
