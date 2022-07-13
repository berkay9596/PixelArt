import React from "react";

const LeaderBoard = () => {
  return (
    <div className="text-white flex flex-col container mx-auto prose">
      <h3>Leaderboard</h3>
      <div className="flex items-between mx-6">
        <div>
          POS
          <ul
            style={{ height: "100%", justifyContent: "space-evenly" }}
            className="p-0 flex flex-col"
          >
            <li style={{ borderRight: `3px solid red` }}>1</li>
            <li style={{ borderRight: `3px solid red` }}>2</li>
            <li style={{ borderRight: `3px solid red` }}>3</li>
          </ul>
        </div>
        <div className="mx-5">
          USER
          <ul style={{ marginTop: "2.4rem" }}>
            <li className="flex items-center">
              <img
                className="w-7 h-7"
                src="https://node.deso.org/api/v0/get-single-profile-picture/BC1YLiVd3t2XfDutMgVFPeShG3RiPGGrSa1qJ5b5f23sHyFAd2nrqU2"
              />
              <span className="mx-3"> CloutSwagger </span>
            </li>
            <li className="flex items-center">
              <img
                className="w-7 h-7"
                src="https://node.deso.org/api/v0/get-single-profile-picture/BC1YLiVd3t2XfDutMgVFPeShG3RiPGGrSa1qJ5b5f23sHyFAd2nrqU2"
              />
              <span className="mx-3"> CloutSwagger </span>
            </li>{" "}
            <li className="flex items-center">
              <img
                className="w-7 h-7 "
                src="https://node.deso.org/api/v0/get-single-profile-picture/BC1YLiVd3t2XfDutMgVFPeShG3RiPGGrSa1qJ5b5f23sHyFAd2nrqU2"
              />
              <span className="mx-3"> CloutSwagger </span>
            </li>
          </ul>
        </div>
        <div style={{ marginLeft: "auto" }} className="items-between flex">
          <div>
            COUNT
            <ul
              style={{ height: "100%", justifyContent: "space-evenly" }}
              className="p-0 flex flex-col"
            >
              <li>25</li>
              <li>22</li>
              <li>13</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
