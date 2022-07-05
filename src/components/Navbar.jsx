import React, { useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div style={{ background: "#3B136B" }} class="navbar flex items-center">
      <div class="flex-1 h-14">
        {/* <a class="btn btn-ghost normal-case text-xl">DesoPixelArt</a> */}
        <div
          className={`flex flex-col gap-5 transition-all  text-center`}
          // style={{ background: "rebeccap" }}
        >
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
      {isLoggedIn ? (
        <div class="flex-none">
          <div class="dropdown dropdown-end"></div>
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" />
              </div>
            </label>
            <ul
              id="navbar"
              tabindex="0"
              class="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-36 items-center"
            >
              {/* <li onClick={() => setIsLoggedIn(false)}> */}
              <button
                className="btn btn-secondary"
                onClick={() => setIsLoggedIn(false)}
              >
                LOGOUT
              </button>
              {/* </li> */}
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsLoggedIn(true)}
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
