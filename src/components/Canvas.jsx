import React from "react";

const Canvas = ({ rows, fillColor }) => {
  // console.log(rows);
  return (
    <div
      style={{
        gap: "1px",
      }}
      className="flex flex-col items-center xl:items-center md:items-center"
    >
      {rows?.map((row, rowIndex) => (
        <div
          style={{
            gap: "1px",
          }}
          className="flex"
          key={rowIndex}
        >
          {row.map((col, colIndex) => {
            return (
              <div
                key={colIndex}
                onClick={() => {
                  fillColor(rowIndex, colIndex);
                }}

                className={`pixel
                      w-3  md:w-6 sm:w-5 
                      h-3   md:h-6 sm:h-5 transition-all cursor-pointer ${
                        col || "bg-purple-100"
                      }`}
                      style={{
                        backgroundColor: `${col.substring(0, 7)}`,
                      }}
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Canvas;
