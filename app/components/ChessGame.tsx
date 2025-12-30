"use client"

import { useState, useCallback } from "react"
import { Chess, type Square as ChessSquare } from "chess.js"
import Chessboard from "./Chessboard"
import GameInfo from "./GameInfo"
import GameControls from "./GameControls"

import { soundManager } from "@/lib/sounds"

export default function ChessGame() {
  const [game, setGame] = useState(new Chess())
  const [selectedSquare, setSelectedSquare] = useState<ChessSquare | null>(null)
  const [possibleMoves, setPossibleMoves] = useState<ChessSquare[]>([])
  const [moveHistory, setMoveHistory] = useState<string[]>([])
  const [theme, setTheme] = useState<"classic" | "glass" | "modern">("glass") // Default to premium glass theme

  const makeMove = useCallback(
    (from: ChessSquare, to: ChessSquare) => {
      try {
        const gameCopy = new Chess()
        gameCopy.loadPgn(game.pgn())

        // Check if there's a piece at the destination (capture)
        const targetPiece = gameCopy.get(to)

        // Attempt the move with automatic queen promotion for pawns
        const move = gameCopy.move({
          from,
          to,
          promotion: "q", // Always promote to queen for simplicity
        })

        if (move) {
          setGame(gameCopy)

          // Play appropriate sound
          if (gameCopy.isCheckmate()) {
            soundManager.playCheck(); // Using check sound for game end for now or could add separate
          } else if (gameCopy.isCheck()) {
            soundManager.playCheck();
          } else if (move.captured) {
            soundManager.playCapture();
          } else if (move.flags.includes('k') || move.flags.includes('q')) { // Castling
            soundManager.playCastle();
          } else {
            soundManager.playMove();
          }

          // Create move notation with capture indicator
          const moveNotation = move.san

          setMoveHistory((prev: string[]) => [...prev, moveNotation])
          setSelectedSquare(null)
          setPossibleMoves([])
          return true
        }
      } catch (error) {
        console.error("Move error:", error)
      }
      return false
    },
    [game],
  )
  const handleSquareClick = useCallback(
    (square: ChessSquare) => {
      if (selectedSquare) {
        if (selectedSquare === square) {
          setSelectedSquare(null)
          setPossibleMoves([])
        } else if (possibleMoves.includes(square)) {
          makeMove(selectedSquare, square)
        } else {
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
    soundManager.playMove() // Sound for reset
  }, [])

  const undoMove = useCallback(() => {
    const gameCopy = new Chess()
    gameCopy.loadPgn(game.pgn())
    gameCopy.undo()
    setGame(gameCopy)
    setMoveHistory((prev: string[]) => prev.slice(0, -1))
    setSelectedSquare(null)
    setPossibleMoves([])
    soundManager.playMove() // Sound for undo
  }, [game])

  return (
    <div className={`flex flex-col lg:flex-row gap-8 items-start justify-center p-8 rounded-xl transition-colors duration-500 ${theme === 'glass' ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-md border border-white/10' : ''}`}>
      <div className="flex flex-col items-center">
        <Chessboard
          position={game.fen()}
          selectedSquare={selectedSquare}
          possibleMoves={possibleMoves}
          onSquareClick={handleSquareClick}
          orientation="white"
          theme={theme}
        />
        <GameControls
          onReset={resetGame}
          onUndo={undoMove}
          canUndo={moveHistory.length > 0}
          theme={theme}
          onThemeChange={setTheme}
        />
      </div>
      <GameInfo
        game={game}
        moveHistory={moveHistory}
        currentPlayer={game.turn() === "w" ? "White" : "Black"}
        theme={theme}
      />
    </div>
  )
}
