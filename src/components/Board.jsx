export default function Board({ prince, rooms, goal, visitedCells = [] }) {
    const width = 5;
    const height = 9;
    const rows = [];
    
    const crownRotations = {
        NORTH: 0,
        EAST: 90,
        SOUTH: 180,
        WEST: 270,
    };
    
    const roomColors = {
        RED: "rgba(220, 38, 38, 0.6)",
    };
    
    const CrownIcon = ({ rotation }) => (
        <svg 
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{
                transform: `rotate(${rotation}deg)`,
                transition: 'transform 0.3s ease',
                filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))'
            }}
        >
            <path 
                d="M2 19h20v2H2v-2zm1.5-7L7 15l5-7 5 7 3.5-3L22 19H2l1.5-7z" 
                fill="white"
                stroke="white"
                strokeWidth="0.5"
            />
        </svg>
    );

    for (let r = height; r >= 1; r--) {
        const cols = [];
        for (let c = 1; c <= width; c++) {
            const isPrince = prince && prince.row === r && prince.col === c;
            const room = rooms.find((room) => room.row === r && room.col === c);
            const isGoal = goal && goal.row === r && goal.col === c;
            const isVisited = visitedCells.some(cell => cell.row === r && cell.col === c);
            
            let cellContent = null;
            let bgColor = "rgba(45, 90, 140, 0.2)";
            let textColor = "rgba(255, 255, 255, 0.3)";
            let borderStyle = "2px solid rgba(255, 255, 255, 0.3)";
            
            if (isVisited && !isPrince && !room && !isGoal) {
                bgColor = "rgba(74, 123, 183, 0.25)";
                borderStyle = "2px solid rgba(255, 255, 255, 0.4)";
            }

            if (isPrince) {
                cellContent = <CrownIcon rotation={crownRotations[prince.facing]} />;
                bgColor = "rgba(74, 123, 183, 0.5)";
                textColor = "white";
                borderStyle = "2px solid rgba(255, 255, 255, 0.8)";
            } else if (room) {
                cellContent = room.color[0];
                bgColor = roomColors[room.color];
                textColor = "white";
                borderStyle = "2px solid rgba(255, 255, 255, 0.6)";
            } else if (isGoal) {
                cellContent = "46";
                bgColor = "rgba(251, 191, 36, 0.4)";
                textColor = "white";
                borderStyle = "2px solid rgba(251, 191, 36, 0.8)";
            }

            cols.push(
                <td 
                    key={`${r}-${c}`}
                    className="relative"
                    style={{
                        width: "85px",
                        height: "85px",
                        textAlign: "center",
                        border: borderStyle,
                        backgroundColor: bgColor,
                        color: textColor,
                        fontWeight: "bold",
                        fontSize: isPrince ? "28px" : "20px",
                        fontFamily: "monospace",
                        verticalAlign: "middle",
                        backdropFilter: "blur(2px)",
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        {cellContent}
                    </div>
                    <span className="absolute top-0 left-1 text-[9px] text-white/20 font-mono">
                        {r},{c}
                    </span>
                </td>       
            );
        }
        rows.push(<tr key={r}>{cols}</tr>);
    }

    return (
        <div className="flex justify-center items-center h-full">
            <div className="blueprint-border p-5 bg-blueprint-dark/20">
                <div className="text-center mb-4">
                    <h3 className="blueprint-text text-2xl font-bold tracking-wider">
                        ESTATE MAP
                    </h3>
                </div>
                
                <div className="flex justify-center mb-2">
                    {[1, 2, 3, 4, 5].map(n => (
                        <div key={n} className="w-[85px] text-center text-white/50 text-sm font-mono">
                            {n}
                        </div>
                    ))}
                </div>

                <div className="flex">
                    <div className="flex flex-col-reverse justify-center mr-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                            <div key={n} className="h-[85px] flex items-center text-white/50 text-sm font-mono">
                                {n}
                            </div>
                        ))}
                    </div>

                    <table style={{ borderCollapse: "collapse" }}>
                        <tbody>{rows}</tbody>
                    </table>

                    <div className="flex flex-col-reverse justify-center ml-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                            <div key={n} className="h-[85px] flex items-center text-white/50 text-sm font-mono">
                                {n}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center mt-2">
                    {[1, 2, 3, 4, 5].map(n => (
                        <div key={n} className="w-[85px] text-center text-white/50 text-sm font-mono">
                            {n}
                        </div>
                    ))}
                </div>

                <div className="mt-5 blueprint-text text-sm text-center flex items-center justify-center gap-4">
                    <div className="flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 19h20v2H2v-2zm1.5-7L7 15l5-7 5 7 3.5-3L22 19H2l1.5-7z" fill="white"/>
                        </svg>
                        <span>PRINCE</span>
                    </div>
                    <span>|</span>
                    <div>46 GOAL</div>
                    <span>|</span>
                    <div>R RED ROOM (BLOCKED)</div>
                </div>
            </div>
        </div>
    );
}  
