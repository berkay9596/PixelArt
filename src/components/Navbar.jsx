import React, { useContext } from "react";
import DesoContext from "../context/DesoContext";

const Navbar = () => {
  const { isLoggedIn, desoLogin, desoLogout } = useContext(DesoContext);
  const token = JSON.parse(localStorage.getItem("identityUsersV2"));

  return (
    <div style={{ background: "#3B136B" }} className="navbar flex items-center">
      <div className="flex-1 h-14">
        <div className={`flex flex-col gap-5 transition-all  text-center`}>
          <h1
            style={{ margin: "0" }}
            className="font-black font-['Monoton'] text-zinc-500 text-md md:text-5xl tracking-widest mt-5"
          >
            <span className="font-['Monoton'] text-rose-500">D</span>
            <span className="font-['Monoton'] text-amber-500">E</span>
            <span className="font-['Monoton'] text-teal-500">S</span>
            <span className="font-['Monoton'] text-sky-500">O</span>
            <span className="font-['Monoton'] text-purple-500">P</span>
            <span className="font-['Monoton'] text-lime-500">I</span>
            <span className="font-['Monoton'] text-emerald-500">X</span>
            <span className="font-['Monoton'] text-cyan-500">E</span>
            <span className="font-['Monoton'] text-fuchsia-500">L</span>
            ART
          </h1>
        </div>
      </div>
      {isLoggedIn || token ? (
        <div className="flex-none">
          <div className="dropdown dropdown-end"></div>
          <div className="dropdown dropdown-end">
            <label tabindex="0" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={`https://node.deso.org/api/v0/get-single-profile-picture/${token?.publicKey}`}
                />
              </div>
            </label>
            <ul
              id="navbar"
              tabindex="0"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-36 items-center"
            >
              <button
                className="btn btn-secondary"
                onClick={() => desoLogout()}
              >
                LOGOUT
              </button>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => desoLogin()}
          className="btn btn-success"
          id="login"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;
