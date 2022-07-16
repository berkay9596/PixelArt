import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const LeaderBoard = () => {
  const navigate = useNavigate();
  const [publicKeys, setPublicKeys] = useState([]);
  const [publicKeys2, setPublicKeys2] = useState([]);
  const getPublicKeys = async () => {
    await fetch(
      // "/api/v1/get-rows",
      "https://www.desopixel.art/api/v1/get-rows",
      {}
    )
      .then((resp) => resp.json())
      .then((data) => {
        setPublicKeys(data.rows);
      });
  };
  useEffect(() => {
    getPublicKeys();
  }, []);


  publicKeys.map((pk) => pk.map((p) => p !== "" && publicKeys2.push(p)));
  // publicKeys2.map((x) => x.slice(-10));
  const count = {};
 
  publicKeys2.forEach((element) => {
    count[element] = (count[element] || 0) + 1;
  });
  console.log("count",count)
  return (
    <div className="text-white flex flex-col container mx-auto prose board-bg my-12">
      <h3 className="my-5 board text-center">Leaderboard</h3>
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
          <span className="mx-14">USER</span>
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
        <span className="my-3 p-1 rounded-lg"> Your pixel count : 2</span>
        <button
          style={{ width: "50%", display: "flex", marginBottom: "3rem" }}
          className="btn btn-primary"
          onClick={() => {
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
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
