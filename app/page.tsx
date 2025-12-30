"use client"

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const ChessGame = dynamic(() => import('./components/ChessGame'), {
  ssr: false,
  loading: () => <div className="text-white text-center">Loading Chess...</div>
})

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 p-4" suppressHydrationWarning>
      <div className="container mx-auto" suppressHydrationWarning>
        <h1 className="text-4xl font-bold text-white text-center mb-8">Chess Master</h1>
        <ChessGame />
      </div>
    </div>
  )
}
