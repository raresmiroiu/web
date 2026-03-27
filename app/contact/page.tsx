"use client";
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/Footer'
import "@/app/landing.css"
import { useState } from "react";
import ContactForm from '@/components/landing/ContactForm';

const inputStyle = {
    width: "100%", padding: "12px 16px",
    background: "#0d0f0e", border: "1px solid #2e332e",
    borderRadius: 6, color: "#e8e4db", fontSize: 14,
    outline: "none", boxSizing: "border-box" as const,
    fontFamily: "'Outfit', sans-serif",
};

const labelStyle = {
    display: "block", fontSize: 11, color: "#9e9b94",
    letterSpacing: "0.08em", textTransform: "uppercase" as const,
    marginBottom: 8,
};

const socialLinks = [
    {
        label: "GitHub",
        href: "https://github.com",
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>,
    },
    {
        label: "LinkedIn",
        href: "https://linkedin.com",
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
    },
    {
        label: "Instagram",
        href: "https://instagram.com",
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>,
    },
    {
        label: "X (Twitter)",
        href: "https://x.com",
        icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
    },
];

const contactInfo = [
    {
        label: "Email",
        value: "contact@sigillium.ro",
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 7L2 7" /></svg>,
    },
    {
        label: "Telefon",
        value: "+40 721 000 000",
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>,
    },
    {
        label: "Adresă",
        value: "Bulevardul George Coșbuc 39-49, Sector 5, București",
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>,
    },
];

export default function ContactPage() {
    return (
        <main style={{
            background: "#0d0f0e",
            color: "#e8e4db",
            fontFamily: "'Outfit', sans-serif",
            minHeight: "100vh",
        }}>
            <Navbar />

            {/* Hero */}
            <section style={{
                minHeight: "40vh",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                textAlign: "center",
                padding: "140px 24px 60px",
                position: "relative", overflow: "hidden",
            }}>
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: "linear-gradient(#232623 1px, transparent 1px), linear-gradient(90deg, #232623 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                    opacity: 0.3,
                    maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
                    WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
                    pointerEvents: "none",
                }} />
                <div style={{
                    position: "absolute", top: "30%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 800, height: 500,
                    background: "radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 65%)",
                    pointerEvents: "none",
                }} />

                <div style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    border: "1px solid #6b5a28", background: "rgba(201,168,76,0.05)",
                    padding: "6px 14px", borderRadius: 100,
                    fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#c9a84c",
                    marginBottom: 28,
                    animation: "fadeUp 0.7s 0.1s ease forwards", opacity: 0,
                }}>
                    <div style={{ width: 5, height: 5, background: "#c9a84c", borderRadius: "50%" }} />
                    Contact
                </div>

                <h1 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(36px, 5vw, 68px)",
                    fontWeight: 300, lineHeight: 1.05,
                    color: "#e8e4db", maxWidth: 700,
                    marginBottom: 20,
                    animation: "fadeUp 0.7s 0.2s ease forwards", opacity: 0,
                }}>
                    Hai să vorbim <em style={{ fontStyle: "italic", color: "#c9a84c" }}>împreună</em>
                </h1>

                <p style={{
                    fontSize: 15, fontWeight: 300, color: "#9e9b94",
                    maxWidth: 500, lineHeight: 1.7,
                    animation: "fadeUp 0.7s 0.3s ease forwards", opacity: 0,
                }}>
                    Ai o întrebare, o sugestie sau vrei să colaborezi cu noi? Scrie-ne și îți răspundem cât mai rapid.
                </p>
            </section>

            {/* Contact Info Cards */}
            <section style={{
                padding: "0 24px 80px",
                maxWidth: 1100, margin: "0 auto",
            }}>
                <div className="contact-info-grid" style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 16, marginBottom: 64,
                }}>
                    {contactInfo.map(({ label, value, icon }) => (
                        <div key={label} style={{
                            background: "#131614", border: "1px solid #2e332e",
                            borderRadius: 8, padding: "28px 24px",
                            display: "flex", alignItems: "flex-start", gap: 16,
                        }}>
                            <div style={{
                                width: 40, height: 40,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                background: "rgba(201,168,76,0.08)", border: "1px solid #2e332e",
                                borderRadius: 8, color: "#c9a84c", flexShrink: 0,
                            }}>
                                {icon}
                            </div>
                            <div>
                                <div style={{ fontSize: 10, color: "#5c5f5a", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
                                <div style={{ fontSize: 14, color: "#e8e4db", lineHeight: 1.5 }}>{value}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="contact-main-grid" style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 32,
                }}>
                    <div>
                        <p style={{
                            fontSize: 10, color: "#c9a84c",
                            letterSpacing: "0.14em", textTransform: "uppercase",
                            marginBottom: 16,
                        }}>
                            Trimite un mesaj
                        </p>
                        <ContactForm />
                    </div>

                    {/* Map */}
                    <div>
                        <p style={{
                            fontSize: 10, color: "#c9a84c",
                            letterSpacing: "0.14em", textTransform: "uppercase",
                            marginBottom: 16,
                        }}>
                            Locație
                        </p>
                        <div style={{
                            background: "#131614", border: "1px solid #2e332e",
                            borderRadius: 8, overflow: "hidden", height: "100%", minHeight: 400,
                        }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.6!2d26.0707!3d44.4135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff472f47d9b7%3A0x493464e28b890695!2sAcademia%20Tehnic%C4%83%20Militar%C4%83%20%22Ferdinand%20I%22!5e0!3m2!1sro!2sro!4v1"
                                width="100%" height="100%"
                                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(0.9) brightness(0.7)" }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section style={{
                padding: "60px 24px 80px",
                borderTop: "1px solid #232623",
                textAlign: "center",
            }}>
                <p style={{
                    fontSize: 10, color: "#c9a84c",
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    marginBottom: 24,
                }}>
                    Ne găsești și pe
                </p>
                <div style={{
                    display: "flex", justifyContent: "center", gap: 16,
                }}>
                    {socialLinks.map(({ label, href, icon }) => (
                        <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                            title={label}
                            style={{
                                width: 48, height: 48,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                background: "#131614", border: "1px solid #2e332e",
                                borderRadius: 8, color: "#5c5f5a",
                                textDecoration: "none",
                                transition: "all 0.2s ease",
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = "#c9a84c";
                                e.currentTarget.style.color = "#c9a84c";
                                e.currentTarget.style.background = "rgba(201,168,76,0.08)";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = "#2e332e";
                                e.currentTarget.style.color = "#5c5f5a";
                                e.currentTarget.style.background = "#131614";
                            }}
                        >
                            {icon}
                        </a>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
