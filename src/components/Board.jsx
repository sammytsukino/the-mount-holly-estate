export default function Board({ prince, rooms, goal }) {
    const width = 5;
    const height = 9;
    const rows = [];
    const crownFaces = {
        NORTH: "CROWN",
        EAST: "CROWN",
        SOUTH: "CROWN",
        WEST: "CROWN",
    };
    const crownRotation = {
        NORTH: "rotate(0deg)",
        EAST: "rotate(90deg)",
        SOUTH: "rotate(180deg)",
        WEST: "rotate(-90deg)",
    };
    const roomColors = {
        RED: "#f8b4b4",
        GREEN: "#b5e3c8",
        PURPLE: "#c9b5f2",
    };

    for (let r = height; r >= 1; r--) {
        const cols = [];
        for (let c = 1; c <= width; c++) {
            const isPrince = prince && prince.row === r && prince.col === c;
            const room = rooms.find((room) => room.row === r && room.col === c);
            const isGoal = goal && goal.row === r && goal.col === c;
            cols.push(
                <td 
                    key={`${r}-${c}`}
                    style = {{
                        width: "60px",
                        height: "60px",
                        textAlign: "center",
                        border: "1px solid black",
                        backgroundColor: isPrince ? "#e8f0ff" : room ? roomColors[room.color] : isGoal ? "#fff4c2" : "white",
                        fontWeight: isPrince ? "bold" : "normal",
                    }}
                >
                    {isPrince ? (
                        <span style={{ display: "inline-block", transform: crownRotation[prince.facing] }}>
                            {crownFaces[prince.facing]}
                        </span>
                    ) : room ? room.color[0] : isGoal ? "46" : ""}
                </td>       
            );
        }
        rows.push(<tr key={r}>{cols}</tr>);
    }

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <table style={{ borderCollapse: "collapse", margin: "20px" }}>
                <tbody>{rows}</tbody>
            </table>
        </div>
    );
}  
