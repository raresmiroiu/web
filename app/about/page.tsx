import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/Footer'
import "@/app/landing.css"
import Link from "next/link"

export default function AboutPage() {
    return (
        <main style={{
            background: "#0d0f0e",
            color: "#e8e4db",
            fontFamily: "'Outfit', sans-serif",
            minHeight: "100vh",
        }}>
            <Navbar />

            {/* Hero section */}
            <section style={{
                minHeight: "60vh",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                textAlign: "center",
                padding: "140px 24px 80px",
                position: "relative", overflow: "hidden",
            }}>
                {/* Grid background */}
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: "linear-gradient(#232623 1px, transparent 1px), linear-gradient(90deg, #232623 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                    opacity: 0.3,
                    maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
                    WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
                    pointerEvents: "none",
                }} />

                {/* Gold glow */}
                <div style={{
                    position: "absolute", top: "30%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 800, height: 500,
                    background: "radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 65%)",
                    pointerEvents: "none",
                }} />

                {/* Badge */}
                <div style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    border: "1px solid #6b5a28", background: "rgba(201,168,76,0.05)",
                    padding: "6px 14px", borderRadius: 100,
                    fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#c9a84c",
                    marginBottom: 28,
                    animation: "fadeUp 0.7s 0.1s ease forwards", opacity: 0,
                }}>
                    <div style={{ width: 5, height: 5, background: "#c9a84c", borderRadius: "50%" }} />
                    Despre noi
                </div>

                {/* Title */}
                <h1 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(40px, 6vw, 76px)",
                    fontWeight: 300, lineHeight: 1.05,
                    color: "#e8e4db", maxWidth: 780,
                    marginBottom: 24,
                    animation: "fadeUp 0.7s 0.2s ease forwards", opacity: 0,
                }}>
                    Povestea din spatele{" "}
                    <em style={{ fontStyle: "italic", color: "#c9a84c" }}>Sigillium</em>
                </h1>

                {/* Subtitle */}
                <p style={{
                    fontSize: 16, fontWeight: 300, color: "#9e9b94",
                    maxWidth: 560, lineHeight: 1.7,
                    animation: "fadeUp 0.7s 0.3s ease forwards", opacity: 0,
                }}>
                    O platformă construită din convingerea că fiecare certificat merită să fie autentic, verificabil și accesibil - fără hârtii, fără compromisuri.
                </p>
            </section>

            {/* Mission section */}
            <section style={{
                background: "#131614",
                borderTop: "1px solid #232623", borderBottom: "1px solid #232623",
                padding: "100px 24px",
            }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 64 }}>
                        <p style={{ fontSize: 15, color: "#c9a84c", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>
                            Misiunea noastră
                        </p>
                        <h2 style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300,
                            color: "#e8e4db", marginBottom: 24,
                        }}>
                            Încredere prin <em style={{ color: "#c9a84c", fontStyle: "italic" }}>transparență</em>
                        </h2>
                        <p style={{ fontSize: 15, color: "#5c5f5a", maxWidth: 600, margin: "0 auto", lineHeight: 1.8 }}>
                            Într-o lume digitală în care diplomele se pot falsifica ușor, Sigillium oferă un strat de autenticitate. Fiecare certificat emis prin platforma noastră primește un cod unic și un QR care poate fi verificat public, instant, de oricine.
                        </p>
                    </div>

                    {/* Values grid */}
                    <div className="features-grid" style={{
                        border: "1px solid #232623",
                        borderRadius: 8, overflow: "hidden",
                    }}>
                        {[
                            {
                                title: "Autenticitate",
                                desc: "Fiecare certificat este unic și verificabil prin cod UUID și QR. Falsificarea devine imposibilă.",
                                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
                            },
                            {
                                title: "Transparență",
                                desc: "Verificarea este publică și gratuită. Nu ai nevoie de cont pentru a confirma validitatea unui certificat.",
                                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>,
                            },
                            {
                                title: "Simplitate",
                                desc: "Interfață curată și intuitivă. Emiterea, gestionarea și verificarea se fac în câteva click-uri.",
                                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>,
                            },
                        ].map(({ title, desc, icon }) => (
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
                </div>
            </section>

            {/* Story / Context section */}
            <section style={{ padding: "100px 24px" }}>
                <div style={{ maxWidth: 900, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 64 }}>
                        <p style={{ fontSize: 15, color: "#c9a84c", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>
                            Context
                        </p>
                        <h2 style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300,
                            color: "#e8e4db", marginBottom: 24,
                        }}>
                            De unde a <em style={{ color: "#c9a84c", fontStyle: "italic" }}>început</em>
                        </h2>
                    </div>

                    <div style={{
                        display: "grid", gridTemplateColumns: "1fr",
                        gap: 32,
                    }}>
                        {[
                            {
                                num: "01",
                                title: "Problema",
                                text: "Certificatele tradiționale pe hârtie sunt ușor de falsificat, dificil de verificat și aproape imposibil de gestionat la scară largă. Instituțiile pierd timp și resurse, iar beneficiarii nu au un mod simplu de a-și demonstra competențele.",
                            },
                            {
                                num: "02",
                                title: "Ideea",
                                text: "Am pornit de la o întrebare simplă: «Ce ar fi dacă oricine ar putea verifica un certificat în 5 secunde, fără să apeleze la instituția emitentă?». Răspunsul a fost Sigillium — o platformă care digitizează întregul ciclu de viață al unui certificat.",
                            },
                            {
                                num: "03",
                                title: "Soluția",
                                text: "Sigillium oferă un flux complet: înregistrare, emitere cu cod unic, generare automată de PDF cu QR code și verificare publică instantă. Totul este construit cu tehnologii moderne — Next.js, Prisma, PostgreSQL — punând accent pe securitate și experiența utilizatorului.",
                            },
                        ].map(({ num, title, text }) => (
                            <div key={num} style={{
                                display: "flex", gap: 24,
                                padding: "32px",
                                background: "#131614",
                                border: "1px solid #232623",
                                borderRadius: 8,
                            }}>
                                <div style={{ flexShrink: 0 }}>
                                    <div style={{
                                        fontFamily: "'DM Mono', monospace",
                                        fontSize: 16, color: "#c9a84c", letterSpacing: "0.1em",
                                        marginBottom: 8,
                                    }}>
                                        {num}
                                    </div>
                                    <div style={{
                                        width: 1, height: 40,
                                        background: "linear-gradient(to bottom, #c9a84c, transparent)",
                                        marginLeft: 10,
                                    }} />
                                </div>
                                <div>
                                    <div style={{ fontSize: 16, fontWeight: 500, color: "#e8e4db", marginBottom: 10 }}>{title}</div>
                                    <div style={{ fontSize: 14, color: "#5c5f5a", lineHeight: 1.7 }}>{text}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech stack section */}
            <section style={{
                background: "#131614",
                borderTop: "1px solid #232623", borderBottom: "1px solid #232623",
                padding: "100px 24px",
            }}>
                <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
                    <p style={{ fontSize: 15, color: "#c9a84c", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>
                        Tehnologii
                    </p>
                    <h2 style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300,
                        color: "#e8e4db", marginBottom: 16,
                    }}>
                        Construit cu tehnologii <em style={{ color: "#c9a84c", fontStyle: "italic" }}>moderne</em>
                    </h2>
                    <p style={{ fontSize: 15, color: "#5c5f5a", maxWidth: 500, margin: "0 auto 64px", lineHeight: 1.7 }}>
                        Stack-ul nostru asigură performanță, securitate și o experiență premium.
                    </p>

                    <div className="how-grid">
                        {[
                            { name: "Next.js", desc: "Framework React full-stack cu server-side rendering și routing avansat.", icon: "▲" },
                            { name: "Pupeteer", desc: "Transformarea HTML/CSS în PDF-uri de înaltă calitate.", icon: "◆" },
                            { name: "PostgreSQL", desc: "Bază de date relațională robustă și scalabilă.", icon: "⬡" },
                            { name: "Auth.js", desc: "Autentificare securizată cu suport pentru roluri multiple.", icon: "⊕" },
                        ].map(({ name, desc, icon }) => (
                            <div key={name} style={{ textAlign: "center" }}>
                                <div style={{
                                    width: 48, height: 48,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    background: "rgba(201,168,76,0.08)", border: "1px solid #2e332e",
                                    borderRadius: 8, color: "#c9a84c",
                                    fontSize: 18,
                                    margin: "0 auto 16px",
                                }}>
                                    {icon}
                                </div>
                                <div style={{
                                    width: "100%", height: 1,
                                    background: "linear-gradient(90deg, transparent, #c9a84c, transparent)",
                                    marginBottom: 20,
                                }} />
                                <div style={{ fontSize: 15, fontWeight: 500, color: "#e8e4db", marginBottom: 8 }}>{name}</div>
                                <div style={{ fontSize: 13, color: "#5c5f5a", lineHeight: 1.6 }}>{desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team section */}
            <section style={{ padding: "100px 24px" }}>
                <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
                    <p style={{ fontSize: 15, color: "#c9a84c", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>
                        Echipa
                    </p>
                    <h2 style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300,
                        color: "#e8e4db", marginBottom: 48,
                    }}>
                        Cine suntem
                    </h2>

                    {/* Founder card */}
                    <div style={{
                        background: "#131614",
                        border: "1px solid #232623",
                        borderRadius: 12,
                        overflow: "hidden",
                    }}>
                        {/* Gold top bar */}
                        <div style={{ height: 3, background: "linear-gradient(90deg, #c9a84c, #6b5a28)" }} />

                        <div style={{ padding: "40px 32px" }}>
                            {/* Avatar */}
                            <div style={{
                                width: 72, height: 72,
                                borderRadius: "50%",
                                background: "#1e2420",
                                border: "2px solid #2e332e",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 22, color: "#c9a84c",
                                fontFamily: "'DM Mono', monospace",
                                margin: "0 auto 20px",
                            }}>
                                MR
                            </div>

                            <div style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: 24, fontWeight: 400,
                                color: "#e8e4db", marginBottom: 4,
                            }}>
                                Miroiu Rareș
                            </div>
                            <div style={{
                                fontSize: 13, color: "#c9a84c",
                                letterSpacing: "0.08em",
                                marginBottom: 20,
                            }}>
                                Fondator & Developer
                            </div>
                            <div style={{
                                fontSize: 14, color: "#5c5f5a", lineHeight: 1.7,
                                maxWidth: 420, margin: "0 auto",
                            }}>
                                Student universitar pasionat de dezvoltare web și securitate digitală. Sigillium este rezultatul dorinței de a rezolva o problemă reală cu tehnologii moderne.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA section */}
            <section style={{
                padding: "100px 24px",
                textAlign: "center",
                background: "#0d0f0e",
                borderTop: "1px solid #232623",
            }}>
                <h2 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 300,
                    color: "#e8e4db", marginBottom: 16, lineHeight: 1.1,
                }}>
                    Vrei să afli <em style={{ color: "#c9a84c", fontStyle: "italic" }}>mai mult?</em>
                </h2>
                <p style={{ fontSize: 15, color: "#5c5f5a", marginBottom: 40 }}>
                    Explorează platforma sau verifică un certificat chiar acum.
                </p>
                <div className="hero-actions" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
                    <Link href="/register" style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        fontSize: 14, fontWeight: 500, color: "#0d0f0e",
                        background: "#c9a84c", padding: "12px 28px",
                        borderRadius: 4, textDecoration: "none",
                    }}>
                        Începe gratuit
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

            <Footer />
        </main>
    );
}
