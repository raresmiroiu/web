import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/Footer'
import "@/app/landing.css"
import ContactForm from '@/components/landing/ContactForm';
import SocialLinks from '@/components/landing/SocialLinks';

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
                <SocialLinks />
            </section>

            <Footer />
        </main>
    );
}
