import React from 'react'

const steps = [
	{
		num: "01",
		title: "Emitătorul se înregistrează",
		desc: "Instituția creează un cont și este aprobată de administrator.",
	},
	{
		num: "02",
		title: "Completează datele",
		desc: "Introdu numele beneficiarului, tipul certificatului și detaliile relevante.",
	},
	{
		num: "03",
		title: "Certificat generat",
		desc: "Sistemul generează un UUID unic, un QR code și exportă PDF-ul final.",
	},
	{
		num: "04",
		title: "Verificare instant",
		desc: "Oricine scanează QR-ul și vede în timp real dacă certificatul este valid.",
	},
];

const HowItWorks = () => {
	return (
		<section id="how" style={{
			background: "#131614",
			borderTop: "1px solid #232623", borderBottom: "1px solid #232623",
			padding: "120px 24px",
		}}>
			<div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
				<p style={{ fontSize: 15, color: "#c9a84c", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>
					Proces
				</p>
				<h2 style={{
					fontFamily: "'Cormorant Garamond', serif",
					fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 300,
					color: "#e8e4db", marginBottom: 64,
				}}>
					Cum <em style={{ color: "#c9a84c", fontStyle: "italic" }}>funcționează</em>
				</h2>

				<div className="how-grid">
					{steps.map(({ num, title, desc }) => (
						<div key={num}>
							<div style={{
								fontFamily: "'DM Mono', monospace",
								fontSize: 16, color: "#c9a84c", letterSpacing: "0.1em",
								marginBottom: 16,
							}}>
								{num}
							</div>
							<div style={{
								width: "100%", height: 1,
								background: "linear-gradient(90deg, #c9a84c, transparent)",
								marginBottom: 20,
							}} />
							<div style={{ fontSize: 15, fontWeight: 500, color: "#e8e4db", marginBottom: 10 }}>{title}</div>
							<div style={{ fontSize: 13, color: "#5c5f5a", lineHeight: 1.6 }}>{desc}</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default HowItWorks