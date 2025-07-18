"use client"

import { Button } from "@/components/ui/button"

interface GameControlsProps {
  onReset: () => void
  onUndo: () => void
  canUndo: boolean
}

export default function GameControls({ onReset, onUndo, canUndo }: GameControlsProps) {
  return (
    <div className="flex gap-4 mt-6">
      <Button onClick={onReset} variant="destructive" className="px-6 py-2">
        New Game
      </Button>
      <Button onClick={onUndo} disabled={!canUndo} variant="outline" className="px-6 py-2 bg-transparent">
        Undo Move
      </Button>
    </div>
  )
}
