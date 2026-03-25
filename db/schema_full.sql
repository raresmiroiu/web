--
-- PostgreSQL database dump
--

\restrict 699J87w0UTcLM7P6cdZ2SKLj7Q4fbnYOofFHds6cFbbZJ45ZlCSlVjiNW4TByUw

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-03-25 18:34:33

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 4965 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 859 (class 1247 OID 24822)
-- Name: user_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_role AS ENUM (
    'ADMIN',
    'ORG_OWNER',
    'PARTICIPANT'
);


ALTER TYPE public.user_role OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 224 (class 1259 OID 24865)
-- Name: certificates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.certificates (
    id integer NOT NULL,
    code text NOT NULL,
    title text NOT NULL,
    type text NOT NULL,
    domain text NOT NULL,
    recipient_id integer,
    org_id integer,
    issued_at date DEFAULT CURRENT_DATE NOT NULL,
    revoked boolean DEFAULT false NOT NULL,
    revoked_at timestamp without time zone,
    verifications integer DEFAULT 0 NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    template_id integer
);


ALTER TABLE public.certificates OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24864)
-- Name: certificates_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.certificates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.certificates_id_seq OWNER TO postgres;

--
-- TOC entry 4966 (class 0 OID 0)
-- Dependencies: 223
-- Name: certificates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.certificates_id_seq OWNED BY public.certificates.id;


--
-- TOC entry 222 (class 1259 OID 24846)
-- Name: organizations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organizations (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    status text DEFAULT 'PENDING'::text NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.organizations OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24845)
-- Name: organizations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.organizations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.organizations_id_seq OWNER TO postgres;

--
-- TOC entry 4967 (class 0 OID 0)
-- Dependencies: 221
-- Name: organizations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.organizations_id_seq OWNED BY public.organizations.id;


--
-- TOC entry 226 (class 1259 OID 24910)
-- Name: templates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.templates (
    id integer NOT NULL,
    org_id integer,
    name character varying(255) NOT NULL,
    html_content text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.templates OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 24909)
-- Name: templates_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.templates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.templates_id_seq OWNER TO postgres;

--
-- TOC entry 4968 (class 0 OID 0)
-- Dependencies: 225
-- Name: templates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.templates_id_seq OWNED BY public.templates.id;


--
-- TOC entry 220 (class 1259 OID 24830)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text,
    role public.user_role DEFAULT 'PARTICIPANT'::public.user_role NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24829)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4969 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4778 (class 2604 OID 24868)
-- Name: certificates id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificates ALTER COLUMN id SET DEFAULT nextval('public.certificates_id_seq'::regclass);


--
-- TOC entry 4775 (class 2604 OID 24849)
-- Name: organizations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations ALTER COLUMN id SET DEFAULT nextval('public.organizations_id_seq'::regclass);


--
-- TOC entry 4783 (class 2604 OID 24913)
-- Name: templates id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.templates ALTER COLUMN id SET DEFAULT nextval('public.templates_id_seq'::regclass);


--
-- TOC entry 4773 (class 2604 OID 24833)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4957 (class 0 OID 24865)
-- Dependencies: 224
-- Data for Name: certificates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.certificates (id, code, title, type, domain, recipient_id, org_id, issued_at, revoked, revoked_at, verifications, created_at, template_id) FROM stdin;
4	SIG-H9I0J1K2	Python pentru date	Curs profesional	Data science	1	1	2025-02-22	f	\N	5	2026-03-19 17:56:17.365606	\N
3	SIG-D5E6F7G8	Securitate Web Avansată	Curs profesional	Securitate web	1	2	2025-01-03	f	\N	2	2026-03-19 17:56:17.365606	\N
9	SIG-PAG-0001	Certificat de Testare Paginare 1	Curs intensiv	Testare Software	1	1	2026-03-23	f	\N	0	2026-03-24 19:26:29.288146	\N
10	SIG-PAG-0002	Certificat de Testare Paginare 2	Curs intensiv	Testare Software	1	1	2026-03-22	f	\N	0	2026-03-24 19:26:29.288146	\N
11	SIG-PAG-0003	Certificat de Testare Paginare 3	Curs intensiv	Testare Software	1	1	2026-03-21	f	\N	0	2026-03-24 19:26:29.288146	\N
12	SIG-PAG-0004	Certificat de Testare Paginare 4	Curs intensiv	Testare Software	1	1	2026-03-20	f	\N	0	2026-03-24 19:26:29.288146	\N
13	SIG-PAG-0005	Certificat de Testare Paginare 5	Curs intensiv	Testare Software	1	1	2026-03-19	f	\N	0	2026-03-24 19:26:29.288146	\N
14	SIG-PAG-0006	Certificat de Testare Paginare 6	Curs intensiv	Testare Software	1	1	2026-03-18	f	\N	0	2026-03-24 19:26:29.288146	\N
15	SIG-PAG-0007	Certificat de Testare Paginare 7	Curs intensiv	Testare Software	1	1	2026-03-17	f	\N	0	2026-03-24 19:26:29.288146	\N
16	SIG-PAG-0008	Certificat de Testare Paginare 8	Curs intensiv	Testare Software	1	1	2026-03-16	f	\N	0	2026-03-24 19:26:29.288146	\N
17	SIG-PAG-0009	Certificat de Testare Paginare 9	Curs intensiv	Testare Software	1	1	2026-03-15	f	\N	0	2026-03-24 19:26:29.288146	\N
18	SIG-PAG-0010	Certificat de Testare Paginare 10	Curs intensiv	Testare Software	1	1	2026-03-14	f	\N	0	2026-03-24 19:26:29.288146	\N
19	SIG-PAG-0011	Certificat de Testare Paginare 11	Curs intensiv	Testare Software	1	1	2026-03-13	f	\N	0	2026-03-24 19:26:29.288146	\N
20	SIG-PAG-0012	Certificat de Testare Paginare 12	Curs intensiv	Testare Software	1	1	2026-03-12	f	\N	0	2026-03-24 19:26:29.288146	\N
21	SIG-PAG-0013	Certificat de Testare Paginare 13	Curs intensiv	Testare Software	1	1	2026-03-11	f	\N	0	2026-03-24 19:26:29.288146	\N
22	SIG-PAG-0014	Certificat de Testare Paginare 14	Curs intensiv	Testare Software	1	1	2026-03-10	f	\N	0	2026-03-24 19:26:29.288146	\N
23	SIG-PAG-0015	Certificat de Testare Paginare 15	Curs intensiv	Testare Software	1	1	2026-03-09	f	\N	0	2026-03-24 19:26:29.288146	\N
24	SIG-PAG-0016	Certificat de Testare Paginare 16	Curs intensiv	Testare Software	1	1	2026-03-08	f	\N	0	2026-03-24 19:26:29.288146	\N
25	SIG-PAG-0017	Certificat de Testare Paginare 17	Curs intensiv	Testare Software	1	1	2026-03-07	f	\N	0	2026-03-24 19:26:29.288146	\N
26	SIG-PAG-0018	Certificat de Testare Paginare 18	Curs intensiv	Testare Software	1	1	2026-03-06	f	\N	0	2026-03-24 19:26:29.288146	\N
27	SIG-PAG-0019	Certificat de Testare Paginare 19	Curs intensiv	Testare Software	1	1	2026-03-05	f	\N	0	2026-03-24 19:26:29.288146	\N
28	SIG-PAG-0020	Certificat de Testare Paginare 20	Curs intensiv	Testare Software	1	1	2026-03-04	f	\N	0	2026-03-24 19:26:29.288146	\N
29	SIG-PAG-0021	Certificat de Testare Paginare 21	Curs intensiv	Testare Software	1	1	2026-03-03	f	\N	0	2026-03-24 19:26:29.288146	\N
30	SIG-PAG-0022	Certificat de Testare Paginare 22	Curs intensiv	Testare Software	1	1	2026-03-02	f	\N	0	2026-03-24 19:26:29.288146	\N
31	SIG-PAG-0023	Certificat de Testare Paginare 23	Curs intensiv	Testare Software	1	1	2026-03-01	f	\N	0	2026-03-24 19:26:29.288146	\N
32	SIG-PAG-0024	Certificat de Testare Paginare 24	Curs intensiv	Testare Software	1	1	2026-02-28	f	\N	0	2026-03-24 19:26:29.288146	\N
8	SIG-D59FA06E	Licenta Calc	Licenta	CTI	4	1	2027-01-12	t	2026-03-23 18:42:47.767361	1	2026-03-20 10:26:53.947817	\N
7	SIG-LIVE0001	Next.js Full Stack	Curs profesional	Web development	1	1	2025-03-19	t	2026-03-19 19:29:56.940466	0	2026-03-19 18:56:18.256664	\N
2	SIG-B7D2F4A9	HackTM 2024 — Finalist	Participare competiție	Securitate informatică	1	1	2024-10-03	t	2026-03-23 18:42:23.573531	7	2026-03-19 17:56:17.365606	\N
5	SIG-L3M4N5O6	DevOps Fundamentals	Curs profesional	DevOps	1	2	2025-03-01	t	2026-03-23 18:45:23.852922	8	2026-03-19 17:56:17.365606	\N
6	SIG-X9Y8Z7W6	React & Next.js Avansat	Curs profesional	Web development	1	2	2025-03-15	t	2026-03-23 18:35:23.25887	6	2026-03-19 18:10:00.584651	\N
33	SIG-PAG-0025	Certificat de Testare Paginare 25	Curs intensiv	Testare Software	1	1	2026-02-27	f	\N	5	2026-03-24 19:26:29.288146	\N
1	SIG-A3F9C2E1	Inginerie Software — Licență	Certificat de absolvire	Inginerie software	1	1	2024-11-14	t	2026-03-23 18:42:26.65095	5	2026-03-19 17:56:17.365606	\N
34	SIG-66632C43	Test1	olimpiada	Info	4	1	2025-01-01	f	\N	3	2026-03-25 15:34:53.765342	\N
\.


--
-- TOC entry 4955 (class 0 OID 24846)
-- Dependencies: 222
-- Data for Name: organizations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.organizations (id, name, email, status, created_at) FROM stdin;
2	CyberSec Academy	info@cybersec.ro	ACTIVE	2026-03-19 17:55:57.576633
3	TechNova SRL	contact@technova.ro	ACTIVE	2026-03-19 17:55:57.576633
1	Academia Digitală	contact@academia.ro	ACTIVE	2026-03-19 17:55:57.576633
4	ACADEMIA STUDII ECONOMICE	ase@ase.ro	ACTIVE	2026-03-23 19:25:35.539749
5	Organizația de Test 1	contact_1@orgtest.ro	ACTIVE	2026-03-24 19:26:29.288146
6	Organizația de Test 2	contact_2@orgtest.ro	ACTIVE	2026-03-24 19:26:29.288146
7	Organizația de Test 3	contact_3@orgtest.ro	ACTIVE	2026-03-24 19:26:29.288146
8	Organizația de Test 4	contact_4@orgtest.ro	ACTIVE	2026-03-24 19:26:29.288146
9	Organizația de Test 5	contact_5@orgtest.ro	ACTIVE	2026-03-24 19:26:29.288146
10	Organizația de Test 6	contact_6@orgtest.ro	ACTIVE	2026-03-24 19:26:29.288146
11	Organizația de Test 7	contact_7@orgtest.ro	ACTIVE	2026-03-24 19:26:29.288146
12	Organizația de Test 8	contact_8@orgtest.ro	ACTIVE	2026-03-24 19:26:29.288146
13	Organizația de Test 9	contact_9@orgtest.ro	ACTIVE	2026-03-24 19:26:29.288146
14	Organizația de Test 10	contact_10@orgtest.ro	ACTIVE	2026-03-24 19:26:29.288146
15	Organizația de Test 11	contact_11@orgtest.ro	ACTIVE	2026-03-24 19:26:29.288146
16	Organizația de Test 12	contact_12@orgtest.ro	ACTIVE	2026-03-24 19:26:29.288146
17	Organizația de Test 13	contact_13@orgtest.ro	ACTIVE	2026-03-24 19:26:29.288146
18	Organizația de Test 14	contact_14@orgtest.ro	ACTIVE	2026-03-24 19:26:29.288146
19	Organizația de Test 15	contact_15@orgtest.ro	ACTIVE	2026-03-24 19:26:29.288146
\.


--
-- TOC entry 4959 (class 0 OID 24910)
-- Dependencies: 226
-- Data for Name: templates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.templates (id, org_id, name, html_content, created_at) FROM stdin;
\.


--
-- TOC entry 4953 (class 0 OID 24830)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, name, role) FROM stdin;
2	admin@example.com	$2b$10$xdspo7yUV1D.1rTAI7/ujuGPwIWM9tvHNGGfYztJ8VXYJ5uOUJCl.	\N	ADMIN
3	atm@atm.com	$2b$10$i1VpHJhKHI6nFQRHMt2NBen9ynrp0vKJy2b6zXS./Uu2WGvPwRX3y	Academia Digitală	ORG_OWNER
1	test@example.com	$2b$10$nzoV17di3tJeLLcYBnaRP.UXvJzW3KkgB1Wq8.4OwlEVdSlAvmqWu	Ion Popescu	PARTICIPANT
4	rares_miroiu@yahoo.com	$2b$10$AeUXdyVcKnKbSeG7FuujEOqjVPETMfv./X.IB8vJ60mWqk1TWBaZ2	Miroiu Rares	PARTICIPANT
5	ase@ase.ro	$2b$10$Bc4bwHHQU/TBHjFLN6BWweO05NnIUJuWAwtQHpsvAO9eMhn6.s8A.	ACADEMIA STUDII ECONOMICE	ORG_OWNER
6	user_test_1@exemplu.com	$2b$10$dummyhash	Utilizator Test 1	PARTICIPANT
7	user_test_2@exemplu.com	$2b$10$dummyhash	Utilizator Test 2	PARTICIPANT
8	user_test_3@exemplu.com	$2b$10$dummyhash	Utilizator Test 3	PARTICIPANT
9	user_test_4@exemplu.com	$2b$10$dummyhash	Utilizator Test 4	PARTICIPANT
10	user_test_5@exemplu.com	$2b$10$dummyhash	Utilizator Test 5	PARTICIPANT
11	user_test_6@exemplu.com	$2b$10$dummyhash	Utilizator Test 6	PARTICIPANT
12	user_test_7@exemplu.com	$2b$10$dummyhash	Utilizator Test 7	PARTICIPANT
13	user_test_8@exemplu.com	$2b$10$dummyhash	Utilizator Test 8	PARTICIPANT
14	user_test_9@exemplu.com	$2b$10$dummyhash	Utilizator Test 9	PARTICIPANT
15	user_test_10@exemplu.com	$2b$10$dummyhash	Utilizator Test 10	PARTICIPANT
16	user_test_11@exemplu.com	$2b$10$dummyhash	Utilizator Test 11	PARTICIPANT
17	user_test_12@exemplu.com	$2b$10$dummyhash	Utilizator Test 12	PARTICIPANT
18	user_test_13@exemplu.com	$2b$10$dummyhash	Utilizator Test 13	PARTICIPANT
19	user_test_14@exemplu.com	$2b$10$dummyhash	Utilizator Test 14	PARTICIPANT
20	user_test_15@exemplu.com	$2b$10$dummyhash	Utilizator Test 15	PARTICIPANT
\.


--
-- TOC entry 4970 (class 0 OID 0)
-- Dependencies: 223
-- Name: certificates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.certificates_id_seq', 34, true);


--
-- TOC entry 4971 (class 0 OID 0)
-- Dependencies: 221
-- Name: organizations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.organizations_id_seq', 19, true);


--
-- TOC entry 4972 (class 0 OID 0)
-- Dependencies: 225
-- Name: templates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.templates_id_seq', 1, false);


--
-- TOC entry 4973 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 20, true);


--
-- TOC entry 4796 (class 2606 OID 24886)
-- Name: certificates certificates_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificates
    ADD CONSTRAINT certificates_code_key UNIQUE (code);


--
-- TOC entry 4798 (class 2606 OID 24884)
-- Name: certificates certificates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificates
    ADD CONSTRAINT certificates_pkey PRIMARY KEY (id);


--
-- TOC entry 4790 (class 2606 OID 24863)
-- Name: organizations organizations_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_email_key UNIQUE (email);


--
-- TOC entry 4792 (class 2606 OID 24861)
-- Name: organizations organizations_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_name_key UNIQUE (name);


--
-- TOC entry 4794 (class 2606 OID 24859)
-- Name: organizations organizations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);


--
-- TOC entry 4800 (class 2606 OID 24921)
-- Name: templates templates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.templates
    ADD CONSTRAINT templates_pkey PRIMARY KEY (id);


--
-- TOC entry 4786 (class 2606 OID 24844)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4788 (class 2606 OID 24842)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4801 (class 2606 OID 24892)
-- Name: certificates certificates_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificates
    ADD CONSTRAINT certificates_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE SET NULL;


--
-- TOC entry 4802 (class 2606 OID 24887)
-- Name: certificates certificates_recipient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificates
    ADD CONSTRAINT certificates_recipient_id_fkey FOREIGN KEY (recipient_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- TOC entry 4803 (class 2606 OID 24927)
-- Name: certificates certificates_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificates
    ADD CONSTRAINT certificates_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.templates(id) ON DELETE SET NULL;


--
-- TOC entry 4804 (class 2606 OID 24922)
-- Name: templates templates_org_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.templates
    ADD CONSTRAINT templates_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


-- Completed on 2026-03-25 18:34:34

--
-- PostgreSQL database dump complete
--

\unrestrict 699J87w0UTcLM7P6cdZ2SKLj7Q4fbnYOofFHds6cFbbZJ45ZlCSlVjiNW4TByUw

