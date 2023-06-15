import { useEffect, useState } from "react";
import "./App.css";
import TileGrid from "./components/TileGrid";
import WinnerModal from "./components/WinnerModal";

function App() {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [scoreP1, setScoreP1] = useState(0); //score player X
  const [scoreP2, setScoreP2] = useState(0); //score player o
  const [countPlayedGames, setCountPlayedGames] = useState(0);
  const [selectedSizing, setSelectedSizing] = useState(9);
  const [board, setBoard] = useState(Array(selectedSizing).fill(null));
  const [showModal, setShowModal] = useState(false);

  const handleSizingSelect = (e) => {
    const newSize = parseInt(e.target.value);
    setSelectedSizing(newSize);
    setBoard(Array(newSize).fill(null));
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    //if it's winner or a draw display modal after 2s.
    if (winner || countPlayedGames === selectedSizing) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [winner, countPlayedGames, selectedSizing]);

  const handleNewGame = () => {
    setWinner(null);
    setCurrentPlayer("X");
    setBoard(Array(selectedSizing).fill(null));
  };

  const handleClick = (index) => {
    const newBoard = [...board];
    if (newBoard[index] || winner) {
      return;
    }

    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };
  const calculateWinner = (board) => {
    // winning combinations
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        board[a] === "X" ? setScoreP1(scoreP1 + 1) : setScoreP2(scoreP2 + 1); //giving a point to the winner
        setCountPlayedGames(countPlayedGames + 1);
        setWinner(board[a]);
        // console.log(board[a]);
        return board[a];
      }
    }
    //check for draw
    let isDraw = true;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        isDraw = false;
        break;
      }
    }
    if (isDraw) {
      setCountPlayedGames(countPlayedGames + 1);
      setWinner("draw");
      return "draw";
    }
    // in case of draw
    return null;
  };

  return (
    <div className="relative">
      <div className="container mx-auto py-10 flex flex-col items-center space-y-5">
        <h1 className="text-4xl text-center font-semibold">
          Welcome to Tic-Tac-Toe
        </h1>
        <div className="space-y-4 mt-4 text-center">
          <label htmlFor="sizing" className="py-5 text-2xl">
            Select your board sizing:
          </label>
          <select
            name="sizing"
            id="sizing"
            className="bg-white text-black text-xl px-5 py-2 my-6 mx-6 border-none"
            onChange={handleSizingSelect}
          >
            <option value={9}>3x3</option>
            <option value={36}>6x6</option>
            <option value={81}>9x9</option>
          </select>
          <p className="text-2xl">Played games: {countPlayedGames}</p>
        </div>
        <div className="flex w-full flex-row justify-between">
          <div className="text-3xl space-y-4">
            <h2 className={`${currentPlayer === "X" ? "border-b-4" : ""}`}>
              Player X
            </h2>
            <p className="">Score: {scoreP1}</p>
          </div>
          <div className="space-y-4 text-3xl">
            <h2 className={`${currentPlayer === "O" ? "border-b-4" : ""}`}>
              Player O
            </h2>
            <p className="text-3xl">Score: {scoreP2}</p>
          </div>
        </div>
        <TileGrid
          board={board}
          winner={winner}
          selectedSize={selectedSizing}
          handleClick={handleClick}
        />
        <button
          className="mx-auto sm:mx-0 text-xl w-40 mt-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-3 transition-colors duration-300 ease-in-out block"
          onClick={handleNewGame}
        >
          New game
        </button>
      </div>
      {winner && showModal && (
        <WinnerModal
          winner={winner}
          handleModalClose={handleModalClose}
          showModal={showModal}
        />
      )}
    </div>
  );
}

export default App;
