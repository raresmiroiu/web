"use client";

import { generateCertificate } from "@/libs/generateCertificate-action";
import { useState } from "react";

const inputStyle = {
	width: "100%", padding: "9px 13px",
	background: "#0d0f0e", border: "1px solid #2e332e",
	borderRadius: 4, color: "#e8e4db", fontSize: 13,
	outline: "none", boxSizing: "border-box" as const,
	fontFamily: "'Outfit', sans-serif",
};

const labelStyle = {
	display: "block", fontSize: 11, color: "#9e9b94",
	letterSpacing: "0.06em", marginBottom: 7,
};

export default function EmitForm() {
	const [error, setError] = useState("");
	return (
		<div style={{ maxWidth: 520 }}>
			<form action={async (formData) => {
				const res = await generateCertificate(formData);
				if (res?.success === false) setError(res.message);
			}}>


				<div className="org-form-grid">
					<div>
						<label style={labelStyle}>Nume beneficiar</label>
						<input style={inputStyle} placeholder="Ion Popescu"
							name="recipientName"
							onFocus={e => e.target.style.borderColor = "#c9a84c"}
							onBlur={e => e.target.style.borderColor = "#2e332e"}
						/>
					</div>
					<div>
						<label style={labelStyle}>Email beneficiar</label>
						<input style={inputStyle} type="email" placeholder="ion@exemplu.com"
							name="recipientEmail"
							onFocus={e => e.target.style.borderColor = "#c9a84c"}
							onBlur={e => e.target.style.borderColor = "#2e332e"}
						/>
					</div>
				</div>

				<div style={{ marginBottom: 18 }}>
					<label style={labelStyle}>Titlu certificat</label>
					<input style={inputStyle} placeholder="ex. Curs React Avansat"
						name="title"
						onFocus={e => e.target.style.borderColor = "#c9a84c"}
						onBlur={e => e.target.style.borderColor = "#2e332e"}
					/>
				</div>

				<div className="org-form-grid">
					<div>
						<label style={labelStyle}>Tip certificat</label>
						<input style={inputStyle} placeholder="ex. Curs profesional"
							name="type"
							onFocus={e => e.target.style.borderColor = "#c9a84c"}
							onBlur={e => e.target.style.borderColor = "#2e332e"}
						/>
					</div>
					<div>
						<label style={labelStyle}>Data emiterii</label>
						<input style={inputStyle} type="date"
							name="issuedAt"
							onFocus={e => e.target.style.borderColor = "#c9a84c"}
							onBlur={e => e.target.style.borderColor = "#2e332e"}
						/>
					</div>
				</div>

				<div style={{ marginBottom: 28 }}>
					<label style={labelStyle}>Domeniu / specializare</label>
					<input style={inputStyle} placeholder="ex. Inginerie software"
						name="domain"
						onFocus={e => e.target.style.borderColor = "#c9a84c"}
						onBlur={e => e.target.style.borderColor = "#2e332e"}
					/>
				</div>
				{error && (
					<div style={{
						fontSize: 12, color: "#e05c5c",
						background: "rgba(224,92,92,.08)",
						border: "1px solid rgba(224,92,92,.2)",
						borderRadius: 4, padding: "8px 12px",
						marginBottom: 16,
					}}>
						{error}
					</div>
				)}
				<button type="submit" style={{
					background: "#c9a84c", color: "#0d0f0e",
					border: "none", padding: "10px 24px",
					borderRadius: 4, fontSize: 13, fontWeight: 500,
					cursor: "pointer", letterSpacing: "0.04em",
				}}>
					Generează certificat
				</button>
			</form>
		</div>
	);
}
