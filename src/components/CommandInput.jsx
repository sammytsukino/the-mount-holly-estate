import { useState } from "react";

export default function CommandInput({ onCommand }) {
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onCommand(input.trim());
            setInput("");
        }
    };

return (
    <form onSubmit={handleSubmit} style= {{ textAlign: "center"}}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a command (e.g., PLACE_ROOM 2,3,PURPLE)" style={{ width: "300px", padding: "5px"}}/>
    <button type="submit" style={{ marginLeft: "10px", padding: "5px 10px"}}>Run</button>
    </form>
);
};