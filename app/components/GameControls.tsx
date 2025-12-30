"use client"

import { Button } from "@/components/ui/button"

interface GameControlsProps {
  onReset: () => void
  onUndo: () => void
  canUndo: boolean
  theme: "classic" | "glass" | "modern"
  onThemeChange: (theme: "classic" | "glass" | "modern") => void
}

export default function GameControls({ onReset, onUndo, canUndo, theme, onThemeChange }: GameControlsProps) {
  return (
    <div className="flex flex-col gap-4 mt-6 w-full max-w-xs">
      <div className="flex gap-4 w-full">
        <Button
          onClick={onReset}
          variant="destructive"
          className="flex-1 px-4 py-2 hover:scale-105 transition-transform shadow-lg"
        >
          New Game
        </Button>
        <Button
          onClick={onUndo}
          disabled={!canUndo}
          variant="outline"
          className={`flex-1 px-4 py-2 hover:scale-105 transition-transform ${theme === 'glass' ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : 'bg-white'}`}
        >
          Undo
        </Button>
      </div>

      <div className={`flex p-1 rounded-lg ${theme === 'glass' ? 'bg-black/30' : 'bg-gray-200'}`}>
        {(['classic', 'glass', 'modern'] as const).map((t) => (
          <button
            key={t}
            onClick={() => onThemeChange(t)}
            className={`flex-1 py-1.5 text-sm rounded-md capitalize transition-all ${theme === t ? 'bg-white text-black shadow-sm font-medium' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  )
}
