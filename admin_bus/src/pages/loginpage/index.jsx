import React, { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";

const inputStyle =
  "w-full  px-2.5  pb-2.5 pt-4 text-sm text-gray-900 rounded-lg border-[2px] border-gray-400   focus:outline-none   focus:border-gray-600 shadow-lg";
const errorStyle =
  "w-full  px-2.5  pb-2.5 pt-4 text-sm text-red-400 rounded-lg border-[2px] border-red-400   focus:outline-none    shadow-lg";
const labelStyle =
  "absolute top-[-10px] left-5 bg-white text-base font-roboto text-gray-600";
const errorLabelStyle =
  "absolute top-[-10px] left-5 bg-white text-base font-roboto text-red-400";

function LoginPage() {
  const { user, dispatch: userDispatch } = useUserContext();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [managerId, setManagerId] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [managerIdError, setManagerIdError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    console.log(showPassword);
  };

  const loginFunction = async () => {
    if (managerId === "" || password === "") {
      setErrorText("Please fill all the fields");
      return;
    }
    if (managerId !== "admin") {
      setManagerIdError(true);
      setErrorText("Invalid Manager ID");
      return;
    }
    setManagerIdError(false);

    if (password !== "pass") {
      setPasswordError(true);
      setErrorText("Invalid Password");
      return;
    }
    setPasswordError(false);

    if (managerId === "admin" && password === "pass") {
      await localStorage.setItem("manager", managerId);
      userDispatch({ type: "LOGIN", payload: managerId });
      //window.location.reload("/");
      navigate("/");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div>
      <div className="flex min-h-screen w-full font-roboto">
        <div className="w-[38%] flex items-center justify-center">
          <div className="w-[74%]">
            <div className="flex justify-between items-center">
              <div className="font-roboto text-[52px] font-semibold">Login</div>
              <div
                className="w-[30%]  h-[80px]   bg-contain bg-no-repeat "
                style={{
                  backgroundImage:
                    "url(https://res.cloudinary.com/dnoobzfxo/image/upload/v1697876127/360_F_491242470_WdSpwKRMYiHqTvRBRpsH72cM4g1VWL22-removebg-preview_ur315e.png)",
                }}
              ></div>
            </div>
            <div className="flex flex-col gap-6 mt-5">
              <div class="relative  w-full">
                <input
                  type="text"
                  id="busNumber1"
                  className={managerIdError ? errorStyle : inputStyle}
                  value={managerId}
                  placeholder="Enter Manager ID"
                  onChange={(e) => {
                    setManagerId(e.target.value);
                  }}
                />
                <label
                  htmlFor="busNumber1"
                  className={managerIdError ? errorLabelStyle : labelStyle}
                >
                  Manager ID
                </label>
                {managerIdError && (
                  <p className="text-red-400 text-sm">{errorText}</p>
                )}
              </div>

              <div class="relative  w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  id="pass"
                  className={passwordError ? errorStyle : inputStyle}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <label
                  htmlFor="pass"
                  className={passwordError ? errorLabelStyle : labelStyle}
                >
                  Password
                </label>
                <span
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  <IconButton>
                    {showPassword ? (
                      <RemoveRedEyeIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </span>{" "}
                {passwordError && (
                  <p className="text-red-400 text-sm">{errorText}</p>
                )}
              </div>
            </div>
            <div className=" flex justify-between items-center text-sm ">
              <div>
                <Checkbox
                  style={{
                    color: "#8E8E8E",
                  }}
                />
                <span className="text-gray-400">Remember me</span>
              </div>
              <div className="text-red-500 text-sm font-medium">
                Reset Password
              </div>
            </div>
            <div className="mt-8">
              {errorText === "Please fill all the fields" && (
                <p className="text-red-400 text-sm mb-2 text-center">
                  {errorText}
                </p>
              )}
              <button
                type="submit"
                className="bg-red-600 w-full py-3 text-white font-semibold rounded-md text-[16px] "
                onClick={loginFunction}
              >
                Login
              </button>
            </div>
          </div>
        </div>
        <div
          className="flex-1 bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dnoobzfxo/image/upload/v1697812873/115AldgateEH_1_yjwdcm.png)",
          }}
        ></div>
      </div>
    </div>
  );
}

export default LoginPage;
