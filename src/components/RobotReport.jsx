export default function RobotReport( {report} ) {
    return (
        <div style={{ textAlign: "center", marginTop: "10px", fontWeight: "bold"}}>
            {report && <p>Dispatch: {report}</p>}
        </div>
    );
}