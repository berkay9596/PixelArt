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
import DesoApi from "../libs/desoApi";
import DesoIdentity from "../libs/desoIdentity";
// let endPoint = "http://localhost:5000";
// let socket = io.connect(`${endPoint}`);

function Homepage() {
  const [currentSelectedColor, setCurrentSelectedColor] = useState("#aabbcc");
  const [value, setValue] = useState(0);
  const [count, setCount] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowsCompare, setRowsCompare] = useState([]);
  const [deleteButtonActive, setDeleteButtonActive] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [socketChange, setSocketChange] = useState(0);
  // const [isSubmitted, setIsSubmitted] = useState(0);
  const token = JSON.parse(localStorage.getItem("identityUsersV2"));
  const publicKey = token?.publicKey;
  const { getSingleProfile } = useContext(DesoContext);
  const [statusCode, setStatusCode] = useState([]);
  const [desoIdentity, setDesoIdentity] = useState(null);
  const [desoApi, setDesoApi] = useState(null);
  const fillColor = async (rowIndex, colIndex) => {
    if (token) {
      getRowsFromApiToComparison();
      if (rowsCompare.length !== 0) {
        let newGrid = [...rows];
        if (rowsCompare[rowIndex][colIndex] !== "") {
          const profile = await getSingleProfile(
            rowsCompare[rowIndex][colIndex].slice(-55)
          );
          toast.error(
            `Pixel owner is ${profile}. 
            You can't make a change on this pixel.`
          );
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
          console.log("currentSelectedColorcurrentSelectedColor",currentSelectedColor)

        }
      }
    } else {
      toast.error("You must be logged in to selecting any pixel.");
    }
  };

  const getRowsFromApi = async () => {
    await fetch(
      // "/api/v1/get-rows",
      "https://www.desopixel.art/api/v1/get-rows",
      {}
    )
      .then((resp) => resp.json())
      .then((data) => {
        setRows(data.rows);
      });
  };

  const getRowsFromApiToComparison = async () => {
    await fetch(
      // "/api/v1/get-rows",
      "https://www.desopixel.art/api/v1/get-rows",
      {}
    )
      .then((resp) => resp.json())
      .then((data) => {
        setRowsCompare(data.rows);
      });
  };
  useEffect(() => {
    const di = new DesoIdentity();
    setDesoIdentity(di);
    const da = new DesoApi();
    setDesoApi(da);
    // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  const sendDesoToMain = async (publicKey, amount) => {
    let createSend = await desoApi.sendDeso(publicKey, 100000000 * amount);
    let transactionHex = await createSend.TransactionHex;
    let signedTransactionHex = await desoIdentity.signTxAsync(transactionHex);
    let rtnSend = await desoApi.submitTransaction(signedTransactionHex);
    const all = Promise.all([
      createSend,
      transactionHex,
      signedTransactionHex,
      rtnSend,
    ]);
    const txn = all.then((resp) => resp[3].TxnHashHex);
    return txn;
  };
  const submitPixel = async () => {
    const thxHashHex = await sendDesoToMain(publicKey, count);
    await fetch(
      "/api/v1/add-rows",
      // "https://www.desopixel.art/api/v1/add-rows",
      {
        method: "POST",
        body: JSON.stringify({
          rows: rows,
          pixelCount: count,
          publicKey: publicKey,
          txnHashHex: thxHashHex,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setStatusCode((prev) => [...prev, data.Status]);
      })
      .catch((error) => {
        console.log(error);
        setStatusCode((prev) => [...prev, error.Status]);
      });
    // setIsSubmitted(1);
    // setSocketChange(1);
    // setTimeout(() => {
    //   setIsSubmitted(0);
    // }, 1000);
  };
  useEffect(() => {
    getRowsFromApi();
    getRowsFromApiToComparison();
    return () => {
      console.log("cleanup");
    };
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
    await submitPixel();
    // socket.emit("message", rows);
    getRowsFromApiToComparison();
  };
  useEffect(() => {
    if (
      statusCode[statusCode.length - 1] === "Success" &&
      statusCode.length > 0
    ) {
      setValue((value) => value + 1);
      document.getElementById("my-modal").checked = false;
      setLoading(false);
      toast.success(
        "Selected pixels added to the system. You can view your stats in the Leaderboard page."
      );
      setCount(0);
    } else if (
      statusCode[statusCode.length - 1] === "Error --> UNAUTHORIZED" &&
      statusCode.length > 0
    ) {
      toast.error("Something went wrong.");
      document.getElementById("my-modal").checked = false;
      setLoading(false);
    }
    return () => {
      console.log("cleanup");
    };
  }, [statusCode]);
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
      {/* 
import { HexColorPicker } from "react-colorful";

const YourComponent = () => {
  const [color, setColor] = useState("#aabbcc");
  return <HexColorPicker color={color} onChange={setColor} />;
} */}
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
