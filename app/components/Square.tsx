"use client"

import type { Square as ChessSquare } from "chess.js"

import { getPieceComponent } from "./Pieces"

interface SquareProps {
  square: ChessSquare
  piece: string | null
  isLight: boolean
  isSelected: boolean
  isPossibleMove: boolean
  onClick: () => void
  theme?: "classic" | "glass" | "modern"
}

export default function Square({ square, piece, isLight, isSelected, isPossibleMove, onClick, theme = "classic" }: SquareProps) {
  const getThemeColors = () => {
    switch (theme) {
      case "glass":
        return isLight ? "bg-white/20 backdrop-blur-md" : "bg-black/40 backdrop-blur-md"
      case "modern":
        return isLight ? "bg-indigo-200" : "bg-indigo-600"
      default:
        return isLight ? "bg-[#e8ebef]" : "bg-[#7d8796]"
    }
  }

  const baseColor = getThemeColors()

  let additionalClasses = ""
  if (isSelected) {
    additionalClasses = "ring-4 ring-yellow-400 ring-inset shadow-[0_0_15px_rgba(250,204,21,0.6)] z-10"
  } else if (isPossibleMove) {
    if (piece) {
      // Capture target
      additionalClasses = "after:content-[''] after:absolute after:inset-0 after:ring-4 after:ring-red-500/70 after:ring-inset"
    } else {
      // Move target
      additionalClasses = ""
    }
  }

  const PieceComponent = piece ? getPieceComponent(piece, piece === piece.toUpperCase() ? 'white' : 'black') : null

  return (
    <div
      className={`
        w-full h-full aspect-square flex items-center justify-center cursor-pointer relative
        ${baseColor} ${additionalClasses}
        transition-all duration-200
      `}
      onClick={onClick}
    >
      {PieceComponent && (
        <div className={`w-[85%] h-[85%] transition-transform duration-200 ${isPossibleMove && piece ? "scale-110" : ""}`}>
          <PieceComponent side={piece === piece.toUpperCase() ? 'white' : 'black'} className="w-full h-full drop-shadow-lg" />
        </div>
      )}

      {isPossibleMove && !piece && (
        <div className={`w-[25%] h-[25%] rounded-full ${theme === 'glass' ? "bg-white/40" : "bg-black/20"}`} />
      )}

      {/* Highlight overlay on hover */}
      <div className="absolute inset-0 hover:bg-white/10 transition-colors duration-150 pointer-events-none" />
    </div>
  )
}
