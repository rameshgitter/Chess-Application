import ChessGame from "./components/ChessGame"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Chess Master</h1>
        <ChessGame />
      </div>
    </div>
  )
}
