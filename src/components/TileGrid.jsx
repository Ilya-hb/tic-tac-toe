import React from "react";

function TileGrid({ board, selectedSize, handleClick }) {
  return (
    <>
      <div className={`grid grid-cols-${Math.sqrt(selectedSize)} gap-2`}>
        {board.map((cell, index) => (
          <button
            key={index}
            className="bg-gray-200 hover:bg-gray-400 focus:bg-gray-300 text-6xl font-bold h-24 w-24 text-neutral-600 transition"
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>
    </>
  );
}

export default TileGrid;
