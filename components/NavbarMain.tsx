import Link from "next/link"

import React from 'react'

const NavbarMain = () => {
	return (
		<header style={
			{
				position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
				padding: "0 48px", height: 64,
				display: "flex", alignItems: "center", justifyContent: "space-between",
				borderBottom: "1px solid #232623",
				background: "rgba(13,15,14,0.88)",
				backdropFilter: "blur(12px)"
			}
		}>
			<Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
				<svg width="28" height="28" viewBox="0 0 40 40" fill="none">
					<path d="M20 2L23.5 8.5L30.5 6.5L29.5 13.5L36 16L32 22L36 28L29.5 30.5L30.5 37.5L23.5 35.5L20 42L16.5 35.5L9.5 37.5L10.5 30.5L4 28L8 22L4 16L10.5 13.5L9.5 6.5L16.5 8.5L20 2Z" stroke="#c9a84c" strokeWidth="1.5" fill="none" />
					<circle cx="20" cy="22" r="7" stroke="#c9a84c" strokeWidth="1.2" fill="none" />
					<path d="M16 22L18.5 24.5L24 19" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
				<span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "#e8e4db", letterSpacing: "0.1em" }}>
					SIGIL<span style={{ color: "#c9a84c" }}>LI</span>UM
				</span>
			</Link>
		</header>
	);
}

export default NavbarMain