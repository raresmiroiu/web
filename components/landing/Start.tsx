import React from 'react'
import Link from 'next/link';

const Start = () => {
	return (
		<section style={{
			padding: "120px 24px",
			textAlign: "center",
			background: "#0d0f0e",
			borderTop: "1px solid #232623",
		}}>
			<h2 style={{
				fontFamily: "'Cormorant Garamond', serif",
				fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 300,
				color: "#e8e4db", marginBottom: 16, lineHeight: 1.1,
			}}>
				Gata să emiți primul<br />
				<em style={{ color: "#c9a84c", fontStyle: "italic" }}>certificat digital?</em>
			</h2>
			<p style={{ fontSize: 15, color: "#5c5f5a", marginBottom: 40 }}>
				Înregistrează-te în câteva minute și începe să certifici.
			</p>
			<div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
				<Link href="/register" style={{
					display: "inline-flex", alignItems: "center", gap: 8,
					fontSize: 14, fontWeight: 500, color: "#0d0f0e",
					background: "#c9a84c", padding: "12px 28px",
					borderRadius: 4, textDecoration: "none",
				}}>
					Creează cont gratuit
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
				</Link>
				<Link href="/verify" style={{
					fontSize: 14, color: "#9e9b94",
					border: "1px solid #2e332e", padding: "11px 24px",
					borderRadius: 4, textDecoration: "none",
				}}>
					Verifică un certificat
				</Link>
			</div>
		</section>
	);
}

export default Start