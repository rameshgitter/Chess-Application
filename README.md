
# Chess Master ♔

A modern, feature-rich chess game built with Next.js 15, React, TypeScript, and Tailwind CSS. Play chess with a beautiful interface, complete game validation, move history, and captured pieces tracking.

<img width="1919" height="938" alt="chess" src="https://github.com/user-attachments/assets/d350e3d0-dcd5-4aff-b9f8-304b8d85b5fd" />

## ✨ Features

### 🎮 Complete Chess Experience
- **Full chess rules implementation** - All standard chess moves including castling, en passant, and pawn promotion
- **Move validation** - Powered by chess.js library for accurate game logic
- **Check, checkmate, and stalemate detection** - Proper game ending conditions
- **Draw detection** - Handles all draw scenarios (50-move rule, threefold repetition, insufficient material)

### 🎨 Beautiful User Interface
- **Modern design** - Clean, professional interface with gradient backgrounds
- **Responsive layout** - Works perfectly on desktop, tablet, and mobile devices
- **Visual feedback** - Clear indicators for selected pieces, possible moves, and captures
- **Smooth animations** - Hover effects and visual transitions for better UX

### 📊 Game Information & Tracking
- **Move history** - Complete game notation with proper chess symbols
- **Captured pieces display** - Visual representation of all captured pieces
- **Game status** - Real-time updates on check, turn, and game state
- **FEN notation** - Full game position in standard chess notation

### 🎯 Interactive Features
- **Piece selection** - Click to select pieces and see available moves
- **Move highlighting** - Green rings for valid moves, red rings for captures
- **Undo functionality** - Take back moves during the game
- **New game** - Reset and start fresh anytime

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/chess-master.git
   cd chess-master
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to start playing!

## 🎯 How to Play

### Basic Controls
1. **Select a piece** - Click on any of your pieces to see available moves
2. **Make a move** - Click on a highlighted square to move your piece
3. **Capture pieces** - Click on enemy pieces with red rings to capture them
4. **Deselect** - Click on the same piece again or an empty square to deselect

### Visual Indicators
- 🔵 **Blue ring** - Currently selected piece
- 🟢 **Green ring** - Valid move destination
- 🔴 **Red ring** - Enemy piece that can be captured
- 🟢 **Green dot** - Empty square you can move to

### Game Controls
- **New Game** - Start a fresh game
- **Undo Move** - Take back the last move (when available)

## 🏗️ Project Structure

```
chess-master/
├── app/
│   ├── components/
│   │   ├── ChessGame.tsx      # Main game logic and state management
│   │   ├── Chessboard.tsx     # Chess board rendering and interaction
│   │   ├── Square.tsx         # Individual square component
│   │   ├── GameInfo.tsx       # Game status and move history
│   │   └── GameControls.tsx   # Game control buttons
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/ui/             # shadcn/ui components
├── lib/
│   └── utils.ts               # Utility functions
├── public/                    # Static assets
├── README.md
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🛠️ Built With

### Core Technologies
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://reactjs.org/)** - UI library with hooks and modern features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### Chess Logic
- **[chess.js](https://github.com/jhlywa/chess.js)** - Chess game logic and validation
- **Unicode Chess Symbols** - Beautiful chess piece rendering

### UI Components
- **[shadcn/ui](https://ui.shadcn.com/)** - Modern React components
- **[Lucide React](https://lucide.dev/)** - Beautiful icons

## 🎨 Customization

### Changing Board Colors
Edit the colors in `components/Square.tsx`:
```typescript
const baseColor = isLight ? "bg-amber-100" : "bg-amber-800"
```

### Modifying Piece Symbols
Update the piece symbols in the `getPieceSymbol` function:
```typescript
const symbols: { [key: string]: string } = {
  p: "♟", r: "♜", n: "♞", b: "♝", q: "♛", k: "♚",
  P: "♙", R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔",
}
```

### Adding Themes
Create theme variants in your Tailwind config or add CSS custom properties for dynamic theming.

## 🔧 Advanced Features

### FEN Support
The game supports full FEN (Forsyth-Edwards Notation) for:
- Position setup
- Game state saving/loading
- Position analysis

### Move Validation
All moves are validated using chess.js including:
- Legal piece movement
- Check/checkmate prevention
- Castling rights
- En passant captures
- Pawn promotion

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with zero configuration

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain component modularity
- Add proper error handling
- Write descriptive commit messages

## 🐛 Known Issues & Limitations

- Pawn promotion currently defaults to Queen (manual promotion UI coming soon)
- No time controls implemented yet
- Single-device play only (online multiplayer planned)

## 📋 Roadmap

### Upcoming Features
- [ ] **AI Opponent** - Play against computer with different difficulty levels
- [ ] **Online Multiplayer** - Real-time games with other players
- [ ] **Time Controls** - Chess clocks and timed games
- [ ] **Game Analysis** - Move evaluation and suggestions
- [x] **Custom Themes** - Multiple board and piece themes
- [x] **Sound Effects** - Audio feedback for moves and captures
- [ ] **Move Animations** - Smooth piece movement animations
- [ ] **Game Database** - Save and load games
- [ ] **Opening Book** - Opening move suggestions
- [ ] **Puzzle Mode** - Chess tactics and puzzles

### Technical Improvements
- [ ] PWA support for offline play
- [ ] Performance optimizations
- [ ] Accessibility improvements
- [ ] Mobile app version
- [ ] Tournament mode

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **chess.js** - For providing excellent chess game logic
- **shadcn/ui** - For beautiful, accessible UI components
- **Vercel** - For amazing deployment platform
- **Chess community** - For inspiration and feedback

## 📞 Support

If you encounter any issues or have questions:

1. **Check existing issues** on GitHub
2. **Create a new issue** with detailed description
3. **Join discussions** in the repository
4. **Contact** via email or social media

---

**Made with ♥️ by Ramesh**

*Enjoy playing chess! ♔♕♖♗♘♙*
```
Special Mention to V0.dev for making this sucessful
