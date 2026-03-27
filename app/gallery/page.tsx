"use client";
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/Footer'
import GalleryCarousel from '@/components/gallery/GalleryCarousel'
import "@/app/landing.css"

export default function GalleryPage() {
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
                    Galerie
                </div>

                <h1 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(36px, 5vw, 68px)",
                    fontWeight: 300, lineHeight: 1.05,
                    color: "#e8e4db", maxWidth: 700,
                    marginBottom: 20,
                    animation: "fadeUp 0.7s 0.2s ease forwards", opacity: 0,
                }}>
                    Universul <em style={{ fontStyle: "italic", color: "#c9a84c" }}>Sigillium</em>
                </h1>

                <p style={{
                    fontSize: 15, fontWeight: 300, color: "#9e9b94",
                    maxWidth: 500, lineHeight: 1.7,
                    animation: "fadeUp 0.7s 0.3s ease forwards", opacity: 0,
                }}>
                    Imagini din procesul de certificare, echipa noastră și momentele care definesc platforma.
                </p>
            </section>

            {/* Gallery */}
            <section style={{
                padding: "0 24px 100px",
                maxWidth: 900, margin: "0 auto",
            }}>
                <GalleryCarousel />
            </section>

            <Footer />
        </main>
    );
}
