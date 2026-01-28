import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Board from "../components/Board";
import Swal from "sweetalert2";

const DIRECTIONS = ["NORTH", "EAST", "SOUTH", "WEST"];
const ROOM_COLORS = ["RED"];
const BOARD_WIDTH = 5;
const BOARD_HEIGHT = 9;
const START_COL = 3;
const START_ROW = 1;
const GOAL_COL = 3;
const GOAL_ROW = 9;
const GOAL_NAME = "Room 46";

function isGoalReachableFrom(startRow, startCol, blockedRooms) {
    const wrap = (value, max) => {
        if (value < 1) return max;
        if (value > max) return 1;
        return value;
    };
    const key = (row, col) => `${row},${col}`;
    const blockedSet = new Set(blockedRooms.map((room) => key(room.row, room.col)));

    const startKey = key(startRow, startCol);
    const goalKey = key(GOAL_ROW, GOAL_COL);
    if (blockedSet.has(startKey) || blockedSet.has(goalKey)) return false;

    const queue = [{ row: startRow, col: startCol }];
    const visited = new Set([startKey]);

    while (queue.length) {
        const { row, col } = queue.shift();
        if (row === GOAL_ROW && col === GOAL_COL) return true;

        const neighbors = [
            { row: wrap(row + 1, BOARD_HEIGHT), col },
            { row: wrap(row - 1, BOARD_HEIGHT), col },
            { row, col: wrap(col + 1, BOARD_WIDTH) },
            { row, col: wrap(col - 1, BOARD_WIDTH) },
        ];

        for (const n of neighbors) {
            const k = key(n.row, n.col);
            if (blockedSet.has(k) || visited.has(k)) continue;
            visited.add(k);
            queue.push(n);
        }
    }

    return false;
}

export default function Game() {
    const navigate = useNavigate();
    const [prince, setPrince] = useState({ row: START_ROW, col: START_COL, facing: "NORTH" });
    const [rooms, setRooms] = useState([]);
    const [report, setReport] = useState("");
    const [hasReachedGoal, setHasReachedGoal] = useState(false);
    const [stepsSinceLastRoom, setStepsSinceLastRoom] = useState(0);
    const [nextRoomInSteps, setNextRoomInSteps] = useState(() => 3 + Math.floor(Math.random() * 3));
    const [sessionNumber, setSessionNumber] = useState(1);
    const [visitedCells, setVisitedCells] = useState([{ row: START_ROW, col: START_COL }]);

    useEffect(() => {
        if (hasReachedGoal) {
            Swal.fire({
                html: `
                    <div style="font-family: 'Courier New', monospace; color: white; padding: 20px;">
                        <div style="text-align: center; margin-bottom: 25px;">
                            <h2 style="font-size: 32px; font-weight: bold; letter-spacing: 0.15em; color: rgba(251, 191, 36, 1); text-shadow: 0 0 20px rgba(251, 191, 36, 0.5); margin-bottom: 10px;">
                                ✦ THE ANTECHAMBER ✦
                            </h2>
                            <div style="font-size: 18px; color: rgba(251, 191, 36, 0.8); letter-spacing: 0.1em;">
                                ROOM 46
                            </div>
                        </div>
                        
                        <div style="border: 2px solid rgba(255, 255, 255, 0.3); padding: 20px; margin-bottom: 20px; background: rgba(45, 90, 140, 0.3);">
                            <p style="font-size: 15px; margin-bottom: 18px; line-height: 1.8; text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);">
                                Room 46 materializes before you. As you step through the threshold, 
                                the blueprint stills. The mansion exhales.
                            </p>
                            <p style="font-size: 15px; margin-bottom: 18px; line-height: 1.8; text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);">
                                Its shifting walls settle into permanence, acknowledging your arrival. 
                                The crown upon your head grows warm.
                            </p>
                            <p style="font-size: 15px; line-height: 1.8; text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);">
                                Mt. Holly Estate recognizes its heir.
                            </p>
                        </div>
                        
                        <div style="text-align: center; padding: 15px; border: 2px solid rgba(251, 191, 36, 0.5); background: rgba(251, 191, 36, 0.1); margin-bottom: 20px;">
                            <p style="font-size: 17px; font-weight: bold; color: rgba(251, 191, 36, 1); text-shadow: 0 0 15px rgba(251, 191, 36, 0.5);">
                                You are now the Crown-Bearer of Mt. Holly
                            </p>
                            <p style="font-size: 15px; margin-top: 8px; color: rgba(251, 191, 36, 0.9);">
                                Rightful Heir to the Estate and to all of Orindia
                            </p>
                        </div>
                        
                        <p style="font-size: 13px; text-align: center; color: rgba(255, 255, 255, 0.6); font-style: italic; letter-spacing: 0.05em; margin-bottom: 30px;">
                            The mansion is yours. The blueprint awaits your next draft.
                        </p>
                    </div>
                `,
                showConfirmButton: true,
                confirmButtonText: 'BEGIN NEW DRAFT',
                confirmButtonColor: 'transparent',
                background: '#2d5a8c',
                width: '700px',
                backdrop: 'rgba(0, 0, 0, 0.85)',
                allowOutsideClick: false,
                customClass: {
                    popup: 'blueprint-alert-popup',
                    confirmButton: 'blueprint-alert-button'
                }
            }).then(() => {
                navigate('/');
            });
        }
    }, [hasReachedGoal, navigate]);

    const maybeDropBlockingRoomOnNextStep = (nextRow, nextCol, currentRooms, upcomingStepsSinceLastRoom, currentPrince) => {
        if (upcomingStepsSinceLastRoom < nextRoomInSteps) return null;

        const isGoal = nextRow === GOAL_ROW && nextCol === GOAL_COL;
        const isSpawn = nextRow === START_ROW && nextCol === START_COL;
        const alreadyRoom = currentRooms.some((room) => room.row === nextRow && room.col === nextCol);
        if (isGoal || isSpawn || alreadyRoom) return null;

        const candidate = { row: nextRow, col: nextCol, color: ROOM_COLORS[Math.floor(Math.random() * ROOM_COLORS.length)] };
        const candidateRooms = [...currentRooms, candidate];

        const reachable = isGoalReachableFrom(currentPrince.row, currentPrince.col, candidateRooms);
        if (!reachable) return null;

        setStepsSinceLastRoom(0);
        setNextRoomInSteps(3 + Math.floor(Math.random() * 3));
        return candidate;
    };

    const handleCommand = (command) => {
        const trimmed = command.trim();
        if (!trimmed) return;
        const parts = trimmed.split(" ");
        const action = parts[0] ? parts[0].toUpperCase() : "";
        const args = parts[1] ? parts[1].split(",") : []; 

        switch (action) {
            case "PLACE_ROOM": {
                const [roomRow, roomCol, color] = args;
                const rr = parseInt(roomRow, 10);
                const rc = parseInt(roomCol, 10);
                const shade = color ? color.toUpperCase() : "";
                const isOnPrince = prince && prince.row === rr && prince.col === rc;
                const isGoal = rr === GOAL_ROW && rc === GOAL_COL;
                const alreadyPlaced = rooms.some((room) => room.row === rr && room.col === rc);
                const inBounds = rr >= 1 && rr <= BOARD_HEIGHT && rc >= 1 && rc <= BOARD_WIDTH;
                if (inBounds && ROOM_COLORS.includes(shade) && !isOnPrince && !isGoal && !alreadyPlaced) {
                    setRooms([...rooms, { row: rr, col: rc, color: shade }]);
                }
                break;
            }

            case "MOVE": {
                if (!prince) return;
                const { row: mr, col: mc, facing: mf } = prince;
                let newRow = mr;
                let newCol = mc;

                switch (mf) {
                    case "NORTH":
                        newRow = mr === BOARD_HEIGHT ? 1 : mr + 1;
                        break;
                    case "SOUTH":
                        newRow = mr === 1 ? BOARD_HEIGHT : mr - 1;
                        break;
                    case "EAST":
                        newCol = mc === BOARD_WIDTH ? 1 : mc + 1;
                        break;
                    case "WEST":
                        newCol = mc === 1 ? BOARD_WIDTH : mc - 1;
                        break;
                }

                const upcomingStepsSinceLastRoom = stepsSinceLastRoom + 1;
                const spawnedRoom = maybeDropBlockingRoomOnNextStep(
                    newRow,
                    newCol,
                    rooms,
                    upcomingStepsSinceLastRoom,
                    prince
                );
                if (spawnedRoom) {
                    setRooms([...rooms, spawnedRoom]);
                    setReport(`A ${spawnedRoom.color.toLowerCase()} room surfaces ahead, as if Mt. Holly changed its mind.`);
                    return;
                }

                const blocked = rooms.some((room) => room.row === newRow && room.col === newCol);
                if (!blocked) {
                    const updatedPrince = { row: newRow, col: newCol, facing: mf };
                    setPrince(updatedPrince);
                    setStepsSinceLastRoom(upcomingStepsSinceLastRoom);
                    setVisitedCells(prev => {
                        const alreadyVisited = prev.some(cell => cell.row === newRow && cell.col === newCol);
                        if (alreadyVisited) return prev;
                        return [...prev, { row: newRow, col: newCol }];
                    });
                    if (newRow === GOAL_ROW && newCol === GOAL_COL) {
                        setHasReachedGoal(true);
                        setReport(`You stand before ${GOAL_NAME}. For a moment, the blueprint feels still.`);
                    }
                } 
                break;
            }

            case "LEFT":
                if (!prince) return;
                setPrince({ ...prince, facing: DIRECTIONS[(DIRECTIONS.indexOf(prince.facing) + 3) % 4] });
                break;

            case "RIGHT":
                if (!prince) return;
                setPrince({ ...prince, facing: DIRECTIONS[(DIRECTIONS.indexOf(prince.facing) + 1) % 4] });
                break;

            case "REPORT":
                if (prince) {
                    const objective = `Objective: reach ${GOAL_NAME} at ${GOAL_ROW}, ${GOAL_COL}, before the house drafts you in.`;
                    const status = prince.row === GOAL_ROW && prince.col === GOAL_COL
                        ? `Status: Room 46 found.`
                        : `Status: still roaming the halls.`;
                    setReport(`Prince at ${prince.row}, ${prince.col}, facing ${prince.facing}. ${objective} ${status}`);
                }
                break;

            case "RESET":
                setPrince({ row: START_ROW, col: START_COL, facing: "NORTH" });
                setRooms([]);
                setReport("Session reset. The blueprint clears, ready for a new draft.");
                setHasReachedGoal(false);
                setStepsSinceLastRoom(0);
                setNextRoomInSteps(3 + Math.floor(Math.random() * 3));
                setSessionNumber(prev => prev + 1);
                setVisitedCells([{ row: START_ROW, col: START_COL }]);
                break;

            default:
                break;
        }
    };

    return (
        <div className="min-h-screen blueprint-bg flex items-center justify-center p-8">
            <main className="flex gap-8 max-w-[1800px]" role="main">
                <section className="flex-shrink-0" aria-label="Game board">
                    <Board prince={prince} rooms={rooms} goal={{ row: GOAL_ROW, col: GOAL_COL, name: GOAL_NAME }} visitedCells={visitedCells} />
                </section>

                <aside className="flex flex-col gap-5 w-[800px]" aria-label="Game information and controls">
                <header className="blueprint-border bg-blueprint-dark/30 p-5">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="blueprint-outline-text text-3xl leading-tight">
                                MT. HOLLY ESTATE
                            </h1>
                            <h2 className="blueprint-text text-lg">
                                Drafts of the Blue Prince
                            </h2>
                        </div>
                        <div className="text-right" aria-label="Current session number">
                            <div className="blueprint-text text-sm">SESSION</div>
                            <div className="text-white/70 text-2xl font-mono" aria-live="polite">#{sessionNumber.toString().padStart(3, '0')}</div>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-3 gap-5">
                    <section className="blueprint-border bg-blueprint-dark/30 p-5" role="status" aria-live="polite" aria-atomic="true" aria-labelledby="status-heading">
                        <h3 id="status-heading" className="blueprint-outline-text text-xl mb-4 text-center">STATUS</h3>
                        <div className="space-y-2 blueprint-text text-sm">
                            <div className="flex justify-between">
                                <span className="text-white/70">Pos:</span>
                                <span className="font-mono" aria-label={`Position ${prince.row} ${prince.col}`}>{prince.row},{prince.col}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/70">Dir:</span>
                                <span className="font-mono" aria-label={`Direction ${prince.facing}`}>{prince.facing[0]}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/70">Rooms:</span>
                                <span className="font-mono" aria-label={`${rooms.length} blocking rooms`}>{rooms.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/70">Steps:</span>
                                <span className="font-mono" aria-label={`${stepsSinceLastRoom} steps since last room`}>{stepsSinceLastRoom}</span>
                            </div>
                        </div>
                    </section>

                    <section className="blueprint-border bg-blueprint-dark/30 p-5" aria-labelledby="legend-heading">
                        <h3 id="legend-heading" className="blueprint-outline-text text-xl mb-4 text-center">LEGEND</h3>
                        <ul className="space-y-2.5 list-none" role="list">
                            <li className="flex items-center gap-3">
                                <div className="w-6 h-6 border border-white/60 bg-blueprint-light/50 flex items-center justify-center text-white text-sm" aria-hidden="true">
                                    ▲
                                </div>
                                <span className="blueprint-text text-sm">Prince</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-6 h-6 border border-amber-400/60 bg-amber-500/40 flex items-center justify-center text-white text-xs" aria-hidden="true">
                                    46
                                </div>
                                <span className="blueprint-text text-sm">Goal</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-6 h-6 border border-white/60 bg-red-600/60 flex items-center justify-center text-white text-sm" aria-hidden="true">
                                    R
                                </div>
                                <span className="blueprint-text text-sm">Red Room (Blocked)</span>
                            </li>
                        </ul>
                    </section>

                    <section className="blueprint-border bg-blueprint-dark/30 p-5" aria-labelledby="reference-heading">
                        <h3 id="reference-heading" className="blueprint-outline-text text-xl mb-4 text-center">REFERENCE</h3>
                        <ul className="space-y-2 blueprint-text text-xs font-mono list-none" role="list">
                            <li>Grid wraps at edges</li>
                            <li>Red rooms block path</li>
                            <li>Cannot pass through</li>
                            <li>Coords: row,col</li>
                        </ul>
                    </section>
                </div>

                <section className="blueprint-border bg-blueprint-dark/30 p-5" aria-labelledby="mission-heading">
                    <h3 id="mission-heading" className="blueprint-text text-base font-bold mb-4">MISSION BRIEFING</h3>
                    <div className="space-y-2 blueprint-text text-sm">
                        
                        <p>
                            <span className="text-white/70">SPAWN:</span> Entrance Hall ({START_ROW},{START_COL})
                        </p>
                        <p>
                            <span className="text-white/70">TARGET:</span> {GOAL_NAME} at ({GOAL_ROW},{GOAL_COL})
                        </p>
                        <div className="border-t border-white/20 mt-3 pt-3">
                            <p className="text-white/80 mb-2">
                                <span className="text-white font-bold">OBJECTIVE:</span> Navigate the Blue Prince through the shifting corridors of Mt. Holly Estate to reach Room 46.
                            </p>
                            <p className="text-white/70 text-xs leading-relaxed">
                                The mansion is alive. Red rooms materialize without warning, completely blocking your path—you cannot pass through them. Use commands to move the prince, rotate his direction, and report his status. Every move counts: the house watches, and it may draft new red blocking rooms at any moment. Plan your route carefully to avoid getting trapped by the impenetrable red walls. Use RESET to clear the blueprint and start a new session.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="border-2 border-green-500/50 bg-black p-5" aria-labelledby="terminal-heading">
                    <div className="mb-4">
                        <h3 id="terminal-heading" className="text-green-500 text-base font-mono tracking-wider">TERMINAL</h3>
                    </div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const input = e.target.elements.command.value.trim();
                        if (input) {
                            handleCommand(input);
                            e.target.reset();
                        }
                    }} className="flex gap-4" role="form" aria-label="Game command terminal">
                        <div className="flex-1 relative">
                            <label htmlFor="game-command-input" className="sr-only">Enter game command</label>
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500 font-mono text-lg" aria-hidden="true">
                                &gt;
                            </span>
                            <input 
                                id="game-command-input"
                                type="text" 
                                name="command"
                                placeholder="PLACE_ROOM 2,3,RED"
                                aria-label="Game command input"
                                aria-describedby="terminal-commands-help"
                                className="w-full bg-black border border-green-500/30 text-green-500 font-mono px-10 py-4 text-base focus:outline-none focus:border-green-500 placeholder-green-500/30"
                            />
                        </div>
                        <button 
                            type="submit"
                            aria-label="Execute command"
                            className="border border-green-500/50 bg-green-900/20 hover:bg-green-900/40 text-green-500 px-8 py-4 font-mono text-base tracking-wider transition-all duration-200"
                        >
                            RUN
                        </button>
                    </form>
                    <div id="terminal-commands-help" className="mt-4 text-green-500/50 text-xs font-mono">
                        CMD: PLACE_ROOM row,col,RED | MOVE | LEFT | RIGHT | REPORT | RESET
                    </div>
                </section>

                {report && (
                    <div 
                        className="border-2 border-green-500/50 bg-black p-5"
                        role="status"
                        aria-live="polite"
                        aria-atomic="true"
                        aria-label="Command output"
                    >
                        <div className="flex items-start gap-4">
                            <span className="text-green-500/70 font-mono text-base" aria-hidden="true">&gt;&gt;</span>
                            <p className="text-green-500 flex-1 font-mono text-base leading-relaxed">
                                {report}
                            </p>
                        </div>
                    </div>
                )}

                <footer className="text-center text-white/30 text-xs font-mono" aria-label="Terminal information">
                    Mt. Holly Terminal v1.0 | Grid: {BOARD_WIDTH}×{BOARD_HEIGHT}
                </footer>
                </aside>
            </main>
        </div>
    );
}

