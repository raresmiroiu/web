import NavbarMain from "@/components/NavbarMain";
import VerifySearch from "@/components/verify/VerifySearch";
import "@/app/landing.css";

export default function VerifyPage() {
    return (
        <main style={{ background: "var(--bg)", minHeight: "100vh", fontFamily: "'Outfit', sans-serif" }}>
            <NavbarMain />
            <div style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                textAlign: "center",
                padding: "120px 24px 80px",
                position: "relative",
            }}>
                <div style={{
                    position: "absolute", top: "40%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 600, height: 400,
                    background: "radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 65%)",
                    pointerEvents: "none",
                }} />

                <p style={{ fontSize: 10, color: "var(--gold)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14 }}>
                    Verificare publică
                </p>

                <h1 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300,
                    color: "var(--text)", marginBottom: 10, lineHeight: 1.1,
                }}>
                    Verifică un certificat <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Sigillium</em>
                </h1>

                <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 36 }}>
                    Introdu codul unic al certificatului pentru a verifica autenticitatea acestuia.
                </p>

                <VerifySearch />

                <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 12 }}>
                    Codul se găsește pe certificatul PDF sau prin scanarea codului QR.
                </p>
            </div>
        </main>
    );
}