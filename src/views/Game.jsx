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

export default function Game() {
    const [prince, setPrince] = useState({ row: START_ROW, col: START_COL, facing: "NORTH" });
    const [rooms, setRooms] = useState([]);
    const [report, setReport] = useState("");
    const [hasReachedGoal, setHasReachedGoal] = useState(false);

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

                const blocked = rooms.some((room) => room.row === newRow && room.col === newCol);
                if (!blocked) {
                    setPrince({ row: newRow, col: newCol, facing: mf });
                    if (newRow === GOAL_ROW && newCol === GOAL_COL) {
                        setHasReachedGoal(true);
                        setReport(`The crown has reached ${GOAL_NAME}.`);
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
                    const objective = `Objective: reach ${GOAL_NAME} at ${GOAL_ROW}, ${GOAL_COL}.`;
                    const status = prince.row === GOAL_ROW && prince.col === GOAL_COL
                        ? `Status: objective complete.`
                        : `Status: en route.`;
                    setReport(`Prince at ${prince.row}, ${prince.col}, facing ${prince.facing}. ${objective} ${status}`);
                }
                break;

            default:
                break;
        }
    };

    return (
        <div style ={{ textAlign: "center", padding: "20px"}}>
            <h1>Blue Prince Blueprint</h1>
            <p>Use PLACE_ROOM, MOVE, LEFT, RIGHT, REPORT. Rooms (red, green, purple) block movement like walls. Blueprint size: 5 wide x 9 tall.</p>
            <p>Spawn: {START_ROW}, {START_COL}. Objective: reach {GOAL_NAME} at {GOAL_ROW}, {GOAL_COL}.</p>
            {hasReachedGoal && <p style={{ fontWeight: "bold" }}>Objective complete: {GOAL_NAME} reached.</p>}
            <Board prince={prince} rooms={rooms} goal={{ row: GOAL_ROW, col: GOAL_COL, name: GOAL_NAME }} />
            <CommandInput onCommand={handleCommand} />
            <RobotReport report={report}/>
        </div>
    );
}

