"use client"

import type { Square as ChessSquare } from "chess.js"
import Square from "./Square"

interface ChessboardProps {
  position: string
  selectedSquare: ChessSquare | null
  possibleMoves: ChessSquare[]
  onSquareClick: (square: ChessSquare) => void
  orientation: "white" | "black"
  theme?: "classic" | "glass" | "modern"
}

export default function Chessboard({
  position,
  selectedSquare,
  possibleMoves,
  onSquareClick,
  orientation,
  theme = "classic",
}: ChessboardProps) {
  const files =
    orientation === "white" ? ["a", "b", "c", "d", "e", "f", "g", "h"] : ["h", "g", "f", "e", "d", "c", "b", "a"]
  const ranks =
    orientation === "white" ? ["8", "7", "6", "5", "4", "3", "2", "1"] : ["1", "2", "3", "4", "5", "6", "7", "8"]

  // Parse FEN to get piece positions
  const fenParts = position.split(" ")
  const boardState = fenParts[0]
  const rows = boardState.split("/")

  const getPieceAt = (file: string, rank: string): string | null => {
    const fileIndex = ["a", "b", "c", "d", "e", "f", "g", "h"].indexOf(file)
    const rankIndex = Number.parseInt(rank) - 1
    const rowIndex = 7 - rankIndex
    const row = rows[rowIndex]

    let colIndex = 0
    for (let i = 0; i < row.length; i++) {
      const char = row[i]
      if (isNaN(Number.parseInt(char))) {
        if (colIndex === fileIndex) {
          return char
        }
        colIndex++
      } else {
        const emptySquares = Number.parseInt(char)
        if (fileIndex >= colIndex && fileIndex < colIndex + emptySquares) {
          return null
        }
        colIndex += emptySquares
      }
    }
    return null
  }

  const getBoardStyles = () => {
    switch (theme) {
      case 'glass':
        return 'border-4 border-white/30 rounded-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-sm'
      case 'modern':
        return 'border-4 border-indigo-900 rounded-lg shadow-2xl'
      default:
        return 'border-8 border-[#5c4033] rounded-sm shadow-xl'
    }
  }

  return (
    <div className="relative select-none">
      <div className="flex">
        {/* Rank labels (1-8) */}
        <div className="flex flex-col justify-center mr-2">
          {ranks.map((rank) => (
            <div key={rank} className={`w-6 h-12 sm:h-16 flex items-center justify-center font-bold text-sm ${theme === 'glass' ? 'text-white/80' : 'text-slate-200'}`}>
              {rank}
            </div>
          ))}
        </div>

        {/* Chess board */}
        <div className={`grid grid-cols-8 w-[80vw] h-[80vw] max-w-[400px] max-h-[400px] sm:max-w-[512px] sm:max-h-[512px] overflow-hidden ${getBoardStyles()}`}>
          {ranks.map((rank, rankIndex) =>
            files.map((file, fileIndex) => {
              const square = `${file}${rank}` as ChessSquare
              const piece = getPieceAt(file, rank)
              const isLight = (rankIndex + fileIndex) % 2 === 0
              const isSelected = square === selectedSquare
              const isPossibleMove = possibleMoves.includes(square)

              return (
                <Square
                  key={square}
                  square={square}
                  piece={piece}
                  isLight={isLight}
                  isSelected={isSelected}
                  isPossibleMove={isPossibleMove}
                  onClick={() => onSquareClick(square)}
                  theme={theme}
                />
              )
            }),
          )}
        </div>

        {/* Rank labels (1-8) on right */}
        <div className="flex flex-col justify-center ml-2">
          {ranks.map((rank) => (
            <div key={rank} className={`w-6 h-12 sm:h-16 flex items-center justify-center font-bold text-sm ${theme === 'glass' ? 'text-white/80' : 'text-slate-200'}`}>
              {rank}
            </div>
          ))}
        </div>
      </div>

      {/* File labels (a-h) at bottom */}
      <div className="flex justify-center mt-2 ml-8 mr-8">
        {files.map((file) => (
          <div key={file} className={`w-12 sm:w-16 h-6 flex items-center justify-center font-bold text-sm ${theme === 'glass' ? 'text-white/80' : 'text-slate-200'}`}>
            {file}
          </div>
        ))}
      </div>
    </div>
  )
}

