import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Confetti from "../components/Confetti";
import { colors } from "../constants/colors";
import BackdropWithSpinner from "../components/BackdropWithSpinner";
// import io from "socket.io-client";
import { useContext } from "react";
import DesoContext from "../context/DesoContext";
import Modal from "../components/Modal";
import Introduction from "../components/Introduction";

import Canvas from "../components/Canvas";
import CanvasButtonsColors from "../components/CanvasButtonsColors";

// let endPoint = "http://localhost:5000";
// let socket = io.connect(`${endPoint}`);

function Homepage() {
  const [currentSelectedColor, setCurrentSelectedColor] = useState(colors[0]);
  const [value, setValue] = useState(0);
  const [count, setCount] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowsCompare, setRowsCompare] = useState([]);
  const [deleteButtonActive, setDeleteButtonActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socketChange, setSocketChange] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(0);
  const token = JSON.parse(localStorage.getItem("identityUsersV2"));
  const publicKey = token?.publicKey;
  const { sendDeso, getSingleProfile, thxHex } = useContext(DesoContext);

  const fillColor = async (rowIndex, colIndex) => {
    if (token) {
      getRowsFromApiToComparison();
      if (rowsCompare.length !== 0) {
        let newGrid = [...rows];
        if (rowsCompare[rowIndex][colIndex] !== "") {
          const profile = await getSingleProfile(
            rowsCompare[rowIndex][colIndex].slice(-55)
          );
          toast.error(`This pixel has signed into the system. by ${profile}`);
        } else if (deleteButtonActive && newGrid[rowIndex][colIndex] !== "") {
          newGrid[rowIndex][colIndex] = "";
          setCount((prev) => prev - 1);
        } else if (deleteButtonActive && newGrid[rowIndex][colIndex] === "") {
          newGrid[rowIndex][colIndex] = "";
        } else if (!deleteButtonActive && newGrid[rowIndex][colIndex] === "") {
          newGrid[rowIndex][
            colIndex
          ] = `${currentSelectedColor} ${token.publicKey}`;
          setCount((prev) => prev + 1);
        }
      }
    } else {
      toast.error("You need to login first.");
    }
  };

  const getRowsFromApi = async () => {
    await fetch(
      "/api/v1/get-rows",
      // "https://www.desopixel.art/api/v1/get-rows",
      {}
    )
      .then((resp) => resp.json())
      .then((data) => {
        setRows(data.rows);
      });
  };

  const getRowsFromApiToComparison = async () => {
    await fetch(
      "/api/v1/get-rows",
      // "https://www.desopixel.art/api/v1/get-rows",
      {}
    )
      .then((resp) => resp.json())
      .then((data) => {
        setRowsCompare(data.rows);
      });
  };

  const submitPixel = async () => {
    await fetch(
      "/api/v1/add-rows",
      // "https://www.desopixel.art/api/v1/add-rows",
      {
        method: "POST",
        body: JSON.stringify({
          rows: rows,
          pixelCount: count,
          publicKey: publicKey,
          txnHashHex: thxHex,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setIsSubmitted(1);
    setSocketChange(1);
    setTimeout(() => {
      setIsSubmitted(0);
    }, 1000);
  };

  useEffect(() => {
    getRowsFromApi();
    getRowsFromApiToComparison();
  }, []);

  // useEffect(() => {
  //   socket.on("message", () => {
  //     setCount(0);
  //     getRowsFromApi();
  //     setSocketChange((prev) => prev + 1);
  //   });
  // }, [socketChange]);

  const confirmTransaction = async () => {
    setLoading(true);
    // const token = JSON.parse(localStorage.getItem("identityUsersV2")).publicKey;
    // await sendDeso(token, count);
    await submitPixel();
    // socket.emit("message", rows);
    // getRowsFromApiToComparison();
    setValue((value) => value + 1);
    document.getElementById("my-modal").checked = false;
    setCount(0);
    setLoading(false);
    toast.success("Selected pixels added to the system.");
  };

  // useEffect(() => {
  //   if (isSubmitted === 0 && socketChange >= 1) {
  //     toast.warn(
  //       `Someone has updated the canvas. You may need to fill your pixels again!!!`
  //     );
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [socketChange]);

  return (
    <>
      <iframe
        title="desoidentity"
        id="identity"
        frameBorder="0"
        src="https://identity.deso.org/embed?v=2"
        style={{
          height: "100vh",
          width: "100vw",
          display: "none",
          position: "fixed",
          zIndex: 1000,
          left: 0,
          top: 0,
        }}
      ></iframe>
      <button
        onClick={() =>
          sendDeso("BC1YLhCt32Vi8pWxT1iCGrV5oYgqUQJ92CYGtYDTUJuAyao4KppBTdB", 1)
        }
      >
        Deneme
      </button>
      <div className="flex flex-col gap-5 transition-all  text-center my-12">
        <input type="checkbox" id="my-modal" className="modal-toggle" />

        {!loading && (
          <Modal count={count} confirmTransaction={confirmTransaction}></Modal>
        )}

        <Confetti value={value} />
        {loading && <BackdropWithSpinner />}
        <Canvas rows={rows} fillColor={fillColor} />

        <CanvasButtonsColors
          currentSelectedColor={currentSelectedColor}
          setCurrentSelectedColor={setCurrentSelectedColor}
          count={count}
          deleteButtonActive={deleteButtonActive}
          setDeleteButtonActive={setDeleteButtonActive}
        ></CanvasButtonsColors>
        <Introduction />
      </div>
    </>
  );
}

export default Homepage;
