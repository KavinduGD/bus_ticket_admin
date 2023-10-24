import React from "react";
import { useUserContext } from "../../hooks/useUserContext";

function Profile() {
  const { user, dispatch } = useUserContext();

  const logoutFun = () => {
    localStorage.removeItem("manager");
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className=" bg-white absolute right-[160px] top-[40px]">
      <button
        className="bg-red-600 text-white px-3 py-[6px] rounded-lg text-xs font-light"
        onClick={logoutFun}
      >
        logout
      </button>
    </div>
  );
}

export default Profile;
