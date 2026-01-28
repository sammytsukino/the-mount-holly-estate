import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="min-h-screen blueprint-bg flex items-center justify-center p-8">
            <main className="blueprint-border bg-blueprint-dark/30 backdrop-blur-sm p-12 max-w-4xl" role="main">
                <div className="flex justify-between mb-4 text-white/50 text-sm font-mono" aria-hidden="true">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                </div>

                <header className="text-center mb-8">
                    <h1 className="blueprint-outline-text text-6xl mb-2 tracking-wider">
                        MOUNT HOLLY ESTATE
                    </h1>
                    <h2 className="blueprint-text text-4xl mb-6">
                        BLUEPRINT
                    </h2>
                </header>

                <section className="blueprint-border bg-blueprint-dark/20 p-8 mb-6" aria-labelledby="game-description">
                    <p id="game-description" className="blueprint-text text-lg mb-6 leading-relaxed">
                        Mt. Holly Estate is no ordinary mansion: it shifts with every command you type. 
                        As Crown-Bearer, you trace a living blueprint through its ever-changing halls, 
                        seeking Room 46: the Antechamber where rightful heirs claim their inheritance.
                    </p>
                    
                    <p className="blueprint-text text-base mb-6 leading-relaxed text-white/90">
                        But the mansion tests you. Red rooms materialize randomly as you navigate, 
                        blocking entire corridors. These obstacles force you to recalculate your route 
                        or use PLACE_ROOM to pre-emptively mark danger zones. The blueprint updates 
                        in real-time, showing your path, blocked rooms, and the glowing target.
                    </p>

                    <div className="blueprint-border bg-blueprint-dark/30 p-4 mb-6" role="region" aria-labelledby="game-objectives">
                        <p id="game-objectives" className="blueprint-text text-sm mb-3">
                            <span className="text-white/70">SPAWN:</span> 1,3 
                            <span className="mx-4">|</span>
                            <span className="text-white/70">TARGET:</span> Room 46 at 9,3
                        </p>
                        <p className="blueprint-text text-sm mb-3">
                            <span className="text-amber-400/90">OBJECTIVE:</span> Navigate from spawn to Room 46 without hitting blocked rooms
                        </p>
                        <p className="blueprint-text text-sm">
                            <span className="text-red-400/90">WARNING:</span> Red rooms completely block passage—plan ahead or reset
                        </p>
                    </div>

                    <div className="blueprint-text text-sm">
                        <h3 id="commands-heading" className="text-white/70 mb-2 font-bold">AVAILABLE COMMANDS:</h3>
                        <ul className="grid grid-cols-2 gap-2 text-white/80 list-none" role="list" aria-labelledby="commands-heading">
                            <li>• <span className="text-white">PLACE_ROOM X,Y,RED</span> - Mark a red blocking room</li>
                            <li>• <span className="text-white">MOVE</span> - Advance one space forward</li>
                            <li>• <span className="text-white">LEFT</span> - Rotate 90° counterclockwise</li>
                            <li>• <span className="text-white">RIGHT</span> - Rotate 90° clockwise</li>
                            <li>• <span className="text-white">REPORT</span> - Show current position & facing</li>
                            <li>• <span className="text-white">RESET</span> - Clear the board, start fresh</li>
                        </ul>
                    </div>
                </section>

                <div className="text-center">
                    <Link to="/game">
                        <button 
                            className="blueprint-border bg-blueprint-light/20 hover:bg-blueprint-light/40 blueprint-text px-12 py-4 text-xl font-bold tracking-wider transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                            aria-label="Start game and open terminal"
                        >
                            OPEN TERMINAL
                        </button>
                    </Link>
                </div>

                <footer className="flex justify-between items-center mt-8 text-white/50 text-sm font-mono" aria-label="Game information">
                    <span>LEVEL 01</span>
                    <span className="text-2xl italic" style={{ fontFamily: 'cursive' }} aria-label="Day One">Day One</span>
                </footer>
            </main>
        </div>
    );
}