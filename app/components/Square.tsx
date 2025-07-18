"use client"

import type { Square as ChessSquare } from "chess.js"

interface SquareProps {
  square: ChessSquare
  piece: string | null
  isLight: boolean
  isSelected: boolean
  isPossibleMove: boolean
  onClick: () => void
}

export default function Square({ square, piece, isLight, isSelected, isPossibleMove, onClick }: SquareProps) {
  const baseColor = isLight ? "bg-amber-100" : "bg-amber-800"
  const hoverColor = isLight ? "hover:bg-amber-200" : "hover:bg-amber-700"

  let additionalClasses = ""
  if (isSelected) {
    additionalClasses = "ring-4 ring-blue-400 ring-inset"
  } else if (isPossibleMove) {
    // Different styling for capture vs normal move
    if (piece) {
      additionalClasses = "ring-4 ring-red-400 ring-inset" // Red ring for captures
    } else {
      additionalClasses = "ring-4 ring-green-400 ring-inset" // Green ring for normal moves
    }
  }

  return (
    <div
      className={`
        w-16 h-16 flex items-center justify-center cursor-pointer transition-all duration-200
        ${baseColor} ${hoverColor} ${additionalClasses}
        relative
      `}
      onClick={onClick}
    >
      {piece && (
        <div className={`text-4xl select-none ${isPossibleMove ? "animate-pulse" : ""}`}>{getPieceSymbol(piece)}</div>
      )}
      {isPossibleMove && !piece && <div className="w-4 h-4 bg-green-400 rounded-full opacity-60" />}
      {isPossibleMove && piece && <div className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full opacity-80" />}
    </div>
  )
}

function getPieceSymbol(piece: string): string {
  const symbols: { [key: string]: string } = {
    p: "♟",
    r: "♜",
    n: "♞",
    b: "♝",
    q: "♛",
    k: "♚",
    P: "♙",
    R: "♖",
    N: "♘",
    B: "♗",
    Q: "♕",
    K: "♔",
  }
  return symbols[piece] || ""
}
