"use client";
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/Footer'
import "@/app/landing.css"
import { useState, useEffect, useCallback } from "react";

const slides = [
    { src: "/gallery/ceremony.png", title: "Ceremonia de certificare", desc: "Momente de excelență la ceremonia oficială de acordare a certificatelor." },
    { src: "/gallery/digital.png", title: "Certificare digitală", desc: "Vizualizarea certificatelor digitale cu QR code direct din dashboard." },
    { src: "/gallery/graduation.png", title: "Absolvire", desc: "Absolvenții sărbătoresc finalizarea programului de certificare." },
    { src: "/gallery/seal.png", title: "Sigiliul autenticității", desc: "Fiecare certificat poartă sigiliul unic Sigillium care garantează autenticitatea." },
    { src: "/gallery/qrcode.png", title: "Verificare instantă", desc: "Scanează codul QR pentru a verifica autenticitatea oricărui certificat." },
    { src: "/gallery/team.png", title: "Echipa Sigillium", desc: "Colaborare și inovație – valorile din spatele platformei noastre." },
];

function GalleryCarousel() {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    const goTo = useCallback((index: number) => {
        setCurrent((index + slides.length) % slides.length);
    }, []);

    useEffect(() => {
        if (paused) return;
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % slides.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [paused]);

    return (
        <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16 / 9",
                background: "#131614",
                border: "1px solid #2e332e",
                borderRadius: 10,
                overflow: "hidden",
                marginBottom: 16,
            }}>
                {slides.map((slide, i) => (
                    <div key={i} style={{
                        position: "absolute", inset: 0,
                        opacity: i === current ? 1 : 0,
                        transition: "opacity 0.8s ease",
                    }}>
                        <img
                            src={slide.src}
                            alt={slide.title}
                            style={{
                                width: "100%", height: "100%",
                                objectFit: "cover",
                            }}
                        />
                        <div style={{
                            position: "absolute", bottom: 0, left: 0, right: 0,
                            height: "50%",
                            background: "linear-gradient(to top, rgba(13,15,14,0.95), transparent)",
                            pointerEvents: "none",
                        }} />
                        <div style={{
                            position: "absolute", bottom: 0, left: 0, right: 0,
                            padding: "28px 32px",
                        }}>
                            <div style={{
                                fontSize: 20, fontWeight: 500, color: "#e8e4db", marginBottom: 6,
                                fontFamily: "'Cormorant Garamond', serif",
                            }}>
                                {slide.title}
                            </div>
                            <div style={{ fontSize: 13, color: "#9e9b94", maxWidth: 500 }}>
                                {slide.desc}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Prev / Next arrows */}
                <button onClick={() => goTo(current - 1)} aria-label="Imaginea anterioară" style={{
                    position: "absolute", top: "50%", left: 16,
                    transform: "translateY(-50%)",
                    width: 40, height: 40, borderRadius: "50%",
                    background: "rgba(13,15,14,0.7)", border: "1px solid #2e332e",
                    color: "#e8e4db", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    backdropFilter: "blur(4px)",
                    fontSize: 16,
                }}>
                    ‹
                </button>
                <button onClick={() => goTo(current + 1)} aria-label="Imaginea următoare" style={{
                    position: "absolute", top: "50%", right: 16,
                    transform: "translateY(-50%)",
                    width: 40, height: 40, borderRadius: "50%",
                    background: "rgba(13,15,14,0.7)", border: "1px solid #2e332e",
                    color: "#e8e4db", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    backdropFilter: "blur(4px)",
                    fontSize: 16,
                }}>
                    ›
                </button>

                {/* Counter badge */}
                <div style={{
                    position: "absolute", top: 16, right: 16,
                    fontSize: 11, color: "#9e9b94",
                    background: "rgba(13,15,14,0.7)", border: "1px solid #2e332e",
                    padding: "4px 12px", borderRadius: 100,
                    fontFamily: "'DM Mono', monospace",
                    backdropFilter: "blur(4px)",
                }}>
                    {current + 1} / {slides.length}
                </div>
            </div>

            {/* Dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 24 }}>
                {slides.map((_, i) => (
                    <button key={i} onClick={() => goTo(i)} aria-label={`Imaginea ${i + 1}`} style={{
                        width: i === current ? 24 : 8, height: 8,
                        borderRadius: 100, border: "none",
                        background: i === current ? "#c9a84c" : "#2e332e",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                    }} />
                ))}
            </div>

            {/* Thumbnails */}
            <div className="gallery-thumbs" style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gap: 8,
            }}>
                {slides.map((slide, i) => (
                    <button key={i} onClick={() => goTo(i)} style={{
                        position: "relative",
                        aspectRatio: "16 / 10",
                        borderRadius: 6, overflow: "hidden",
                        border: i === current ? "2px solid #c9a84c" : "2px solid #2e332e",
                        cursor: "pointer",
                        background: "none", padding: 0,
                        opacity: i === current ? 1 : 0.5,
                        transition: "all 0.3s ease",
                    }}>
                        <img
                            src={slide.src}
                            alt={slide.title}
                            style={{
                                width: "100%", height: "100%",
                                objectFit: "cover",
                                display: "block",
                            }}
                        />
                    </button>
                ))}
            </div>

            {/* Auto-scroll indicator */}
            <div style={{
                textAlign: "center", marginTop: 20,
                fontSize: 11, color: "#5c5f5a",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
                <div style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: paused ? "#5c5f5a" : "#3ecf6e",
                    transition: "background 0.3s ease",
                }} />
                {paused ? "Derularea automată este pe pauză" : "Derulare automată la fiecare 3 secunde"}
            </div>
        </div>
    );
}

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
