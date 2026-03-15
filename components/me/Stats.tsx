import React from 'react'

interface Properties{
    total: number,
    active: number,
    revoked: number,
}

const Stats = ({total,active,revoked}:Properties) => {
	//hardcodate
	const stats=[
    { val: total, label: "Certificate totale", color: "#e8e4db" },
    { val: active, label: "Active", color: "#3ecf6e" },
    { val: revoked, label: "Revocate", color: "#5c5f5a" },
	];
  return (
    <>
      <div className="stats-grid-me">
        {stats.map(({ val, label, color }) => (
          <div key={label} style={{
            background: "#131614",
            border: "1px solid #2e332e",
            borderRadius: 6,
            padding: "16px 18px",
          }}>
            <div style={{ fontSize: 24, fontWeight: 500, color, fontFamily: "'Outfit', sans-serif" }}>
              {val}
            </div>
            <div style={{ fontSize: 11, color: "#5c5f5a", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4, fontFamily: "'Outfit', sans-serif" }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default Stats