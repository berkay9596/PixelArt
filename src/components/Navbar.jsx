import React, { useContext, useRef } from "react";
import DesoContext from "../context/DesoContext";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, desoLogin, desoLogout } = useContext(DesoContext);
  const token = JSON.parse(localStorage.getItem("identityUsersV2"));
  const dropdown = useRef();
  const handleClick = () => {
    dropdown.current.classList.toggle("dropdown-open");
    document.activeElement.blur();
  };

  return (
    <div className="navbar flex items-center">
      <div className="flex-1 h-14">
        <div className="flex flex-col gap-5 transition-all  text-center">
          <Logo />
        </div>
      </div>
      <span id="deneme" className="mx-5"></span>
      {isLoggedIn || token ? (
        <div className="flex-none">
          <div className="dropdown dropdown-end" ref={dropdown}>
            <label
              tabIndex="0"
              className="btn btn-ghost btn-circle avatar"
              onClick={handleClick}

            >
              <div className="w-10 rounded-full">
                <img
                  src={`https://node.deso.org/api/v0/get-single-profile-picture/${token?.publicKey}`}
                  alt="profile"
                />
              </div>
            </label>
            <ul
              id="navbar"
              tabIndex="0"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-36 items-center"
              onClick={handleClick}
            >
              <button
                className="btn btn-primary my-1"
                style={{ minWidth: "9rem" }}
                onClick={() => {
                  navigate("/leaderboard");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                LEADERBOARD
              </button>
              <button
                className="btn btn-secondary "
                onClick={() => desoLogout()}
                style={{ minWidth: "9rem" }}
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
