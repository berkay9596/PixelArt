function Canvas(props) {
  return (
    <div
      style={{
        gap: "1px",
      }}
      className="flex flex-col items-center xl:items-center md:items-center"
    >
      {props.rows?.map((row, rowIndex) => (
        <div
          style={{
            gap: "1px",
          }}
          className="flex"
          key={rowIndex}
        >
          {row.map((col, colIndex) => (
            <div
              key={colIndex}
              onClick={() => {
                props.fillColor(rowIndex, colIndex);
              }}
              className={`pixel
                    w-3  md:w-7 sm:w-5 
                    h-3   md:h-7 sm:h-5 transition-all cursor-pointer ${
                      col || "bg-purple-300"
                    }`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Canvas;
