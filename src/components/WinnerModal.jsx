import React from "react";

function WinnerModal({ winner, handleModalClose, showModal }) {
  const handleModalClick = () => {
    handleModalClose();
  };

  return (
    <>
      {showModal && (
        <div
          onClick={handleModalClick}
          className="h-screen w-full flex items-center justify-center bg-black bg-opacity-50 text-black absolute top-0 right-0"
        >
          <div className="bg-white p-8 rounded-md text-center">
            {winner === "draw" ? (
              <h2 className="text-2xl font-semibold">
                It's a draw! Try again {":)"}
              </h2>
            ) : (
              <h2 className="text-2xl font-semibold">
                Player {winner} wins! Congratulations!
              </h2>
            )}
            <button
              className="mx-auto sm:mx-0 text-xl w-40 mt-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-full px-6 py-3 transition-colors duration-300 ease-in-out"
              onClick={handleModalClick}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default WinnerModal;
