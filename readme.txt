ARHITECTURA TEMPLATE-URILOR

Aplicatia este construita cu Next.js (App Router) si TypeScript.
Paginile sunt organizate in urmatoarele sectiuni (route groups):

  - app/(auth)/        -> pagini publice: login, register
  - app/(dashboard)/  -> zone protejate: /me, /org, /admin
  - app/about/        -> pagina de prezentare a echipei
  - app/contact/      -> formular de contact
  - app/gallery/      -> galerie de imagini cu auto-scroll
  - app/verify/       -> verificare publica a certificatelor

Componentele reutilizabile sunt in /components si sunt grupate pe zone:
  landing/, auth/, me/, org/, admin/, verify/, gallery/

Autentificarea este gestionata de NextAuth.js v5 cu strategie JWT.
Baza de date este PostgreSQL, accesata direct prin pachetul `pg`.

CONTRIBUTII SI ORIGINALITATE
  - Sistem de verificare anti-frauda cu cod unic per certificat (ex: SIG-XXXXXXXX).
  - Generare PDF dinamica pe baza de template-uri HTML incarcate de organizatii.
  - Paginatie generica reutilizabila (components/Pagination.tsx).

CONFIGURARE BAZA DE DATE LOCALA
  1. Instaleaza PostgreSQL (https://www.postgresql.org/download/).
  2. Deschide psql sau pgAdmin si creeaza o baza de date noua:
       CREATE DATABASE sigillium;
  3. Ruleaza scriptul de initializare din radacina proiectului:
       psql -U postgres -d sigillium -f db/demo_database.sql
     Acesta creeaza tabelele si populeaza datele demo automat.
     Se poate crea si grafic prin pgAdmin4.
  4. Seteaza variabila de mediu in fisierul .env.local:
       DATABASE_URL="postgresql://postgres:PAROLA@localhost:5432/sigillium"
  5. Ruleaza: npm install && npm run dev
  6. Acceseaza http://localhost:3000

Conturi demo (dupa rularea db/demo_database.sql):
  - Participant : test@example.com     / 123456
  - Organizatie : atm@atm.com         / ATM
  - Admin       : admin@example.com   / admin

Functionalitati principale:
  - /register  -> creare cont cu selectie rol (Participant sau Organizatie)
  - /me        -> portofoliu certificate pentru participanti
  - /org       -> panou de control pentru organizatii (emitere, template-uri)
  - /admin     -> aprobare organizatii noi (doar ADMIN)
  - /verify    -> verificare publica a unui certificat dupa cod unic
  - /gallery   -> galerie vizuala a platformei
  - /about     -> informatii despre echipa
  - /contact   -> formular de contact
