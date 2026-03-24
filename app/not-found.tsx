import Link from "next/link";
import "@/app/landing.css";

export default function NotFound() {
	return (
		<main style={{
			background: "#0d0f0e", minHeight: "100vh",
			fontFamily: "'Outfit', sans-serif",
			display: "flex", alignItems: "center", justifyContent: "center",
			padding: 24,
		}}>
			<div style={{ textAlign: "center", maxWidth: 400 }}>
				<div style={{
					width: 56, height: 56, borderRadius: "50%",
					background: "rgba(201,168,76,.06)", border: "1px solid rgba(201,168,76,.2)",
					display: "flex", alignItems: "center", justifyContent: "center",
					margin: "0 auto 24px",
				}}>
					<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5">
						<circle cx="11" cy="11" r="8" />
						<path d="M21 21l-4.35-4.35" />
					</svg>
				</div>

				<p style={{
					fontSize: 10, color: "#c9a84c", letterSpacing: "0.14em",
					textTransform: "uppercase", marginBottom: 12,
				}}>
					Eroare 404
				</p>

				<h1 style={{
					fontFamily: "'Cormorant Garamond', serif",
					fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 300,
					color: "#e8e4db", marginBottom: 12, lineHeight: 1.1,
				}}>
					Pagina nu a fost <em style={{ color: "#c9a84c", fontStyle: "italic" }}>găsită</em>
				</h1>

				<p style={{ fontSize: 13, color: "#5c5f5a", marginBottom: 32, lineHeight: 1.6 }}>
					Resursa pe care o cauți nu există sau a fost mutată.
				</p>

				<div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
					<Link href="/" style={{
						fontSize: 13, fontWeight: 500, color: "#0d0f0e",
						background: "#c9a84c", padding: "9px 22px",
						borderRadius: 4, textDecoration: "none",
					}}>
						Acasă
					</Link>
					<Link href="/verify" style={{
						fontSize: 13, color: "#9e9b94",
						border: "1px solid #2e332e", padding: "9px 22px",
						borderRadius: 4, textDecoration: "none",
					}}>
						Verifică un certificat
					</Link>
				</div>
			</div>
		</main>
	);
}