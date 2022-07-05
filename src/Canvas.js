import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Confetti from "./components/Confetti";
import eraser from "./images/eraser.svg";
function Canvas() {
  const colors = [
    "bg-rose-500",
    "bg-red-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-yellow-500",
    "bg-lime-500",
    "bg-green-500",
    "bg-emerald-500",
    "bg-cyan-500",
    "bg-sky-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-violet-500",
    "bg-purple-500",
    "bg-fuchsia-500",
    "bg-pink-500",
  ];
  const [currentSelectedColor, setCurrentSelectedColor] = useState(colors[0]);
  const [value, setValue] = useState(0);
  const [count, setCount] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowsCompare, setRowsCompare] = useState([]);
  const [deleteButtonActive, setDeleteButtonActive] = useState(false);
  console.log("rowsCompare", rowsCompare);
  const fillColor = (rowIndex, colIndex) => {
    getRowsFromApi2();
    if (rowsCompare.length !== 0) {
      let newGrid = [...rows];
      if (
        // newGrid[rowIndex][colIndex] === currentSelectedColor ||
        rowsCompare[rowIndex][colIndex] !== ""
      ) {
        toast.error("This pixel has signed into the system.");
      } else if (deleteButtonActive && newGrid[rowIndex][colIndex] !== "") {
        newGrid[rowIndex][colIndex] = "";
        setCount((prev) => prev - 1);
      } else if (deleteButtonActive && newGrid[rowIndex][colIndex] === "") {
        newGrid[rowIndex][colIndex] = "";
      } else if (!deleteButtonActive && newGrid[rowIndex][colIndex] === "") {
        newGrid[rowIndex][colIndex] = currentSelectedColor;
        setCount((prev) => prev + 1);
      }
      // setRows(newGrid);
      // localStorage.grid = JSON.stringify(newGrid);
    }
  };

  const getRowsFromApi = async () => {
    await fetch("/api/v1/get-rows", {
      // mode: "no-cors",
    })
      .then((resp) => resp.json())
      .then((data) => {
        setRows(data.rows);
      });
  };
  const getRowsFromApi2 = async () => {
    await fetch("/api/v1/get-rows", {
      // mode: "no-cors",
    })
      .then((resp) => resp.json())
      .then((data) => {
        setRowsCompare(data.rows);
      });
  };
  useEffect(() => {
    getRowsFromApi();
    getRowsFromApi2();
  }, []);

  const submitPixel = async () => {
    await fetch("http://139.177.182.25/api/v1/add-rows", {
      method: "POST",
      body: JSON.stringify({ rows: rows }),
      // mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className={`flex flex-col gap-5 transition-all  text-center my-10`}>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div
          style={{ background: "black" }}
          className="modal-box flex items-center flex-col"
        >
          <h3 className="font-bold text-lg">
            You are about to own a pixel at Desopixelart
          </h3>
          <p className="py-3">Total Price : {count / 10} Deso</p>
          <p className="py-3">Do you confirm the transaction?</p>

          <div className="modal-action">
            <label
              onClick={() => {
                submitPixel();
                setValue((value) => value + 1);
                document.getElementById("my-modal").checked = false;
                setCount(0);
              }}
              className="btn btn-primary"
              id="confirm"
            >
              Confirm
            </label>
            <label id="cancel" for="my-modal" className="btn btn-secondary ">
              Cancel
            </label>
          </div>
        </div>
      </div>
      <Confetti value={value} />
      <div
        style={{ gap: "1px" }}
        className="flex flex-col items-center xl:items-center md:items-center"
      >
        {rows.map((row, rowIndex) => (
          <div style={{ gap: "1px" }} className="flex ">
            {row.map((col, colIndex) => (
              <div
                onClick={() => {
                  fillColor(rowIndex, colIndex);
                  // document.getElementById("my-modal").checked = true;
                  console.log("coldİndex", rowIndex, colIndex);
                }}
                className={`
                w-3  md:w-5 sm:w-5
                h-3   md:h-5 sm:h-5 transition-all cursor-pointer ${
                  col || "bg-purple-200"
                }`}
              />
            ))}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          className="gap-1 flex-wrap"
        >
          {colors.map((color) => (
            <button
              onClick={() => {
                setCurrentSelectedColor(color);
                setDeleteButtonActive(false);
              }}
              className={`w-10 h-10 flex items-center justify-center rounded-full ${color}`}
            >
              <div
                className={`${
                  color === currentSelectedColor ? "w-8 h-8" : "w-0 h-0"
                } transition-all bg-zinc-800 rounded-full`}
              />
            </button>
          ))}
        </div>
        <div className="py-1 my-2">
          <button
            onClick={() => {
              setDeleteButtonActive(true);
              setCurrentSelectedColor();
            }}
            className="btn btn-error"
            style={{
              border: deleteButtonActive ? "4px solid green" : "none",
              background: deleteButtonActive ? "white" : "",
            }}
          >
            <img src={eraser} className="w-10 mx-2" />
            <span style={{ color: deleteButtonActive ? "black" : "white" }}>
              Delete
            </span>
          </button>
        </div>
        <div className="py-1 my-2">
          <p className="bg-neutral">Total Selected Pixels : {count}</p>
        </div>
        <button
          onClick={() => {
            if (count > 0) {
              document.getElementById("my-modal").checked = true;
            } else {
              toast.error("You can't submit without selecting any pixel.");
            }
          }}
          id="submit"
          className="btn btn-success"
        >
          Submit to system
        </button>
      </div>
      <article className="prose mx-auto">
        <h2> Collaborative pixel painting</h2>
        <p>
          DESOPIXELART is the first ever collectible, collaborative pixel
          artwork to-be-created by the Deso community. Each canvas is 20x20
          pixels in size and has multiple authors, who create a unique piece of
          art by collaborating together. The completed artwork will be put up
          for auction and when sold, auction proceeds will be distributed among
          all contributors evenly, depending on how many pixels they contributed
          to the canvas.
        </p>

        <h3>Earn by contributing</h3>
        <p>
          By contributing to the artwork you are not only digitally signing your
          address to each and every pixel you paint onto the blockchain for
          eternity - you are also entitled to a percentage of the proceeds from
          the auction of the final piece as well as a portion of every sale
          afterwards.
        </p>

        <p>
          When the completed canvas is auctioned: 96.1% of auction proceeds will
          be distributed amongst contributors. Every sale of the canvas
          afterwards: 6.1% of sale proceeds will be distributed amongst
          contributors.
        </p>
        <ul className="steps steps-vertical lg:steps-horizontal mx-2 p-0">
          <li className="step step-success">
            <span className="mx-5">
              Paint any pixels you want on any available canvas.
            </span>
          </li>
          <li className="step step-success">
            <span className="mx-4">
              {" "}
              The more you paint, the bigger share of the painting you get.
            </span>
          </li>
          <li className="step step-success">
            <span className="mx-1">
              {" "}
              After all pixels are set, the canvas is put up for auction. Anyone
              can make a bid.
            </span>
          </li>
          <li className="step step-success">
            <span className="mx-4">
              {" "}
              96.1% of the winning bid from auction is distributed to the
              painters.
            </span>
          </li>
        </ul>
      </article>
    </div>
  );
}

export default Canvas;