import React from "react";

const LeaderBoard = () => {
  return (
    <div className="text-white flex flex-col container mx-auto prose board-bg">
      <h3 className="my-5 board">Leaderboard</h3>
      <div className="flex items-between mx-6">
        <div>
          POS
          <ul
            style={{
              height: "100%",
              justifyContent: "space-around",
              marginRight: "0.4rem",
            }}
            className="p-0 flex flex-col"
          >
            <li style={{ borderRight: `3px solid red` }}>1</li>
            <li style={{ borderRight: `3px solid yellow` }}>2</li>
            <li style={{ borderRight: `3px solid purple` }}>3</li>
            <li style={{ borderRight: `3px solid wheat` }}>4</li>
            <li style={{ borderRight: `3px solid lime` }}>5</li>
          </ul>
        </div>
        <div className="mx-5">
          USER
          <ul
            style={{
              height: "100%",
              justifyContent: "space-around",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <li className="flex items-center">
              <img
                className="w-7 h-7"
                src="https://node.deso.org/api/v0/get-single-profile-picture/BC1YLiVd3t2XfDutMgVFPeShG3RiPGGrSa1qJ5b5f23sHyFAd2nrqU2"
                alt="profile"
              />
              <span className="mx-3"> CloutSwagger </span>
            </li>
            <li className="flex items-center">
              <img
                className="w-7 h-7"
                src="https://node.deso.org/api/v0/get-single-profile-picture/BC1YLiVd3t2XfDutMgVFPeShG3RiPGGrSa1qJ5b5f23sHyFAd2nrqU2"
                alt="profile"
              />
              <span className="mx-3"> CloutSwagger </span>
            </li>{" "}
            <li className="flex items-center">
              <img
                className="w-7 h-7 "
                src="https://node.deso.org/api/v0/get-single-profile-picture/BC1YLiVd3t2XfDutMgVFPeShG3RiPGGrSa1qJ5b5f23sHyFAd2nrqU2"
                alt="profile"
              />
              <span className="mx-3"> CloutSwagger </span>
            </li>
            <li className="flex items-center">
              <img
                className="w-7 h-7"
                src="https://node.deso.org/api/v0/get-single-profile-picture/BC1YLiVd3t2XfDutMgVFPeShG3RiPGGrSa1qJ5b5f23sHyFAd2nrqU2"
                alt="profile"
              />
              <span className="mx-3"> CloutSwagger </span>
            </li>
            <li className="flex items-center">
              <img
                className="w-7 h-7"
                src="https://node.deso.org/api/v0/get-single-profile-picture/BC1YLiVd3t2XfDutMgVFPeShG3RiPGGrSa1qJ5b5f23sHyFAd2nrqU2"
                alt="profile"
              />
              <span className="mx-3"> CloutSwagger </span>
            </li>
          </ul>
        </div>
        <div style={{ marginLeft: "auto" }} className="items-between flex">
          <div>
            COUNT
            <ul
              style={{ height: "100%", justifyContent: "space-around" }}
              className="p-0 flex flex-col"
            >
              <li>25</li>
              <li>22</li>
              <li>13</li>
              <li>7</li>
              <li>4</li>
            </ul>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <span className="my-3 bg-green-600 p-1 rounded-lg">
          {" "}
          Your pixel count : 2
        </span>
        <button
          style={{ width: "50%", display: "flex", marginBottom: "3rem" }}
          className="btn btn-primary"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            window.__forceSmoothScrollPolyfill__ = true;
          }}
        >
          Increse it
        </button>
      </div>
      {/* <hr style={{ background: "white" }} /> */}
    </div>
  );
};

export default LeaderBoard;
