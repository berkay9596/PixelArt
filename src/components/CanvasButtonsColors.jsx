import { useState } from "react";
import eraser from "../images/eraser.svg";
import { colors } from "../constants/colors";
import { toast } from "react-toastify";
import { HexColorPicker } from "react-colorful";

function CanvasButtonsColors({
  deleteButtonActive,
  setDeleteButtonActive,
  currentSelectedColor,
  count,
  setCurrentSelectedColor,
}) {
  const token = JSON.parse(localStorage.getItem("identityUsersV2"));
  // const [color, setColor] = useState("#aabbcc");
  // console.log("currentselectedcolor", currentSelectedColor);
  return (
    <div className="flex items-center justify-center flex-col flex-wrap mb-12">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1rem",
          padding: "1rem",
        }}
        className="grid overflow-hidden grid-cols-2 gap-2 py-2 my-2"
      >
        <p
          style={{
            background: "#f8a60d",
            height: "3.5rem",
          }}
          className="flex flex-col p-1 rounded-lg max-w-xs min-w-max box"
        >
          Total Selected Pixels <span> {count}</span>
        </p>
        <button
          onClick={() => {
            setDeleteButtonActive(true);
            setCurrentSelectedColor();
          }}
          className="btn btn-error"
          style={{
            border: deleteButtonActive ? "4px solid lime" : "none",
            background: deleteButtonActive ? "white" : "#f000b8",
            minHeight: "3.5rem",
            maxHeight: "3.5rem",
          }}
        >
          <img src={eraser} className="w-10 mx-2" alt="delete button" />
          <span
            style={{
              color: deleteButtonActive ? "black" : "white",
            }}
          >
            Delete
          </span>
        </button>
      </div>
      <div
        style={{ maxWidth: "40rem", flexWrap: "wrap" }}
        className="flex justify-center gap-1 flex-wrap"
      >
        {/* {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSelectedColor(color);
              setDeleteButtonActive(false);
            }}
            style={{ backgroundColor: `${color}` }}
            className={`w-10 h-10 flex items-center justify-center rounded-full
            //  ${color}`
            }
          >
            <div
              // style={{ background: `${currentSelectedColor}` }}
              className={`${
                color === currentSelectedColor ? "w-8 h-8" : "w-0 h-0"
              } transition-all bg-zinc-800 rounded-full`}
            />
          </button>
        ))} */}
        <HexColorPicker
          color={currentSelectedColor}
          onChange={setCurrentSelectedColor}
          // onClick={() => {
          //   setCurrentSelectedColor(color);
          //   setDeleteButtonActive(false);
          // }}
        />
      </div>
      <div className="py-1 my-2"></div>

      <button
        onClick={() => {
          // if (token) {
          //   if (count > 0) {
          //     document.getElementById("my-modal").checked = true;
          //   } else {
          //     toast.error("You can't submit without selecting any pixel.");
          //   }
          // } else {
          //   toast.error("You must be logged in to submit your pixel.");
          // }
          toast.error("It will be active soon.")
        }}
        id="submit"
        className="btn btn-primary"
        style={{
          color: "white",
        }}
      >
        Submit to system
      </button>
    </div>
  );
}

export default CanvasButtonsColors;
