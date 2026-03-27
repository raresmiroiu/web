import { useState, useEffect, useCallback } from "react";

const slides = [
    { src: "/gallery/ceremony.png", title: "Ceremonia de certificare", desc: "Momente de excelență la ceremonia oficială de acordare a certificatelor." },
    { src: "/gallery/digital.png", title: "Certificare digitală", desc: "Vizualizarea certificatelor digitale cu QR code direct din dashboard." },
    { src: "/gallery/graduation.png", title: "Absolvire", desc: "Absolvenții sărbătoresc finalizarea programului de certificare." },
    { src: "/gallery/seal.png", title: "Sigiliul autenticității", desc: "Fiecare certificat poartă sigiliul unic Sigillium care garantează autenticitatea." },
    { src: "/gallery/qrcode.png", title: "Verificare instantă", desc: "Scanează codul QR pentru a verifica autenticitatea oricărui certificat." },
    { src: "/gallery/team.png", title: "Echipa Sigillium", desc: "Colaborare și inovație – valorile din spatele platformei noastre." },
];

export default function GalleryCarousel() {
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