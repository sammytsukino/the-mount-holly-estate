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
        <div className="flex justify-center my-6">
            <form onSubmit={handleSubmit} className="blueprint-border bg-blueprint-dark/30 p-6 w-full max-w-3xl">
                <div className="mb-3">
                    <span className="blueprint-text text-sm tracking-wider">TERMINAL INPUT</span>
                </div>
                <div className="flex gap-3">
                    <div className="flex-1 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 font-mono text-sm">
                            &gt;
                        </span>
                        <input 
                            type="text" 
                            value={input} 
                            onChange={(e) => setInput(e.target.value)} 
                            placeholder="PLACE_ROOM 2,3,RED"
                            className="w-full bg-blueprint-dark/50 border-2 border-white/30 text-white font-mono px-8 py-3 focus:outline-none focus:border-white/60 focus:shadow-[0_0_15px_rgba(255,255,255,0.2)] placeholder-white/30"
                        />
                    </div>
                    <button 
                        type="submit"
                        className="blueprint-border bg-blueprint-light/30 hover:bg-blueprint-light/50 blueprint-text px-8 py-3 font-bold tracking-wider transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    >
                        EXECUTE
                    </button>
                </div>
                <div className="mt-3 text-white/50 text-xs font-mono">
                    Commands: PLACE_ROOM row,col,color | MOVE | LEFT | RIGHT | REPORT | RESET
                </div>
            </form>
        </div>
    );
}