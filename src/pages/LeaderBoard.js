import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DesoContext from "../context/DesoContext";
import axios from "axios";
import BackdropWithSpinner from "../components/BackdropWithSpinner";
import {colors} from '../constants/leaderboardColors'
const LeaderBoard = () => {


  const navigate = useNavigate();
  const [publicKeys, setPublicKeys] = useState([]);
  const [publicKeys2, setPublicKeys2] = useState([]);
  const [profileNames, setProfileNames] = useState([]);
  const [publicKeyAndCount, setPubicKeyAndCount] = useState();
  const [status, setStatus] = useState(false);
  const { getSingleProfile } = useContext(DesoContext);
  const [usersPixelCount, setUsersPixelCount] = useState(0);
  const [show, setShow] = useState(false);
  const count = {};
  const token = JSON.parse(localStorage.getItem("identityUsersV2"));
  const pb = token?.publicKey;
  const [loggedUser, setLoggedUser] = useState("");

  useEffect(() => {
    async function deneme() {
      await axios
        .get("https://www.desopixel.art/api/v1/get-rows")
        .then((resp) => setPublicKeys(resp.data.rows));
    }
    deneme();
    setTimeout(() => {
      setStatus(true);
    }, 1500);
    return () => {
      console.log("cleanup");
    };
  }, []);
  useEffect(() => {
    setShow(false);
    const a = [...publicKeys];
    a?.map((pk) => pk?.map((p) => p !== "" && publicKeys2.push(p.slice(-55))));
    const b = [...publicKeys2];
    b?.forEach((element) => {
      count[element] = (count[element] || 0) + 1;
    });
    const denem = Object.entries(count).sort((a, b) => b[1] - a[1]);
    denem.map((x) => x[0] === pb && setUsersPixelCount(x[1]));
    setPubicKeyAndCount(denem);
    const usernameLoop = async () => {
      for (const item of denem) {
        const username = await getSingleProfile(item[0]);
        const all = Promise.all([username]);
        all.then((v) => setProfileNames((prev) => [...prev, v]));
      }
    };
    usernameLoop();

    return () => {
      console.log("cleanup");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    if (
      publicKeyAndCount?.length === profileNames?.length &&
      publicKeyAndCount.length > 0
    ) {
      setShow(true);
    }
    return () => {
      console.log("cleanup");
    };
  }, [publicKeyAndCount, profileNames]);
  useEffect(() => {
    getSingleProfile(token?.publicKey).then((resp) => setLoggedUser(resp));
    return () => {
      console.log("cleanup");
    };
  }, [status]);
  return (
    <div style={{ minHeight: "65vh" }}>
      {token ? (
        <>
          {show ? (
            <div className="text-white flex flex-col container mx-auto prose board-bg my-12">
              <h3 className="my-5 board text-center">Leaderboard</h3>
              <div className="flex items-between mx-6">
                <div>
                  <span style={{ marginLeft: "3px" }} className="relative">
                    {" "}
                    POS
                  </span>
                  <ul
                    style={{
                      height: "100%",
                      justifyContent: "space-around",
                      marginRight: "0.4rem",
                    }}
                    className="p-0 flex flex-col"
                  >
                    {profileNames?.map((x, index) => {
                      return (
                        <li
                          style={{
                            borderRight: `3px solid ${colors[index]}`,
                            padding: "0.2rem",
                          }}
                          key={index}
                        >
                          {index + 1}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="mx-5">
                  <span className="mx-20">USER</span>
                  <ul
                    style={{
                      height: "100%",
                      justifyContent: "space-around",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {profileNames.map((x, index) => (
                      <li
                        className="flex items-center"
                        key={index}
                        style={x == loggedUser ? { color: "lime" } : {}}
                      >
                        {
                          <img
                            className="w-7 h-7 rounded-full"
                            src={`https://node.deso.org/api/v0/get-single-profile-picture/${publicKeyAndCount[index][0]}`}
                            alt="profile"
                          />
                        }
                        <span value="" className="mx-3">
                          {x}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  style={{ marginLeft: "auto" }}
                  className="items-between flex"
                >
                  <div>
                    <span style={{ right: "5px" }} className="relative">
                      {" "}
                      COUNT
                    </span>
                    <ul
                      style={{ height: "100%", justifyContent: "space-around" }}
                      className="p-0 flex flex-col"
                    >
                      {publicKeyAndCount?.map((x, index) => {
                        return <li key={index}>{x[1]}</li>;
                      })}
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
                <div className="flex flex-col items-center justify-center mb-3 p-4">
                  <span className="my-3 p-1 rounded-lg">
                    {" "}
                    Your pixel count : <span style={{color:"lime"}}>{usersPixelCount}</span>
                  </span>{" "}
                  <span className="px-8">
                    {" "}
                    When the completed artwork is sold, you will have{" "}
                    <span style={{color:"lime"}}> {((usersPixelCount / 625) * 100).toFixed(2)}%</span> of the share.
                  </span>
                </div>
                <button
                  style={{
                    width: "50%",
                    display: "flex",
                    marginBottom: "3rem",
                  }}
                  className="btn btn-primary"
                  onClick={() => {
                    navigate("/");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Increse it
                </button>
              </div>
            </div>
          ) : (
            <div style={{ minHeight: "65vh" }}>
              <BackdropWithSpinner />
            </div>
          )}
        </>
      ) : (
        <div
          style={{ minHeight: "80vh" }}
          className="flex justify-center items-center"
        >
          <h2 className="xl:text-6xl sm:text-4xl">Unauthorized Page 401!</h2>
        </div>
      )}
    </div>
  );
};

export default LeaderBoard;
