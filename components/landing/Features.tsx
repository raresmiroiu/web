import React from 'react'

const features = [
	{
		title: "QR Code integrat",
		desc: "Fiecare certificat conține un cod QR unic. Scanezi, verifici în secunde, fără aplicație suplimentară.",
		icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 17h7M17 14v7" /></svg>,
	},
	{
		title: "PDF profesional",
		desc: "Certificate generate automat în format PDF, cu design curat și toate datele necesare.",
		icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><path d="M9 13h6M9 17h4" /></svg>,
	},
	{
		title: "Verificare publică",
		desc: "Oricine poate verifica un certificat fără cont. Simplu, rapid, transparent.",
		icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
	},
	{
		title: "Roluri multiple",
		desc: "Guest, utilizator, emitător, administrator — fiecare cu permisiuni clare și separate.",
		icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>,
	},
	{
		title: "Dashboard complet",
		desc: "Emitătorul vede toate certificatele emise, le poate revoca și urmări numărul de verificări.",
		icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>,
	},
	{
		title: "Portofoliu personal",
		desc: "Utilizatorii își văd toate certificatele primite într-un singur loc și le pot descărca oricând.",
		icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 7h18M3 12h18M3 17h18" /></svg>,
	},
];

const Features = () => {
	return (
		<section id='features' style={{ padding: "120px 24px", maxWidth: 1100, margin: "0 auto" }}>
			<div style={{ textAlign: "center", marginBottom: 64 }}>
				<p style={{ fontSize: 40, color: "#c9a84c", textTransform: "uppercase", marginBottom: 16 }}>
					De ce Sigillium?
				</p>
				<h2 style={{
					fontFamily: "'Cormorant Garamond', serif",
					fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 300,
					color: "#e8e4db", marginBottom: 16,
				}}>
					Tot ce ai nevoie pentru <em style={{ color: "#c9a84c", fontStyle: "italic" }}>certificare digitală</em>
				</h2>
				<p style={{ fontSize: 20, color: "#c9a84c99", maxWidth: 480, margin: "0 auto" }}>
					O platformă completă pentru instituții care emit certificate și beneficiarii care le dețin.
				</p>
			</div>

			{/* Grid */}
			<div className="features-grid" style={{
				border: "1px solid #232623",
				borderRadius: 8, overflow: "hidden",
			}}>
				{features.map(({ title, desc, icon }) => (
					<div key={title} style={{
						padding: "32px 28px",
						background: "#131614",
						borderRight: "1px solid #232623",
						borderBottom: "1px solid #232623",
					}}>
						<div style={{
							width: 36, height: 36,
							display: "flex", alignItems: "center", justifyContent: "center",
							background: "rgba(201,168,76,0.08)", border: "1px solid #2e332e",
							borderRadius: 6, color: "#c9a84c", marginBottom: 16,
						}}>
							{icon}
						</div>
						<div style={{ fontSize: 15, fontWeight: 500, color: "#e8e4db", marginBottom: 8 }}>{title}</div>
						<div style={{ fontSize: 13, color: "#5c5f5a", lineHeight: 1.6 }}>{desc}</div>
					</div>
				))}
			</div>
		</section>
	);
}

export default Features