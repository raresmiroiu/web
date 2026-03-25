import Link from "next/link"
import React from 'react'
import { auth, signOut } from '@/auth'

const Navbar = async () => {
	const session = await auth();
	const isLoggedIn = !!session?.user;
	
	let name = "Utilizator";
	let initials = "U";
	let dashboardHref = "/me";
	
	if (isLoggedIn) {
	    name = session.user.name ?? session.user.email ?? "Utilizator";
	    initials = name.includes("@") 
            ? name.split("@")[0].slice(0, 2).toUpperCase() 
            : name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
            
        const role = session.user.role;
        dashboardHref = role === "ADMIN" ? "/admin" : role === "ORG_OWNER" ? "/org" : "/me";
	}

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
			<nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
				<Link href="#features" style={{ fontSize: 13, color: "#5c5f5a", textDecoration: "none", letterSpacing: "0.04em" }}>Funcționalități</Link>
				<Link href="#how" style={{ fontSize: 13, color: "#5c5f5a", textDecoration: "none", letterSpacing: "0.04em" }}>Cum funcționează</Link>
				<Link href="/about" style={{ fontSize: 13, color: "#5c5f5a", textDecoration: "none", letterSpacing: "0.04em" }}>Despre noi</Link>
			</nav>
			<div className="navbar-actions" style={{ display: "flex", alignItems: "center", gap: 10 }}>
			    {isLoggedIn ? (
			        <>
        				<Link href={dashboardHref} style={{ fontSize: 13, color: "#c9a84c", textDecoration: "none", padding: "7px 16px", marginRight: 8 }}>
        					Panoul Meu
        				</Link>
    					<span className="nav-dash-name" style={{ fontSize: 13, color: "#5c5f5a" }}>{name}</span>
    					<div style={{
    						width: 32, height: 32, borderRadius: "50%",
    						background: "#1e2420", border: "1px solid #2e332e",
    						display: "flex", alignItems: "center", justifyContent: "center",
    						fontSize: 11, color: "#c9a84c", fontFamily: "monospace"
    					}}>
    						{initials}
    					</div>
    					<form action={async () => {
    						"use server"
    						await signOut({ redirectTo: "/" })
    					}}>
    						<button type="submit" style={{
    							fontSize: 13, color: "#5c5f5a",
    							background: "none", border: "none",
    							cursor: "pointer", padding: "7px 16px"
    						}}>
    							Ieșire
    						</button>
    					</form>
			        </>
			    ) : (
			        <>
        				<Link href="/login" style={{ fontSize: 13, color: "#9e9b94", textDecoration: "none", padding: "7px 16px" }}>
        					Autentificare
        				</Link>
        				<Link href="/register" style={{
        					fontSize: 13, fontWeight: 500, color: "#0d0f0e",
        					background: "#c9a84c", padding: "8px 20px",
        					borderRadius: 4, textDecoration: "none", letterSpacing: "0.04em"
        				}}>
        					Începe
        				</Link>
			        </>
			    )}
			</div>
		</header>
	);
}

export default Navbar