import Link from "next/link";

export default function Footer() {
	return (
		<footer className="footer-flex" style={{
			padding: "24px 48px",
			borderTop: "1px solid #232623",
		}}>
			<div style={{ display: "flex", alignItems: "center", gap: 20 }}>
				<Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
					<svg width="22" height="22" viewBox="0 0 40 40" fill="none">
						<path d="M20 2L23.5 8.5L30.5 6.5L29.5 13.5L36 16L32 22L36 28L29.5 30.5L30.5 37.5L23.5 35.5L20 42L16.5 35.5L9.5 37.5L10.5 30.5L4 28L8 22L4 16L10.5 13.5L9.5 6.5L16.5 8.5L20 2Z" stroke="#c9a84c" strokeWidth="1.2" fill="none" />
						<circle cx="20" cy="22" r="7" stroke="#c9a84c" strokeWidth="1" fill="none" />
						<path d="M16 22L18.5 24.5L24 19" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
					<span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 600, color: "#e8e4db", letterSpacing: "0.1em" }}>
						SIGIL<span style={{ color: "#c9a84c" }}>LI</span>UM
					</span>
				</Link>
				<span style={{ fontSize: 12, color: "#2e332e" }}>© 2026 Sigillium. Toate drepturile rezervate.</span>
			</div>

			<div className="footer-links" style={{ display: "flex", gap: 24 }}>
				{["Termeni", "Confidențialitate", "Contact"].map((item) => (
					<Link key={item} href="#" style={{ fontSize: 12, color: "#5c5f5a", textDecoration: "none" }}>
						{item}
					</Link>
				))}
				<Link href="/verify" style={{ fontSize: 12, color: "#5c5f5a", textDecoration: "none" }}>
					Verificare publică
				</Link>
			</div>
		</footer>
	);
}