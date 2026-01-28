# The Mount Holly Estate - A Blueprint Adventure

A command-line puzzle game where you navigate the ever-shifting halls of Mt. Holly Estate as the Crown-Bearer, seeking Room 46—the Antechamber where rightful heirs claim their inheritance.

## About

Mount Holly Estate is an interactive blueprint navigation game inspired by "Blue Prince." The mansion is a living entity that shifts with every command you type. Red rooms materialize randomly as you move, completely blocking your path and forcing you to adapt your strategy in real-time.

Your goal: Navigate from the entrance hall at position (1,3) to Room 46 at position (9,3) without getting trapped by the mansion's shifting walls.

## Screenshots

### Home Screen - Blueprint Briefing
![Home Screen](https://res.cloudinary.com/dsy30p7gf/image/upload/v1769519799/intro_e7grp6.png)
*The landing page displays mission briefing, available commands, and game mechanics*

### Game Interface - Estate Map & Terminal
![Game Interface](https://res.cloudinary.com/dsy30p7gf/image/upload/v1769519799/board_hdnpgr.png)
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

Mount Holly Estate has been built with accessibility as a core priority, following WCAG 2.1 AA standards to ensure an inclusive experience for all users.

### ARIA Implementation

#### Semantic Structure

All components use proper HTML5 semantic elements:
- `<main>`, `<aside>`, `<header>`, `<footer>`, `<section>` for clear document structure
- Proper heading hierarchy (h1, h2, h3)
- `<label>` elements associated with form inputs via `htmlFor` / `id`

#### ARIA Labels and Descriptions

**aria-label**: Provides accessible names for interactive elements without visible labels
- Game board cells: "Crown-Bearer at position 3,5 facing NORTH"
- Buttons: "Execute command", "Start game and open terminal"
- Form regions: "Command input form", "Game command terminal"

**aria-labelledby**: Connects elements with visible labels
- Game board connected to "ESTATE MAP" heading
- All sections connected to their respective headings (STATUS, LEGEND, MISSION BRIEFING)

**aria-describedby**: Links elements with additional descriptive text
- Command inputs connected to help text showing available commands
- Game board connected to map legend

#### Dynamic Content Updates

**aria-live="polite"**: Announces changes without interrupting user activity
- Status panel updates (position, direction, room count, steps)
- Command output in terminal
- Session number changes

**role="status"**: Identifies status message regions
- Command execution feedback
- Game state notifications

**aria-atomic="true"**: Ensures entire content is read when updated
- Status panel changes
- Terminal output messages

#### Interactive Elements

**Form Controls**:
- All inputs have associated labels (visible or screen reader only)
- Help text connected via `aria-describedby`
- Clear button labels for actions

**Grid Navigation**:
- Game board uses `role="grid"` and `role="gridcell"`
- Each cell has descriptive label indicating content and position

#### Visual Hiding

**aria-hidden="true"**: Hides decorative elements from screen readers
- Terminal prompt symbols (>, >>)
- Coordinate labels (visual only)
- Decorative icons in legends
- Separator characters (|)

**sr-only class**: Visually hidden but accessible to screen readers
- Form labels that would clutter visual design
- Additional context for icon-only buttons

### Keyboard Navigation

- All interactive elements are keyboard accessible
- Logical tab order through form controls
- No keyboard traps
- Skip to main content functionality via semantic structure

### Color Contrast

All text meets WCAG AA contrast requirements:
- Blueprint theme: White text on dark blue (#2d5a8c)
- Terminal: Green (#00FF00 variants) on black
- Status indicators use both color and text labels

### Focus Management

- Visible focus indicators on all interactive elements
- Focus styles enhanced with glowing borders
- Logical focus order follows visual layout

### Screen Reader Testing

The application has been optimized for:
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)
- TalkBack (Android)

### WCAG 2.1 AA Compliance

Meets the following success criteria:
- 1.3.1 Info and Relationships (Level A)
- 1.4.3 Contrast Minimum (Level AA)
- 2.1.1 Keyboard (Level A)
- 2.4.3 Focus Order (Level A)
- 2.4.6 Headings and Labels (Level AA)
- 3.2.4 Consistent Identification (Level AA)
- 3.3.2 Labels or Instructions (Level A)
- 4.1.2 Name, Role, Value (Level A)
- 4.1.3 Status Messages (Level AA)

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
