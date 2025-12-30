import type { Chess } from "chess.js"
import { getPieceComponent } from "./Pieces"

interface GameInfoProps {
  game: Chess
  moveHistory: string[]
  currentPlayer: string
  theme: "classic" | "glass" | "modern"
}

export default function GameInfo({ game, moveHistory, currentPlayer, theme }: GameInfoProps) {
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

  const cardStyle = theme === 'glass'
    ? "bg-white/10 backdrop-blur-md border border-white/20 text-white"
    : "bg-white shadow-lg text-gray-800"

  const subCardStyle = theme === 'glass'
    ? "bg-black/20 text-white"
    : "bg-gray-50 text-gray-800"

  return (
    <div className={`rounded-xl p-6 w-full max-w-md transition-all duration-300 ${cardStyle}`}>
      <h2 className="text-2xl font-bold mb-4 text-center">Game Info</h2>

      <div className="mb-6">
        <div className="text-lg font-semibold mb-2">Status:</div>
        <div
          className={`text-lg p-3 rounded-lg font-medium text-center ${game.isGameOver()
              ? "bg-red-500/20 text-red-500 border border-red-500/30"
              : game.isCheck()
                ? "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30"
                : "bg-green-500/20 text-green-500 border border-green-500/30"
            }`}
        >
          {getGameStatus()}
        </div>
      </div>

      {/* Captured Pieces Section */}
      <div className="mb-4">
        <div className="text-lg font-semibold mb-2">Captured Pieces:</div>
        <div className={`rounded-lg p-3 ${subCardStyle}`}>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-medium text-sm w-12">White: </span>
            <div className="flex flex-wrap gap-1">
              {capturedPieces.white.length > 0 ? (
                capturedPieces.white.map((piece, index) => {
                  const PieceParam = getPieceComponent(piece, 'white');
                  return PieceParam ? <div key={index} className="w-6 h-6"><PieceParam side="white" /></div> : null
                })
              ) : (
                <span className="text-gray-400 text-xs italic">None</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm w-12">Black: </span>
            <div className="flex flex-wrap gap-1">
              {capturedPieces.black.length > 0 ? (
                capturedPieces.black.map((piece, index) => {
                  const PieceParam = getPieceComponent(piece, 'black');
                  return PieceParam ? <div key={index} className="w-6 h-6"><PieceParam side="black" /></div> : null
                })
              ) : (
                <span className="text-gray-400 text-xs italic">None</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-lg font-semibold mb-2">Move History:</div>
        <div className={`rounded-lg p-3 max-h-64 overflow-y-auto ${subCardStyle}`}>
          {moveHistory.length === 0 ? (
            <div className="text-gray-400 italic text-center text-sm">No moves yet</div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {moveHistory.map((move, index) => (
                <div key={index} className="text-sm flex">
                  <span className="w-6 text-gray-400 text-xs">{Math.floor(index / 2) + 1}.</span>
                  <span className={`font-mono ${index % 2 === 0 ? "text-blue-400" : "text-amber-600"}`}>
                    {move}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between text-xs text-gray-400 mt-4 px-2">
        <div>Moves: {Math.floor(moveHistory.length / 2) + (moveHistory.length % 2)}</div>
        <div>Turn: {game.turn() === "w" ? "White" : "Black"}</div>
      </div>
    </div>
  )
}
