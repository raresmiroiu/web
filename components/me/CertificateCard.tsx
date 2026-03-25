import DownloadPdfButton from "../DownloadPdfButton";

export interface Certificate {
	id: string;
	type: string;
	title: string;
	issuer: string;
	issuedAt: string;
	code: string;
	verifications: number;
	revoked: boolean;
}

interface Props {
	cert: Certificate;
}

export default function CertificateCard({ cert }: Props) {
	return (
		<>
			<div style={{
				background: "#131614",
			border: "1px solid #2e332e",
			borderRadius: 6,
			overflow: "hidden",
			marginBottom: 10,
		}}>
			{/* Gold top bar */}
			<div style={{ height: 2, background: "linear-gradient(90deg, #c9a84c, #2e332e)" }} />

			{/* Main row */}
			<div className="cert-card-main">

				{/* Icon */}
				<div style={{
					width: 36, height: 36, borderRadius: 6,
					background: "#1a1d1b", border: "1px solid #2e332e",
					display: "flex", alignItems: "center", justifyContent: "center",
					flexShrink: 0,
				}}>
					<svg width="16" height="16" viewBox="0 0 40 40" fill="none">
						<path d="M20 2L23.5 8.5L30.5 6.5L29.5 13.5L36 16L32 22L36 28L29.5 30.5L30.5 37.5L23.5 35.5L20 42L16.5 35.5L9.5 37.5L10.5 30.5L4 28L8 22L4 16L10.5 13.5L9.5 6.5L16.5 8.5L20 2Z" stroke="#c9a84c" strokeWidth="1.5" fill="none" />
						<circle cx="20" cy="22" r="7" stroke="#c9a84c" strokeWidth="1.2" fill="none" />
						<path d="M16 22L18.5 24.5L24 19" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</div>

				{/* Info */}
				<div style={{ flex: 1 }}>
					<div style={{ fontSize: 10, color: "#5c5f5a", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Outfit', sans-serif" }}>
						{cert.type}
					</div>
					<div style={{ fontSize: 15, color: "#e8e4db", margin: "3px 0", fontFamily: "'Cormorant Garamond', serif" }}>
						{cert.title}
					</div>
					<div style={{ fontSize: 12, color: "#5c5f5a", fontFamily: "'Outfit', sans-serif" }}>
						{cert.issuer}
					</div>
				</div>

				{/* Right side */}
				<div className="cert-card-right">
					{cert.revoked ? (
						<div style={{
							display: "flex", alignItems: "center", gap: 5,
							fontSize: 11, color: "#e05c5c",
							border: "1px solid rgba(224,92,92,.2)", background: "rgba(224,92,92,.05)",
							padding: "3px 9px", borderRadius: 100, fontFamily: "'Outfit', sans-serif",
						}}>
							<div style={{ width: 5, height: 5, borderRadius: "50%", background: "#e05c5c" }} />
							Revocat
						</div>
					) : (
						<div style={{
							display: "flex", alignItems: "center", gap: 5,
							fontSize: 11, color: "#3ecf6e",
							border: "1px solid rgba(62,207,110,.2)", background: "rgba(62,207,110,.05)",
							padding: "3px 9px", borderRadius: 100, fontFamily: "'Outfit', sans-serif",
						}}>
							<div style={{ width: 5, height: 5, borderRadius: "50%", background: "#3ecf6e" }} />
							Valid
						</div>
					)}
					<DownloadPdfButton code={cert.code}/>
				</div>
			</div>

			{/* Meta row */}
			<div className="cert-card-meta">
				{[
					{ label: "Emis la", val: cert.issuedAt },
					{ label: "Cod unic", val: cert.code },
					{ label: "Verificări", val: String(cert.verifications) },
				].map(({ label, val }) => (
					<div key={label}>
						<div style={{ fontSize: 10, color: "#5c5f5a", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Outfit', sans-serif" }}>
							{label}
						</div>
						<div style={{ fontSize: 12, color: "#9e9b94", marginTop: 2, fontFamily: "monospace" }}>
							{val}
						</div>
					</div>
				))}
			</div>
		</div>
		</>
	);
}