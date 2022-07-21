import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DesoContext from "../context/DesoContext";
import axios from "axios";
import BackdropWithSpinner from "./BackdropWithSpinner";
import { toast } from "react-toastify";
const LeaderBoard = () => {
  const colors = [
    "white",
    "red",
    "yellow",
    "purple",
    "lime",
    "blue",
    "green",
    "cyan",
    "rebeccapurple",
    "pink",
    "wheat",
    "white",
    "red",
    "yellow",
    "purple",
    "lime",
    "blue",
    "green",
    "cyan",
    "rebeccapurple",
    "pink",
    "wheat",
    "white",
    "red",
    "yellow",
    "purple",
    "lime",
    "blue",
    "green",
    "cyan",
    "rebeccapurple",
    "pink",
    "wheat",
  ];
  const navigate = useNavigate();
  const [publicKeys, setPublicKeys] = useState([]);
  const [publicKeys2, setPublicKeys2] = useState([]);
  const [profileNames, setProfileNames] = useState([]);
  const [publicKeyAndCount, setPubicKeyAndCount] = useState();
  const [status, setStatus] = useState(false);
  const { getSingleProfile } = useContext(DesoContext);
  const [show, setShow] = useState(false);
  const count = {};
  useEffect(() => {
    async function deneme() {
      await axios
        .get("https://www.desopixel.art/api/v1/get-rows")
        .then((resp) => setPublicKeys(resp.data.rows));
    }
    deneme();
    setTimeout(() => {
      setStatus(true);
    }, 300);
    return () => {
      console.log("cleanup");
    };
  }, []);
  useEffect(() => {
    if (status) {
      setShow(false);
      const a = [...publicKeys];
      a?.map((pk) =>
        pk?.map((p) => p !== "" && publicKeys2.push(p.slice(-55)))
      );
      const b = [...publicKeys2];
      b?.forEach((element) => {
        count[element] = (count[element] || 0) + 1;
      });
      const denem = Object.entries(count).sort((a, b) => b[1] - a[1]);
      setPubicKeyAndCount(denem);
      const usernameLoop = async () => {
        for (const item of denem) {
          const username = await getSingleProfile(item[0]);
          const all = Promise.all([username]);
          all.then((v) => setProfileNames((prev) => [...prev, v]));
        }
      };
      usernameLoop();
      setShow(true);
    }
    return () => {
      console.log("cleanup");
    };
  }, [status]);

  return (
    <>
      {show ? (
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
                {profileNames?.map((x, index) => {
                  return (
                    <li
                      style={{
                        borderRight: `3px solid ${colors[index]}`,
                        padding: "0.2rem",
                      }}
                    >
                      {index + 1}
                    </li>
                  );
                })}
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
                {profileNames?.map((x, index) => (
                  <li className="flex items-center">
                    {
                      <img
                        className="w-7 h-7"
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
            <div style={{ marginLeft: "auto" }} className="items-between flex">
              <div>
                COUNT
                <ul
                  style={{ height: "100%", justifyContent: "space-around" }}
                  className="p-0 flex flex-col"
                >
                  {profileNames.length === publicKeyAndCount.length
                    ? publicKeyAndCount?.map((x, index) => {
                        return <li key={index}>{x[1]}</li>;
                      })
                    : ""}
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
        </div>
      ) : (
        <div style={{ minHeight: "65vh" }}>
          <BackdropWithSpinner />
        </div>
      )}
    </>
  );
};

export default LeaderBoard;
