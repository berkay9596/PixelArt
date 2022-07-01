import React, { useContext, useState } from "react";
import { CanvasContext } from "./App";
import { toast } from "react-toastify";
import Confetti from "./components/Confetti";
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
  const { grid, setGrid } = useContext(CanvasContext);
  const fillColor = (rowIndex, colIndex) => {
    let newGrid = [...grid];
    if (
      newGrid[rowIndex][colIndex] === currentSelectedColor ||
      newGrid[rowIndex][colIndex] !== ""
    ) {
      toast.error("You can't paint over an already painted pixel.");
    } else {
      newGrid[rowIndex][colIndex] = currentSelectedColor;
    }
    setGrid(newGrid);
    // localStorage.grid = JSON.stringify(newGrid);
  };

  console.log("grid", grid);
  console.log("modal",document.getElementById("my-modal"))
  return (
    <div className={`flex flex-col gap-5 transition-all  text-center my-10`}>
      <input type="checkbox" id="my-modal" class="modal-toggle" />
      <div class="modal">
        <div
          style={{ background: "black" }}
          class="modal-box flex items-center flex-col"
        >
          <h3 class="font-bold text-lg">
            You are about to own a pixel at Desopixelart
          </h3>
          <p class="py-4">1 Pixel = 0.1 Deso</p>
          <p class="py-4">Do you confirm the transaction?</p>

          <div class="modal-action">
            <label
              onClick={() => {
                setValue((value) => value + 1);
                document.getElementById("my-modal").checked = false;
              }}
              class="btn btn-success"
            >
              Confirm
            </label>
            <label for="my-modal" class="btn btn-secondary">
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
        {grid.map((row, rowIndex) => (
          <div style={{ gap: "1px" }} className="flex ">
            {row.map((col, colIndex) => (
              <div
                onClick={() => {
                  fillColor(rowIndex, colIndex);
                  document.getElementById("my-modal").checked = true;
                  console.log("coldİndex", rowIndex, colIndex);
                }}
                className={`
                w-3  md:w-5 sm:w-5
                h-3   md:h-5 sm:h-5 transition-all cursor-pointer ${
                  // col || "bg-zinc-200"
                  // col || "bg-orange-200"
                  // col || "bg-sky-100"
                  // col || "bg-indigo-200"
                  // col || "bg-fuchsia-100	"
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
          justifyContent: "center",
        }}
        className="gap-1 flex-wrap"
      >
        {colors.map((color) => (
          <button
            onClick={() => setCurrentSelectedColor(color)}
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
      <article class="prose mx-auto">
        {/* <h1>What is DesoPixelArt in 5 Step?</h1>
        <p>
          <span> 1</span>- Paint any pixels you want on any available canvas.
          <br />
          <span> 2</span>- The more you paint, the bigger share of the painting
          you get.
          <br />
          <span> 3</span>- After all pixels are set, the canvas is put up for
          auction. Anyone can make a bid.
          <br />
          <span> 4</span>- 96.1% of the winning bid from auction is distributed
          to the painters.
          <br />
          <span> 5</span>- If you painted half of the canvas, you'll get 50% of
          that.
        </p> */}
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
        <ul class="steps steps-vertical lg:steps-horizontal mx-2 p-0">
          <li class="step step-success">
            <span className="mx-5">
              Paint any pixels you want on any available canvas.
            </span>
          </li>
          <li class="step step-success">
            <span className="mx-4">
              {" "}
              The more you paint, the bigger share of the painting you get.
            </span>
          </li>
          <li class="step step-success">
            <span className="mx-1" >
              {" "}
              After all pixels are set, the canvas is put up for auction. Anyone
              can make a bid.
            </span>
          </li>
          <li class="step step-success">
            <span className="mx-4" >
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
