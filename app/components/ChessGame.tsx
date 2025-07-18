"use client"

import { useState, useCallback } from "react"
import { Chess, type Square as ChessSquare } from "chess.js"
import Chessboard from "./Chessboard"
import GameInfo from "./GameInfo"
import GameControls from "./GameControls"

export default function ChessGame() {
  const [game, setGame] = useState(new Chess())
  const [selectedSquare, setSelectedSquare] = useState<ChessSquare | null>(null)
  const [possibleMoves, setPossibleMoves] = useState<ChessSquare[]>([])
  const [moveHistory, setMoveHistory] = useState<string[]>([])

  const makeMove = useCallback(
    (from: ChessSquare, to: ChessSquare) => {
      try {
        const gameCopy = new Chess(game.fen())

        // Check if there's a piece at the destination (capture)
        const targetPiece = gameCopy.get(to)
        const movingPiece = gameCopy.get(from)

        // Attempt the move with automatic queen promotion for pawns
        const move = gameCopy.move({
          from,
          to,
          promotion: "q", // Always promote to queen for simplicity
        })

        if (move) {
          setGame(gameCopy)

          // Create move notation with capture indicator
          const moveNotation = move.san
          if (move.captured) {
            console.log(`${movingPiece?.type} captures ${move.captured} on ${to}`)
          }

          setMoveHistory((prev) => [...prev, moveNotation])
          setSelectedSquare(null)
          setPossibleMoves([])
          return true
        } else {
          console.log("Invalid move attempted")
        }
      } catch (error) {
        console.error("Move error:", error)
      }
      return false
    },
    [game],
  )

  const getCapturedPieces = useCallback(() => {
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
        const square = `${file}${rank}` as ChessSquare
        const piece = game.get(square)
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
  }, [game])

  const handleSquareClick = useCallback(
    (square: ChessSquare) => {
      if (selectedSquare) {
        if (selectedSquare === square) {
          // Deselect if clicking the same square
          setSelectedSquare(null)
          setPossibleMoves([])
        } else if (possibleMoves.includes(square)) {
          // Make move if it's a valid destination
          makeMove(selectedSquare, square)
        } else {
          // Select new piece if it belongs to current player
          const piece = game.get(square)
          if (piece && piece.color === game.turn()) {
            setSelectedSquare(square)
            setPossibleMoves(game.moves({ square, verbose: true }).map((move) => move.to))
          } else {
            setSelectedSquare(null)
            setPossibleMoves([])
          }
        }
      } else {
        // Select piece if it belongs to current player
        const piece = game.get(square)
        if (piece && piece.color === game.turn()) {
          setSelectedSquare(square)
          setPossibleMoves(game.moves({ square, verbose: true }).map((move) => move.to))
        }
      }
    },
    [selectedSquare, possibleMoves, game, makeMove],
  )

  const resetGame = useCallback(() => {
    setGame(new Chess())
    setSelectedSquare(null)
    setPossibleMoves([])
    setMoveHistory([])
  }, [])

  const undoMove = useCallback(() => {
    const gameCopy = new Chess(game.fen())
    gameCopy.undo()
    setGame(gameCopy)
    setMoveHistory((prev) => prev.slice(0, -1))
    setSelectedSquare(null)
    setPossibleMoves([])
  }, [game])

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
      <div className="flex flex-col items-center">
        <Chessboard
          position={game.fen()}
          selectedSquare={selectedSquare}
          possibleMoves={possibleMoves}
          onSquareClick={handleSquareClick}
          orientation="white"
        />
        <GameControls onReset={resetGame} onUndo={undoMove} canUndo={moveHistory.length > 0} />
      </div>
      <GameInfo game={game} moveHistory={moveHistory} currentPlayer={game.turn() === "w" ? "White" : "Black"} />
    </div>
  )
}
