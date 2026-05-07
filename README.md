# Sigillium - Platformă de Certificate Digitale

Sigillium este o platformă completă de emitere, gestionare și verificare a certificatelor digitale. Practic, oferă un mediu securizat prin care organizațiile pot emite diplome sau certificate, participanții le pot stoca și vizualiza ușor, iar administratorii pot monitoriza ce se întâmplă în sistem.

---

## 1. Arhitectură și Tehnologii

Aplicația este construită folosind tehnologii web moderne pentru a fi rapidă și scalabilă:

- **Framework Principal:** [Next.js](https://nextjs.org/) folosind arhitectura App Router (`app/`), care ne ajută cu randarea pe server (SSR) și o structurare clară a paginilor.
- **Bază de Date:** Am ales [PostgreSQL](https://www.postgresql.org/), gestionată direct prin pachetul `pg` (`libs/db.ts`).
- **Autentificare:** Folosim [NextAuth.js v5](https://authjs.dev/getting-started/migrating-to-v5) cu strategia Credentials (pe bază de token-uri JWT). Aici stocăm direct în sesiune id-ul, adresa de email, numele și rolul utilizatorului.
- **Aspect:** Ne-am bazat pe o estetică "Dark Luxury", combinând CSS modular cu stiluri globale. Folosim predominant nuanțe închise cu accente aurii (`#c9a84c`) pentru un aspect minimalist și profesionist.
- **Manipularea Datelor:** Am integrat React Server Actions pentru a trimite formularele (la înregistrare, login sau modificarea profilului) fără a mai avea nevoie de rute API tradiționale.

---

## 2. Structura Bazei de Date

Baza de date este organizată în felul următor:

### Tabele Principale:

1. **`users`**: Stochează datele globale de login pentru absolut toți utilizatorii (id, email, parola criptată și rolul - ADMIN, ORG_OWNER sau PARTICIPANT).
2. **`organizations`**: Reprezintă instituțiile sau companiile care emit tehnic certificatele. Organizația este creată automat în spate atunci când un utilizator își face cont și selectează rolul de "Organizație".
3. **`templates`**: Aici definim șabloanele HTML personalizate pe care organizațiile le încarcă pentru a genera mai târziu PDF-uri.
4. **`certificates`**: Acesta este nucleul aplicației. Stochează datele diplomelor emise (cod unic, titlu, domeniu) și face legătura între participant (`recipient_id`) și emitent (`org_id`).

---

## 3. Cum sunt organizate rutele

Am împărțit aplicația logic în mai multe zone, folosind Route Groups din Next.js.

### Rute Publice:

- **`/`**: Pagina principală de prezentare (Landing).
- **`/login`** / **`/register`**: Paginile unde te poți autentifica sau îți poți crea un cont nou.
- **`/verify/[code]`**: Zona de verificare publică. Orice angajator sau terț poate introduce aici codul unui certificat (de exemplu: `SIG-A3F9C2E1`) pentru a vedea dacă diploma este reală, validă sau dacă a fost revocată.

### Rute Securizate (Dashboard):

1. **Zona Participantului (`/me`)**
   - **`/me`**: Portofoliul de certificate primite și un sumar rapid.
   - **`/me/certificates`**: O listă mai detaliată a diplomelor.
   - **`/me/edit`**: Locul unde participantul își modifică parola sau numele.

2. **Zona Organizației (`/org`)**
   - **`/org`**: Panoul de control de unde o firmă își vede statisticile.
   - **`/org/certificates`**: Istoricul complet al emiterilor făcute de ei.
   - **`/org/settings`**: Opțiunea de a adăuga șabloane HTML pentru viitoarele certificate.
   - **`/org/edit`**: Formularul unde proprietarul firmei își editează atât datele de identificare personale, cât și pe cele ale companiei în același timp.

3. **Zona de Admin (`/admin`)**
   - Accesibilă doar administratorilor supremi, pentru a aproba sau edita organizațiile noi care se înscriu.

---

## 4. Logica din Backend (`libs/`)

Securitatea sistemului se bazează pe acțiunile salvate în `/libs`:

- **`login-action.ts`**: Verifică datele introduse folosind NextAuth.
- **`register-action.ts`**: Folosește librăria `bcrypt` pentru a cripta parola (cu un factor de salt de 10) înainte de a o salva. Face magia de a insera date și în tabela organizațiilor dacă utilizatorul alege acest rol.
- **`update-profile-action.ts`**: Oferă posibilitatea de a actualiza detaliile contului dintr-un singur loc, sincronizând obligatoriu actualizările între colecțiile de tabele asociate.

---

---

## 5. Ghid de Testare pas cu pas

### Pregătirea Bazei de Date (PostgreSQL)

Pentru a rula local proiectul, platforma are nevoie de o bază de date PostgreSQL activă.

1. Creează în rădăcina proiectului un fișier numit `.env.local` dacă nu există deja, și adaugă variabila de conexiune la baza ta de date:
   ```env
   # Exemplu pentru conexiune locală:
   DATABASE_URL="postgresql://postgres:parola_ta@localhost:5432/sigillium"
   ```
2. Deschide fișierul `db/demo_database.sql` inclus în proiect și rulează tot conținutul său în interiorul bazei tale de date `sigillium` (fie prin vizualizatoare precum pgAdmin / DBeaver, fie direct din terminal cu psql):
   ```bash
   psql -U postgres -d sigillium -f db/demo_database.sql
   ```
   _Acest script îți va crea absolut toate tabelele necesare în ordinea corectă și va adăuga imediat utilizatorii de test ca să nu pornești cu o bază de date goală._

### Cum pornești proiectul

1. Deschide terminalul în folderul principal al proiectului:
   ```bash
   npm install
   ```
2. Pornește serverul local de dezvoltare:
   ```bash
   npm run dev
   ```
3. Intră în browser la [http://localhost:3000](http://localhost:3000).

> Notă: Baza de date conține deja câțiva utilizatori prestabiliți pentru comoditate (luați din `db/demo_database.sql`). Le poți folosi direct:

**Conturi Preezistente:**

- **Utilizator/Participant**: `test@example.com` (Parolă: `123456`)
- **Organizație**: `atm@atm.com` (Parolă: `ATM`)
- **Admin**: `admin@example.com` (Parolă: `admin`)

### Scenariul 1: Calitatea de Emitent (Organizația)

1. Intră pe "Creare cont" (`/register`). Completează cu un nume și email, alege o parolă și fii sigur că bifezi la final **"Organizație"**.
2. După ce te loghezi, vei fi dus în secțiunea `/org`.
3. Verifică meniul din stânga. Intră pe _Certificate_ sau pe _Templates_ pentru a observa setările dedicate companiilor.

### Scenariul 2: Calitatea de Cursant (Participantul)

1. Creează un nou cont din `/register`, dar de data aceasta bifează rolul de **"Participant"**.
2. După logare, vei fi redirecționat automat către `/me`.
3. Aici nu mai vezi meniurile complexe ale unei companii, ci un design fomat ca un portofoliu ce afișează toate diplomele obținute.

### Scenariul 3: Actualizarea Profilului

1. Conectează-te fie cu un cont de Participant fie cu un cont de Organizație.
2. Dă un click pe inițialele numelui tău din bara de sus, colțul din dreapta. O să te ducă fie pe `/me/edit` fie pe `/org/edit`.
3. Schimbă detaliile și apasă "Salvează modificările".
4. Schimbarea se procesează instant, fără ca pagina să fie re-încărcată (prin Server Actions), actualizând cu succes datele din baza de date.

### Scenariul 4: Sistemul de Garanție (Antifraudă)

1. Deconectează-te total și navighează pur și simplu ca vizitator pe adresa `/verify`.
2. Introdu un cod precum `SIG-A3F9C2E1` în câmpul de căutare.
3. Astfel, platforma se va asigura că validează public în fața unui presupus angajator realitatea actului tău de studiu.
