import { useState } from 'react'
import Square from './Square'

interface ChessboardProps {
  position: string
  onMove: (move: { from: string; to: string }) => void
}

export default function Chessboard({ position, onMove }: ChessboardProps) {
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null)

  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1']
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

  const pieces = position.split(' ')[0].split('/')

  const handleSquareClick = (square: string) => {
    if (selectedSquare) {
      onMove({ from: selectedSquare, to: square })
      setSelectedSquare(null)
    } else {
      setSelectedSquare(square)
    }
  }

  return (
    <div className="grid grid-cols-8 w-96 h-96 border-2 border-gray-800">
      {ranks.map((rank, rankIndex) =>
        files.map((file, fileIndex) => {
          const square = `${file}${rank}`
          const piece = pieces[rankIndex][fileIndex]
          const isLight = (rankIndex + fileIndex) % 2 === 0

          return (
            <Square
              key={square}
              isLight={isLight}
              piece={piece}
              selected={square === selectedSquare}
              onClick={() => handleSquareClick(square)}
            />
          )
        })
      )}
    </div>
  )
}
