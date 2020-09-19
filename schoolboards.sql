--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.user_programs DROP CONSTRAINT user_programs_user_id_fkey;
ALTER TABLE ONLY public.user_programs DROP CONSTRAINT user_programs_program_id_fkey;
ALTER TABLE ONLY public.programs DROP CONSTRAINT programs_college_id_fkey;
ALTER TABLE ONLY public.program_requirements DROP CONSTRAINT program_requirements_requirement_type_fkey;
ALTER TABLE ONLY public.program_requirements DROP CONSTRAINT program_requirements_program_id_fkey;
ALTER TABLE ONLY public.prerequisites DROP CONSTRAINT prerequisites_program_id_fkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
ALTER TABLE ONLY public.user_programs DROP CONSTRAINT user_programs_pkey;
ALTER TABLE ONLY public.requirement DROP CONSTRAINT requirement_pkey;
ALTER TABLE ONLY public.programs DROP CONSTRAINT programs_pkey;
ALTER TABLE ONLY public.program_requirements DROP CONSTRAINT program_requirements_pkey;
ALTER TABLE ONLY public.prerequisites DROP CONSTRAINT prerequisites_pkey;
ALTER TABLE ONLY public.colleges DROP CONSTRAINT colleges_pkey;
ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
ALTER TABLE public.user_programs ALTER COLUMN user_program_id DROP DEFAULT;
ALTER TABLE public.programs ALTER COLUMN program_id DROP DEFAULT;
ALTER TABLE public.program_requirements ALTER COLUMN program_requirements_id DROP DEFAULT;
ALTER TABLE public.prerequisites ALTER COLUMN prerequisites_id DROP DEFAULT;
ALTER TABLE public.colleges ALTER COLUMN college_id DROP DEFAULT;
DROP SEQUENCE public.users_user_id_seq;
DROP TABLE public.users;
DROP SEQUENCE public.user_programs_user_program_id_seq;
DROP TABLE public.user_programs;
DROP TABLE public.requirement;
DROP SEQUENCE public.programs_program_id_seq;
DROP TABLE public.programs;
DROP SEQUENCE public.program_requirements_program_requirements_id_seq;
DROP TABLE public.program_requirements;
DROP SEQUENCE public.prerequisites_prerequisites_id_seq;
DROP TABLE public.prerequisites;
DROP SEQUENCE public.colleges_college_id_seq;
DROP TABLE public.colleges;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: colleges; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.colleges (
    college_id integer NOT NULL,
    name character varying,
    state character varying,
    city character varying,
    longitude double precision,
    latitude double precision
);


--
-- Name: colleges_college_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.colleges_college_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: colleges_college_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.colleges_college_id_seq OWNED BY public.colleges.college_id;


--
-- Name: prerequisites; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.prerequisites (
    prerequisites_id integer NOT NULL,
    program_id integer NOT NULL,
    name character varying,
    units integer,
    grade character varying,
    status character varying
);


--
-- Name: prerequisites_prerequisites_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.prerequisites_prerequisites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: prerequisites_prerequisites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.prerequisites_prerequisites_id_seq OWNED BY public.prerequisites.prerequisites_id;


--
-- Name: program_requirements; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.program_requirements (
    program_requirements_id integer NOT NULL,
    program_id integer NOT NULL,
    requirement_type character varying NOT NULL,
    status character varying,
    date character varying
);


--
-- Name: program_requirements_program_requirements_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.program_requirements_program_requirements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: program_requirements_program_requirements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.program_requirements_program_requirements_id_seq OWNED BY public.program_requirements.program_requirements_id;


--
-- Name: programs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.programs (
    program_id integer NOT NULL,
    college_id integer NOT NULL,
    name character varying,
    cohort character varying,
    minimum_gpa character varying,
    label character varying,
    link character varying
);


--
-- Name: programs_program_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.programs_program_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: programs_program_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.programs_program_id_seq OWNED BY public.programs.program_id;


--
-- Name: requirement; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.requirement (
    requirement_type character varying NOT NULL
);


--
-- Name: user_programs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_programs (
    user_program_id integer NOT NULL,
    user_id integer NOT NULL,
    program_id integer NOT NULL
);


--
-- Name: user_programs_user_program_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_programs_user_program_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_programs_user_program_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_programs_user_program_id_seq OWNED BY public.user_programs.user_program_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    email character varying,
    password character varying
);


--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: colleges college_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.colleges ALTER COLUMN college_id SET DEFAULT nextval('public.colleges_college_id_seq'::regclass);


--
-- Name: prerequisites prerequisites_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prerequisites ALTER COLUMN prerequisites_id SET DEFAULT nextval('public.prerequisites_prerequisites_id_seq'::regclass);


--
-- Name: program_requirements program_requirements_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.program_requirements ALTER COLUMN program_requirements_id SET DEFAULT nextval('public.program_requirements_program_requirements_id_seq'::regclass);


--
-- Name: programs program_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.programs ALTER COLUMN program_id SET DEFAULT nextval('public.programs_program_id_seq'::regclass);


--
-- Name: user_programs user_program_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_programs ALTER COLUMN user_program_id SET DEFAULT nextval('public.user_programs_user_program_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: colleges; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.colleges (college_id, name, state, city, longitude, latitude) FROM stdin;
110653	University of California - Irvine	CA	Irvine	-117.841247999999993	33.6484340000000017
123961	University of Southern California	CA	Los Angeles	-118.283857999999995	34.0210579999999965
199120	University of North Carolina at Chapel Hill	NC	Chapel Hill	-79.0509689999999949	35.9121650000000017
204796	Ohio State University - Main Campus	OH	Columbus	-83.0090009999999978	39.9983890000000031
236948	University of Washington - Seattle Campus	WA	Seattle	-122.313114999999996	47.656213000000001
134097	Florida State University	FL	Tallahassee	-84.2948010000000068	30.4420999999999999
134130	University of Florida	FL	Gainesville	-82.3399579999999958	29.6494280000000003
147767	Northwestern University	IL	Evanston	-87.6736530000000016	42.0583770000000001
127741	University of Northern Colorado	CO	Greeley	-104.701721000000006	40.4031779999999969
145813	Illinois State University	IL	Normal	-88.9923399999999987	40.5097239999999985
200280	University of North Dakota	ND	Grand Forks	-97.0734510000000057	47.9197739999999968
142443	North Idaho College	ID	Coeur d'Alene	-116.798399000000003	47.6764160000000032
171100	Michigan State University	MI	East Lansing	-84.4761110000000031	42.7321200000000019
170082	Grand Valley State University	MI	Allendale	-85.8875189999999975	42.965207999999997
110635	University of California - Berkeley	CA	Berkeley	-122.260423000000003	37.871969
110644	University of California - Davis	CA	Davis	-121.751958000000002	38.5398950000000013
\.


--
-- Data for Name: prerequisites; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.prerequisites (prerequisites_id, program_id, name, units, grade, status) FROM stdin;
11	2	Econ	4	 	Planned
13	10	Bio	4	A	Complete
14	11	Bio	4	A	In-Progress
15	4	Bio	4	A	In-Progress
16	3	Bio	4	A	Complete
17	11	Chem	4	A	Complete
18	10	Chem	4	A	Complete
21	4	Physio	4		Planned
23	2	Bio	4	A	Complete
24	3	Anatomy	4	A	In-Progress
25	11	Speech	4	A	Complete
26	10	Calc	4	B	Complete
27	4	Chem	4	B	Complete
28	2	Anatomy	4	B	Complete
\.


--
-- Data for Name: program_requirements; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.program_requirements (program_requirements_id, program_id, requirement_type, status, date) FROM stdin;
\.


--
-- Data for Name: programs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.programs (program_id, college_id, name, cohort, minimum_gpa, label, link) FROM stdin;
2	110653	PharmD	Fall 2020	3.0	Match	https://pharmsci.uci.edu/
3	199120	PharmD	Fall 2021	2.8	Reach	https://www.usnews.com/best-graduate-schools/top-health-schools/university-of-north-carolina-at-chapel-hill-199120
4	204796	PharmD	Summer 2021	2.5	Match	https://www.usnews.com/best-graduate-schools/top-health-schools/ohio-state-university-columbus-204796
10	147767	pharmD	Winter 2020	3.0	Reach	https://prospective.westernu.edu/pharmacy/pharmd/requirements/
11	127741	PharmD	Winter 2020	2.0	Safety	asf
20	110644	sfwef	choose	efw	Safety	wefwef
\.


--
-- Data for Name: requirement; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.requirement (requirement_type) FROM stdin;
\.


--
-- Data for Name: user_programs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_programs (user_program_id, user_id, program_id) FROM stdin;
2	1	2
3	1	3
4	1	4
10	1	10
11	1	11
20	1	20
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (user_id, first_name, last_name, email, password) FROM stdin;
1	Julie	Hu	julie@user.com	123
2	hackbright 	unicorn	hb@user.com	123
3	Julie 	Hu	julie2@user.com	123
\.


--
-- Name: colleges_college_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.colleges_college_id_seq', 1, false);


--
-- Name: prerequisites_prerequisites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.prerequisites_prerequisites_id_seq', 28, true);


--
-- Name: program_requirements_program_requirements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.program_requirements_program_requirements_id_seq', 1, false);


--
-- Name: programs_program_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.programs_program_id_seq', 20, true);


--
-- Name: user_programs_user_program_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_programs_user_program_id_seq', 20, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_user_id_seq', 3, true);


--
-- Name: colleges colleges_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.colleges
    ADD CONSTRAINT colleges_pkey PRIMARY KEY (college_id);


--
-- Name: prerequisites prerequisites_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prerequisites
    ADD CONSTRAINT prerequisites_pkey PRIMARY KEY (prerequisites_id);


--
-- Name: program_requirements program_requirements_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.program_requirements
    ADD CONSTRAINT program_requirements_pkey PRIMARY KEY (program_requirements_id);


--
-- Name: programs programs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.programs
    ADD CONSTRAINT programs_pkey PRIMARY KEY (program_id);


--
-- Name: requirement requirement_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.requirement
    ADD CONSTRAINT requirement_pkey PRIMARY KEY (requirement_type);


--
-- Name: user_programs user_programs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_programs
    ADD CONSTRAINT user_programs_pkey PRIMARY KEY (user_program_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: prerequisites prerequisites_program_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prerequisites
    ADD CONSTRAINT prerequisites_program_id_fkey FOREIGN KEY (program_id) REFERENCES public.programs(program_id);


--
-- Name: program_requirements program_requirements_program_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.program_requirements
    ADD CONSTRAINT program_requirements_program_id_fkey FOREIGN KEY (program_id) REFERENCES public.programs(program_id);


--
-- Name: program_requirements program_requirements_requirement_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.program_requirements
    ADD CONSTRAINT program_requirements_requirement_type_fkey FOREIGN KEY (requirement_type) REFERENCES public.requirement(requirement_type);


--
-- Name: programs programs_college_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.programs
    ADD CONSTRAINT programs_college_id_fkey FOREIGN KEY (college_id) REFERENCES public.colleges(college_id);


--
-- Name: user_programs user_programs_program_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_programs
    ADD CONSTRAINT user_programs_program_id_fkey FOREIGN KEY (program_id) REFERENCES public.programs(program_id);


--
-- Name: user_programs user_programs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_programs
    ADD CONSTRAINT user_programs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

