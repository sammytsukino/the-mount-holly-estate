import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Blueprint of the Blue Prince</h1>
            <p>Guide the crown-bearing prince across a 5x9 blueprint. Rotate the crown, move through open tiles, and place blocking rooms in red, green, or purple.</p>
            <p>Spawn: 1, 3. Objective: reach Room 46 at 9, 3.</p>
            <p>Commands: PLACE_ROOM, MOVE, LEFT, RIGHT, REPORT.</p>
            <Link to="/game">
                <button style={{ padding: "10px 20px", marginTop: "20px"}}>Enter the Blueprint</button>
            </Link>
        </div>
    )
}