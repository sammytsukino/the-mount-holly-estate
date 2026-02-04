# The Mount Holly Estate - A Blueprint Adventure

![Logo](https://res.cloudinary.com/dsy30p7gf/image/upload/v1770241415/header-game_rs5nay.png)


A command-line puzzle game where you navigate the ever-shifting halls of Mt. Holly Estate as the Crown-Bearer, seeking Room 46—the Antechamber where rightful heirs claim their inheritance.

## About

Mount Holly Estate is an interactive blueprint navigation game inspired by "Blue Prince." The mansion is a living entity that shifts with every command you type. Red rooms materialize randomly as you move, completely blocking your path and forcing you to adapt your strategy in real-time.

Your goal: Navigate from the entrance hall at position (1,3) to Room 46 at position (9,3) without getting trapped by the mansion's shifting walls.

## Screenshots

### Home Screen - Blueprint Briefing
![Home Screen](https://res.cloudinary.com/dsy30p7gf/image/upload/v1770241680/Safari_Browser_2_hilxb4.png)
*The landing page displays mission briefing, available commands, and game mechanics*

### Game Interface - Estate Map & Terminal
![Game Interface](https://res.cloudinary.com/dsy30p7gf/image/upload/v1770212987/Safari_Browser_bivpjq.png)
*Active gameplay showing the 5x9 estate map, crown position, red blocking rooms, and terminal interface*

## Game Mechanics

### The Board

- 5x9 grid representing Mt. Holly Estate
- Grid wraps at edges (moving north from row 9 takes you to row 1, etc.)
- Coordinates displayed as (row, column)

### The Crown-Bearer

- Represented by a rotating crown icon
- Can face four directions: NORTH, EAST, SOUTH, WEST
- Moves forward one space at a time in the current facing direction
- Visited cells leave a subtle illuminated trail on the blueprint

### Red Rooms

- Appear randomly as you navigate
- Completely block passage
- Cannot be removed once placed
- Force strategic route planning

### Victory Condition

Reach Room 46 (position 9,3) to complete your inheritance claim and become the rightful heir to the Estate and all of Orindia.

## Commands

All commands are case-insensitive and entered via the terminal interface.

### Navigation Commands

- `MOVE` - Move the Crown-Bearer one space forward in the current facing direction
- `LEFT` - Rotate 90 degrees counterclockwise
- `RIGHT` - Rotate 90 degrees clockwise

### Information Commands

- `REPORT` - Display current position, facing direction, and objective status

### Room Management

- `PLACE_ROOM row,col,RED` - Pre-emptively mark a position as a red blocking room
  - Example: `PLACE_ROOM 3,2,RED`

### Session Management

- `RESET` - Clear the board and start a new session (increments session number)

## Technology Stack

### Core

- React 19.2.0
- React Router DOM 7.12.0
- Vite 7.2.4

### Styling

- Tailwind CSS 3.4.19
- PostCSS 8.5.6
- Autoprefixer 10.4.23
- Custom blueprint aesthetic with grid backgrounds and glowing effects

### UI Enhancements

- SweetAlert2 11.26.17 for victory notifications

## Installation

### Prerequisites

- Node.js (version 16 or higher recommended)
- npm or yarn package manager

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd toy-robot-main
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint code quality checks

## Project Structure

```
mount-holly-estate/
├── src/
│   ├── components/
│   │   ├── Board.jsx          # Game board rendering with crown and rooms
│   │   ├── CommandInput.jsx   # Terminal command input interface
│   │   └── StatusReport.jsx   # Real-time status feedback display
│   ├── views/
│   │   ├── Home.jsx           # Landing page with game briefing
│   │   └── Game.jsx           # Main game logic and UI
│   ├── router/
│   │   └── Router.jsx         # React Router configuration
│   ├── main.jsx               # Application entry point
│   └── index.css              # Blueprint theme and global styles
├── index.html                 # HTML template
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
├── vite.config.js             # Vite bundler configuration
└── package.json               # Project dependencies and scripts
```

## Accessibility

The interface includes several accessibility improvements based on ARIA and WCAG 2.1 AA:

- Semantic HTML structure with `<main>`, `<header>`, `<section>`, `<footer>` and descriptive headings
- ARIA roles and labels on the board (`role="grid"` / `role="gridcell"`) and status areas (`role="status"`, `aria-live="polite"`)
- Accessible labels and descriptions for command inputs and buttons (`aria-label`, `aria-describedby`)
- Decorative elements (icons, coordinate labels, separators) hidden from screen readers using `aria-hidden`
- Sufficient color contrast in both blueprint UI and terminal, and full keyboard operability for all interactive elements

## Design Philosophy

### Blueprint Aesthetic

The entire interface follows a blueprint design language:
- Deep blue background (#2d5a8c) with subtle white grid lines
- White borders with inner/outer glow effects
- Monospace typography (Courier New)
- Outline text for major headings
- Amber gold accents for victory states

### Terminal Integration

Terminal section uses classic green-on-black terminal styling to contrast with the blueprint theme, emphasizing the command-line nature of the interaction.

### User Experience

- Real-time visual feedback on all actions
- Visited cells leave illuminated trails
- Smooth crown rotation animations
- Responsive grid-based layout
- Session tracking with incrementing numbers

## Game Strategy Tips

1. **Plan Ahead**: Study the board before making moves
2. **Use PLACE_ROOM**: Pre-emptively block paths you know will spawn red rooms
3. **Watch the Pattern**: Red rooms spawn randomly but at regular intervals
4. **Keep Moving**: The mansion changes its mind: don't hesitate
5. **Learn from Failure**: Use RESET to try new approaches with different strategies

## Inspiration

This game is inspired by "Blue Prince" by Dogubomb, a puzzle game about navigating impossible architecture where the mansion redraws itself with every move.

## License

This project is a educational implementation created as a school assignment.

## Credits

- Game concept inspired by "Blue Prince"
- Built with React and Tailwind CSS
- Blueprint aesthetic and narrative by project team

Made with lots of love by SAMMYTSUKINO ~
