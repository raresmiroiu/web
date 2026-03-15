interface Stat {
    val: string | number;
    label: string;
    color?: string;
}

interface Props {
    stats: Stat[];
}

export default function StatsRow({ stats }: Props) {
    return (
        <div 
            className="org-stats-grid"
            style={{
                gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
            }}>
            {stats.map(({ val, label, color }) => (
                <div key={label} style={{
                    background: "#131614",
                    border: "1px solid #2e332e",
                    borderRadius: 6,
                    padding: "16px 18px",
                }}>
                    <div style={{ fontSize: 24, fontWeight: 500, color: color ?? "#e8e4db", fontFamily: "'Outfit', sans-serif" }}>
                        {val}
                    </div>
                    <div style={{ fontSize: 10, color: "#5c5f5a", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>
                        {label}
                    </div>
                </div>
            ))}
        </div>
    );
}
