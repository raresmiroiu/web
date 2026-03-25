"use client";

import { generateCertificate } from "@/libs/generateCertificate-action";
import { getOrgTemplatesAction } from "@/libs/template-action";
import { useState, useEffect } from "react";

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
	const [templates, setTemplates] = useState<{ id: number; name: string }[]>([]);

	useEffect(() => {
		getOrgTemplatesAction().then((data) => setTemplates(data));
	}, []);

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

				<div style={{ marginBottom: 28 }}>
					<label style={labelStyle}>Șablon certificat</label>
					<select
						name="templateId"
						defaultValue=""
						style={{
							...inputStyle,
							appearance: "none" as const,
							backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239e9b94' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
							backgroundRepeat: "no-repeat",
							backgroundPosition: "right 12px center",
							paddingRight: 36,
							cursor: "pointer",
						}}
						onFocus={e => e.target.style.borderColor = "#c9a84c"}
						onBlur={e => e.target.style.borderColor = "#2e332e"}
					>
						<option value="">Design standard Sigillium</option>
						{templates.map((t) => (
							<option key={t.id} value={t.id}>{t.name}</option>
						))}
					</select>
					{templates.length === 0 && (
						<div style={{ fontSize: 11, color: "#5c5f5a", marginTop: 6 }}>
							Poți adăuga șabloane custom din pagina de Setări.
						</div>
					)}
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
