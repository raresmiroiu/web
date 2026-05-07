-- -----------------------------------------------------------------------------
-- 1. ȘTERGEREA STRUCTURII VECHI (CURĂȚARE TOTALĂ)
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS certificates CASCADE;
DROP TABLE IF EXISTS templates CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;

-- -----------------------------------------------------------------------------
-- 2. CREAREA STRUCTURII DE BAZĂ
-- -----------------------------------------------------------------------------
CREATE TYPE user_role AS ENUM('ADMIN', 'ORG_OWNER', 'PARTICIPANT');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    role user_role NOT NULL DEFAULT 'PARTICIPANT'
);

CREATE TABLE organizations (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE templates (
    -- Folosim UUID pentru a se potrivi cu logica din aplicație
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    html_content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE certificates (
    id SERIAL PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    domain TEXT NOT NULL,
    recipient_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    org_id INTEGER REFERENCES organizations(id) ON DELETE SET NULL,
    template_id UUID REFERENCES templates(id) ON DELETE SET NULL,
    issued_at DATE NOT NULL DEFAULT CURRENT_DATE,
    revoked BOOLEAN NOT NULL DEFAULT FALSE,
    revoked_at TIMESTAMP,
    verifications INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 3. INSERAREA CONTURILOR DIN README (OBLIGATORII)
-- -----------------------------------------------------------------------------

-- 3.1. CONT DE PARTICIPANT (Parola: 123456)
INSERT INTO users(email, name, password, role)
VALUES ('test@example.com', 'Participant Demo', '$2b$10$DmTZk8ZWLKcGWml/FM/r2OBb7NB78OgPyuaijTVUiF028036AP4fu', 'PARTICIPANT');

-- 3.2. CONT DE ADMIN (Parola: admin)
INSERT INTO users(email, name, password, role)
VALUES ('admin@example.com', 'Administrator Suprem', '$2b$10$9l7nGPiJTeJNQdfO6VKa1O4.2hvzTrHlb6ysMBg90EFpwvYpPD2OW', 'ADMIN');

-- 3.3. CONT DE ORGANIZAȚIE (Parola: ATM)
INSERT INTO users(email, name, password, role)
VALUES ('atm@atm.com', 'Academia Tehnică Militară', '$2b$10$HZnTX9kb8.SUQaB1UkuCf.BQbciiMyGf2QDAvxvVWGV6/19yephCm', 'ORG_OWNER');


-- Alte conturi ajutătoare pentru a popula datele (Parola pentru toate: demo1234)
INSERT INTO users(email, name, password, role) VALUES 
('office@infoeducatie.ro', 'InfoEducație România', '$2b$10$ZQ9vsCEPbrjU2PCW.1cQi.BgLKW0tkm9I8.BEyotiuaMZNliagtWq', 'ORG_OWNER'),
('contact@rocsf.ro', 'Societatea Română de Cibernetică', '$2b$10$ZQ9vsCEPbrjU2PCW.1cQi.BgLKW0tkm9I8.BEyotiuaMZNliagtWq', 'ORG_OWNER'),
('ana.ionescu@gmail.com', 'Ana-Maria Ionescu', '$2b$10$ZQ9vsCEPbrjU2PCW.1cQi.BgLKW0tkm9I8.BEyotiuaMZNliagtWq', 'PARTICIPANT');

-- -----------------------------------------------------------------------------
-- 4. INSERAREA ORGANIZAȚIILOR
-- -----------------------------------------------------------------------------
INSERT INTO organizations (name, email, status) VALUES
('Academia Tehnică Militară', 'atm@atm.com', 'ACTIVE'),
('InfoEducație România', 'office@infoeducatie.ro', 'ACTIVE'),
('Societatea Română de Cibernetică și Securitate', 'contact@rocsf.ro', 'ACTIVE');

-- -----------------------------------------------------------------------------
-- 5. TEMPLATE-URI HTML SPECIALE PENTRU DEMONSTRAȚIE
-- -----------------------------------------------------------------------------
INSERT INTO templates (org_id, name, html_content) VALUES
(
  (SELECT id FROM organizations WHERE name = 'Academia Tehnică Militară'),
  'Diplomă Academică ATM',
  '<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <style>
    @import url(''https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Lato:wght@300;400&display=swap'');
    body { margin: 0; background: #fdf8f0; font-family: ''Lato'', sans-serif; }
    .page { width: 842px; min-height: 595px; padding: 48px 64px; box-sizing: border-box;
            background: #fdf8f0; border: 2px solid #1a2a4e; position: relative; }
    .border-inner { position: absolute; inset: 10px; border: 1px solid #c5a028; pointer-events: none; }
    .logo-area { text-align: center; margin-bottom: 12px; }
    .university { font-size: 13px; color: #1a2a4e; letter-spacing: 3px; text-transform: uppercase; }
    .seal { width: 70px; height: 70px; border-radius: 50%; background: #1a2a4e;
            display: flex; align-items: center; justify-content: center; margin: 12px auto;
            color: #fdf8f0; font-size: 22px; font-family: ''Cormorant Garamond'', serif; }
    h1 { text-align: center; font-family: ''Cormorant Garamond'', serif; font-size: 38px;
         color: #1a2a4e; margin: 16px 0 8px; font-weight: 600; }
    .subtitle { text-align: center; font-size: 13px; color: #c5a028; letter-spacing: 2px;
                text-transform: uppercase; margin-bottom: 28px; }
    .body-text { text-align: center; line-height: 1.8; color: #333; font-size: 14px; }
    .recipient { font-family: ''Cormorant Garamond'', serif; font-size: 28px; font-style: italic;
                 color: #1a2a4e; display: block; margin: 8px 0; border-bottom: 1px solid #ccc; padding-bottom: 5px; width: 60%; margin-left: auto; margin-right: auto;}
    .course { font-weight: 600; font-size: 16px; color: #1a2a4e; text-transform: uppercase;}
    .footer { display: flex; justify-content: space-between; margin-top: 50px; font-size: 12px; color: #555; }
    .code { font-family: monospace; background: rgba(26,42,78,.08); padding: 4px 8px; border-radius: 4px; font-size: 13px; font-weight: bold;}
    .signatures { display: flex; justify-content: space-between; margin-top: 40px; }
    .sig-block { text-align: center; border-top: 1px solid #999; padding-top: 8px; width: 200px; font-family: ''Cormorant Garamond'', serif; font-style: italic;}
  </style>
</head>
<body>
  <div class="page">
    <div class="border-inner"></div>
    <div class="logo-area">
      <div class="university">Academia Tehnică Militară "Ferdinand I"</div>
      <div class="seal">ATM</div>
    </div>
    <h1>DIPLOMĂ DE ABSOLVIRE</h1>
    <div class="subtitle">Se atestă pregătirea de excelență</div>
    <div class="body-text">
      Senatul Universitar confirmă prin prezenta că<br>
      <span class="recipient">{{recipientName}}</span>
      a parcurs și promovat cu succes programul de formare <br>
      <span class="course">{{title}}</span><br>
      dobândind toate competențele teoretice și practice aferente.
    </div>
    <div class="signatures">
       <div class="sig-block">Rector - Comandant</div>
       <div class="sig-block">Decan</div>
    </div>
    <div class="footer">
      <div>Dată emitere: <strong>{{issuedAt}}</strong></div>
      <div>Act emis sub codul unic: <span class="code">{{code}}</span></div>
    </div>
  </div>
</body>
</html>'
),
(
  (SELECT id FROM organizations WHERE name = 'Societatea Română de Cibernetică și Securitate'),
  'Atestat CyberSecurity',
  '<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <style>
    @import url(''https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;600;700&display=swap'');
    body { margin: 0; background: #050a05; font-family: ''Rajdhani'', sans-serif; }
    .page { width: 842px; min-height: 595px; padding: 40px 56px; box-sizing: border-box;
            background: #050a05; border: 1px solid #0f3a0f; position: relative; }
    .grid { position: absolute; inset: 0;
            background-image: linear-gradient(rgba(0,255,65,.03) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(0,255,65,.03) 1px, transparent 1px);
            background-size: 24px 24px; }
    .corner { position: absolute; width: 20px; height: 20px; }
    .corner.tl { top: 20px; left: 20px; border-top: 2px solid #00ff41; border-left: 2px solid #00ff41; }
    .corner.tr { top: 20px; right: 20px; border-top: 2px solid #00ff41; border-right: 2px solid #00ff41; }
    .corner.bl { bottom: 20px; left: 20px; border-bottom: 2px solid #00ff41; border-left: 2px solid #00ff41; }
    .corner.br { bottom: 20px; right: 20px; border-bottom: 2px solid #00ff41; border-right: 2px solid #00ff41; }
    .header { display: flex; align-items: center; gap: 16px; margin-bottom: 32px; }
    .shield { width: 48px; height: 48px; background: rgba(0,255,65,.1);
              border: 1px solid rgba(0,255,65,.4); border-radius: 4px;
              display: flex; align-items: center; justify-content: center; font-size: 22px; }
    .org-name { font-size: 13px; color: #00ff41; letter-spacing: 2px; text-transform: uppercase; }
    .org-sub  { font-size: 10px; color: rgba(0,255,65,.5); font-family: ''Share Tech Mono'', monospace; }
    .scan-line { height: 2px; background: linear-gradient(90deg, transparent, #00ff41, transparent); margin: 0 0 28px; }
    h1 { font-size: 36px; color: #fff; font-weight: 700; text-transform: uppercase;
         letter-spacing: 4px; margin: 0 0 4px; }
    .label { font-size: 9px; color: rgba(0,255,65,.5); letter-spacing: 4px; text-transform: uppercase; margin-bottom: 24px;
             font-family: ''Share Tech Mono'', monospace; }
    .name { font-size: 28px; color: #00ff41; font-weight: 600; margin-bottom: 8px; }
    .desc { font-size: 15px; color: rgba(255,255,255,.8); line-height: 1.6; max-width: 600px; }
    .footer { display: flex; justify-content: space-between; margin-top: 40px;
              font-family: ''Share Tech Mono'', monospace; font-size: 12px; color: rgba(0,255,65,.8); background: rgba(0,255,65,.1); padding: 10px; border-radius: 5px;}
  </style>
</head>
<body>
  <div class="page">
    <div class="grid"></div>
    <div class="corner tl"></div><div class="corner tr"></div>
    <div class="corner bl"></div><div class="corner br"></div>
    <div class="header">
      <div class="shield">🛡</div>
      <div>
        <div class="org-name">Soc. Română de Cibernetică și Securitate</div>
        <div class="org-sub">// CERTIFIED SECURITY PROFESSIONAL //</div>
      </div>
    </div>
    <div class="scan-line"></div>
    <h1>Atestat de Competență</h1>
    <div class="label">// atestare tehnica securizata //</div>
    <div class="name">{{recipientName}}</div>
    <div class="desc">Agentul a demonstrat competențe avansate în operațiuni de <strong style="color:#fff">{{title}}</strong>,
    trecând toate simulările și evaluările tehnice de penetrare din infrastructura platformei.</div>
    <div class="footer">
      <div>TIMESTAMP: {{issuedAt}}</div>
      <div>UID VERIFICARE: {{code}}</div>
    </div>
  </div>
</body>
</html>'
);


-- -----------------------------------------------------------------------------
-- 6. INSERAREA CERTIFICATELOR DEMO PENTRU `test@example.com`
-- Acum cand intri cu `test@example.com`, vei vedea portofoliul plin!
-- -----------------------------------------------------------------------------
INSERT INTO certificates (code, title, type, domain, recipient_id, org_id, issued_at, revoked, verifications, template_id)
VALUES
-- 3 Diplome de la Academia Tehnică Militară
(
  'SIG-ATM-2024-001',
  'Inginerie Software — Studii de Licență',
  'Diplomă de licență',
  'Inginerie software',
  (SELECT id FROM users WHERE email = 'test@example.com'),
  (SELECT id FROM organizations WHERE name = 'Academia Tehnică Militară'),
  '2024-07-20',
  false,
  45, -- Verificări multe, arată interesant în dashboard
  (SELECT id FROM templates WHERE name = 'Diplomă Academică ATM' LIMIT 1)
),
(
  'SIG-ATM-2025-002',
  'Securitatea Informației și a Sistemelor de Comunicații',
  'Diplomă de master',
  'Securitate cibernetică',
  (SELECT id FROM users WHERE email = 'test@example.com'),
  (SELECT id FROM organizations WHERE name = 'Academia Tehnică Militară'),
  '2025-06-15',
  false,
  12,
  (SELECT id FROM templates WHERE name = 'Diplomă Academică ATM' LIMIT 1)
),
(
  'SIG-ATM-2023-003',
  'Atestat Participare: Modele Matematice în Criptografie',
  'Certificat de participare',
  'Criptografie',
  (SELECT id FROM users WHERE email = 'test@example.com'),
  (SELECT id FROM organizations WHERE name = 'Academia Tehnică Militară'),
  '2023-11-10',
  true, -- Punem un certificat revocat intenționat pentru demo
  3,
  (SELECT id FROM templates WHERE name = 'Diplomă Academică ATM' LIMIT 1)
),

-- Certificate de la Alte Organizații
(
  'SIG-ROCSF-2025-004',
  'Offensive Security Certified Professional (OSCP)',
  'Certificare internațională',
  'Securitate cibernetică',
  (SELECT id FROM users WHERE email = 'test@example.com'),
  (SELECT id FROM organizations WHERE name = 'Societatea Română de Cibernetică și Securitate'),
  '2025-02-14',
  false,
  28,
  (SELECT id FROM templates WHERE name = 'Atestat CyberSecurity' LIMIT 1)
),
(
  'SIG-IEDU-2024-005',
  'Hackathon Național: Smart City Solutions - Câștigător',
  'Premiu competiție',
  'Dezvoltare Web',
  (SELECT id FROM users WHERE email = 'test@example.com'),
  (SELECT id FROM organizations WHERE name = 'InfoEducație România'),
  '2024-10-05',
  false,
  5,
  NULL -- Folosește design-ul default al aplicației
),

-- Mai adăugăm un certificat pentru Ana Ionescu doar ca să existe statistici diverse la organizație
(
  'SIG-ATM-2025-006',
  'Licență CTI',
  'Diplomă',
  'IT',
  (SELECT id FROM users WHERE email = 'ana.ionescu@gmail.com'),
  (SELECT id FROM organizations WHERE name = 'Academia Tehnică Militară'),
  '2025-01-01',
  false,
  2,
  (SELECT id FROM templates WHERE name = 'Diplomă Academică ATM' LIMIT 1)
);

-- Marcam data de revocare pentru certificatul revocat
UPDATE certificates SET revoked_at = '2024-05-12 10:00:00' WHERE code = 'SIG-ATM-2023-003';
