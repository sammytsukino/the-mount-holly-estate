export default function RobotReport( {report} ) {
    return (
        <div style={{ textAlign: "center", marginTop: "10px", fontWeight: "bold"}}>
            {report && <p>mt-holly-terminal&gt; {report}</p>}
        </div>
    );
}