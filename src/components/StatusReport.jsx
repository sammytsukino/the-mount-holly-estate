export default function StatusReport({ report }) {
    return (
        <div className="flex justify-center my-4">
            {report && (
                <div className="blueprint-border bg-blueprint-dark/40 p-4 max-w-3xl w-full">
                    <div className="flex items-start gap-3">
                        <span className="text-white/70 font-mono text-sm mt-1">&gt;&gt;</span>
                        <p className="blueprint-text flex-1 font-mono text-sm leading-relaxed">
                            {report}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
