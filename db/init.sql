-- Tabela pentru tipurile de roluri
CREATE TYPE user_role AS ENUM('ADMIN', 'ORG_OWNER', 'PARTICIPANT');

-- 1. Tabelul USERS
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    role user_role NOT NULL DEFAULT 'PARTICIPANT'
);

-- Inserarea Conturilor Publice (Credentialele din README)
-- Parola pentru test@example.com (Participant) -> '123456'
INSERT INTO users(email, name, password, role)
VALUES ('test@example.com', 'Participant Demo', '$2b$10$DmTZk8ZWLKcGWml/FM/r2OBb7NB78OgPyuaijTVUiF028036AP4fu', 'PARTICIPANT');

-- Parola pentru admin@example.com (Administrator) -> 'admin'
INSERT INTO users(email, name, password, role)
VALUES ('admin@example.com', 'Administrator Suprem', '$2b$10$9l7nGPiJTeJNQdfO6VKa1O4.2hvzTrHlb6ysMBg90EFpwvYpPD2OW', 'ADMIN');

-- Parola pentru atm@atm.com (Organizație) -> 'ATM'
INSERT INTO users(email, name, password, role)
VALUES ('atm@atm.com', 'Academia Tehnică Militară', '$2b$10$HZnTX9kb8.SUQaB1UkuCf.BQbciiMyGf2QDAvxvVWGV6/19yephCm', 'ORG_OWNER'); 

-- 2. Tabelul ORGANIZATIONS
CREATE TABLE organizations (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Inserarea Organizațiilor
INSERT INTO organizations (name, email, status) VALUES
('Academia Tehnică Militară', 'atm@atm.com', 'ACTIVE'),
('Academia Digitală', 'contact@academia.ro', 'ACTIVE'),
('CyberSec Academy', 'info@cybersec.ro', 'ACTIVE'),
('TechNova SRL', 'contact@technova.ro', 'PENDING');

-- 3. Tabelul TEMPLATES
CREATE TABLE templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    html_content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabelul CERTIFICATES
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

-- Inserarea de certificate de probă
INSERT INTO certificates (code, title, type, domain, recipient_id, org_id, issued_at) VALUES
('SIG-A3F9C2E1', 'Inginerie Software — Licență', 'Certificat de absolvire', 'Inginerie software',
    (SELECT id FROM users WHERE email = 'test@example.com'),
    (SELECT id FROM organizations WHERE name = 'Academia Tehnică Militară'),
    '2024-11-14'),
('SIG-B7D2F4A9', 'HackTM 2024 — Finalist', 'Participare competiție', 'Securitate informatică',
    (SELECT id FROM users WHERE email = 'test@example.com'),
    (SELECT id FROM organizations WHERE name = 'Academia Digitală'),
    '2024-10-03'),
('SIG-D5E6F7G8', 'Securitate Web Avansată', 'Curs profesional', 'Securitate web',
    (SELECT id FROM users WHERE email = 'test@example.com'),
    (SELECT id FROM organizations WHERE name = 'CyberSec Academy'),
    '2025-01-03'),
('SIG-H9I0J1K2', 'Python pentru date', 'Curs profesional', 'Data science',
    (SELECT id FROM users WHERE email = 'test@example.com'),
    (SELECT id FROM organizations WHERE name = 'Academia Digitală'),
    '2025-02-22'),
('SIG-L3M4N5O6', 'DevOps Fundamentals', 'Curs profesional', 'DevOps',
    (SELECT id FROM users WHERE email = 'test@example.com'),
    (SELECT id FROM organizations WHERE name = 'CyberSec Academy'),
    '2025-03-01');

-- Popularea stadiilor false de verificare/revocare
UPDATE certificates SET revoked = TRUE, revoked_at = NOW() WHERE code = 'SIG-H9I0J1K2';

UPDATE certificates SET verifications = 3 WHERE code = 'SIG-A3F9C2E1';
UPDATE certificates SET verifications = 7 WHERE code = 'SIG-B7D2F4A9';
UPDATE certificates SET verifications = 2 WHERE code = 'SIG-D5E6F7G8';
UPDATE certificates SET verifications = 1 WHERE code = 'SIG-H9I0J1K2';
UPDATE certificates SET verifications = 8 WHERE code = 'SIG-L3M4N5O6';