import { useState } from "react";
import Board from "../components/Board";
import CommandInput from "../components/CommandInput";
import RobotReport from "../components/RobotReport";

const DIRECTIONS = ["NORTH", "EAST", "SOUTH", "WEST"];
const ROOM_COLORS = ["RED", "GREEN", "PURPLE"];
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
    const [prince, setPrince] = useState({ row: START_ROW, col: START_COL, facing: "NORTH" });
    const [rooms, setRooms] = useState([]);
    const [report, setReport] = useState("");
    const [hasReachedGoal, setHasReachedGoal] = useState(false);
    const [stepsSinceLastRoom, setStepsSinceLastRoom] = useState(0);
    const [nextRoomInSteps, setNextRoomInSteps] = useState(() => 3 + Math.floor(Math.random() * 3));

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

            default:
                break;
        }
    };

    return (
        <div style ={{ textAlign: "center", padding: "20px"}}>
            <h1>Mt. Holly: Drafts of the Blue Prince</h1>
            <p>mt-holly-terminal online. Commands accepted: PLACE_ROOM, MOVE, LEFT, RIGHT, REPORT. Rooms (red, green, purple) block passage. Grid: 5 wide x 9 tall.</p>
            <p>Source: Entrance Hall {START_ROW},{START_COL}. Target: {GOAL_NAME} at {GOAL_ROW},{GOAL_COL}. Drafts may insert rooms ahead; reroute on the fly.</p>
            {hasReachedGoal && <p style={{ fontWeight: "bold" }}>mt-holly-terminal&gt; Objective complete. The crown occupies Room 46.</p>}
            <Board prince={prince} rooms={rooms} goal={{ row: GOAL_ROW, col: GOAL_COL, name: GOAL_NAME }} />
            <CommandInput onCommand={handleCommand} />
            <RobotReport report={report}/>
        </div>
    );
}

