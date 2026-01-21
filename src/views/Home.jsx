import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Mt. Holly Terminal</h1>
            <p>The mansion redraws itself as you type. You are the crown-bearer tracing a live blueprint where rooms surface mid-route.</p>
            <p>Spawn: 1,3. Target: Room 46 at 9,3. Commands: PLACE_ROOM, MOVE, LEFT, RIGHT, REPORT.</p>
            <Link to="/game">
                <button style={{ padding: "10px 20px", marginTop: "20px"}}>Open terminal</button>
            </Link>
        </div>
    )
}