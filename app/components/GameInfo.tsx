import type { Chess } from "chess.js"

interface GameInfoProps {
  game: Chess
  moveHistory: string[]
  currentPlayer: string
}

export default function GameInfo({ game, moveHistory, currentPlayer }: GameInfoProps) {
  const getGameStatus = () => {
    if (game.isCheckmate()) {
      return `Checkmate! ${currentPlayer === "White" ? "Black" : "White"} wins!`
    }
    if (game.isDraw()) {
      return "Draw!"
    }
    if (game.isStalemate()) {
      return "Stalemate!"
    }
    if (game.isCheck()) {
      return `${currentPlayer} is in check!`
    }
    return `${currentPlayer} to move`
  }

  const getCapturedPieces = () => {
    const initialPieces = {
      white: { p: 8, r: 2, n: 2, b: 2, q: 1, k: 1 },
      black: { p: 8, r: 2, n: 2, b: 2, q: 1, k: 1 },
    }

    const currentPieces = {
      white: { p: 0, r: 0, n: 0, b: 0, q: 0, k: 0 },
      black: { p: 0, r: 0, n: 0, b: 0, q: 0, k: 0 },
    }

    // Count current pieces on board
    for (let rank = 1; rank <= 8; rank++) {
      for (const file of ["a", "b", "c", "d", "e", "f", "g", "h"]) {
        const square = `${file}${rank}`
        const piece = game.get(square as any)
        if (piece) {
          const color = piece.color === "w" ? "white" : "black"
          currentPieces[color][piece.type as keyof typeof currentPieces.white]++
        }
      }
    }

    // Calculate captured pieces
    const captured = { white: [] as string[], black: [] as string[] }

    for (const color of ["white", "black"] as const) {
      for (const [pieceType, initialCount] of Object.entries(initialPieces[color])) {
        const currentCount = currentPieces[color][pieceType as keyof typeof currentPieces.white]
        const capturedCount = initialCount - currentCount
        for (let i = 0; i < capturedCount; i++) {
          captured[color].push(pieceType)
        }
      }
    }

    return captured
  }

  const capturedPieces = getCapturedPieces()

  const getPieceSymbol = (piece: string): string => {
    const symbols: { [key: string]: string } = {
      p: "♟",
      r: "♜",
      n: "♞",
      b: "♝",
      q: "♛",
      k: "♚",
    }
    return symbols[piece] || ""
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Game Info</h2>

      <div className="mb-6">
        <div className="text-lg font-semibold mb-2">Status:</div>
        <div
          className={`text-lg p-3 rounded ${
            game.isGameOver()
              ? "bg-red-100 text-red-800"
              : game.isCheck()
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
          }`}
        >
          {getGameStatus()}
        </div>
      </div>

      {/* Captured Pieces Section */}
      <div className="mb-4">
        <div className="text-lg font-semibold mb-2">Captured Pieces:</div>
        <div className="bg-gray-50 rounded p-3">
          <div className="mb-2">
            <span className="font-medium text-sm">White captured: </span>
            {capturedPieces.white.length > 0 ? (
              <span className="text-2xl">
                {capturedPieces.white.map((piece, index) => (
                  <span key={index}>{getPieceSymbol(piece)}</span>
                ))}
              </span>
            ) : (
              <span className="text-gray-500 text-sm">None</span>
            )}
          </div>
          <div>
            <span className="font-medium text-sm">Black captured: </span>
            {capturedPieces.black.length > 0 ? (
              <span className="text-2xl">
                {capturedPieces.black.map((piece, index) => (
                  <span key={index}>{getPieceSymbol(piece)}</span>
                ))}
              </span>
            ) : (
              <span className="text-gray-500 text-sm">None</span>
            )}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-lg font-semibold mb-2">Move History:</div>
        <div className="bg-gray-50 rounded p-3 max-h-64 overflow-y-auto">
          {moveHistory.length === 0 ? (
            <div className="text-gray-500 italic">No moves yet</div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {moveHistory.map((move, index) => (
                <div key={index} className="text-sm">
                  <span className="font-mono">
                    {Math.floor(index / 2) + 1}
                    {index % 2 === 0 ? "." : "..."} {move}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="text-sm text-gray-600">
        <div>Moves: {Math.floor(moveHistory.length / 2) + (moveHistory.length % 2)}</div>
        <div>Turn: {game.turn() === "w" ? "White" : "Black"}</div>
      </div>
    </div>
  )
}
