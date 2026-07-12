--
-- PostgreSQL database dump
--

\restrict cKErMHvhutN25V1SXfD58V5a7txl45V84th01I3QgpddQBdxP6XcNTqDCFAd9RM

-- Dumped from database version 18.4 (Postgres.app)
-- Dumped by pg_dump version 18.4 (Postgres.app)

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
-- Name: enum_Users_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."enum_Users_role" AS ENUM (
    'persona',
    'ong'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Campanas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Campanas" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    meta double precision NOT NULL,
    actual double precision DEFAULT '0'::double precision,
    "desc" text,
    impacto text,
    actualizacion text,
    "fechaInicio" date,
    "fechaFin" date,
    beneficiarios integer DEFAULT 0,
    donantes integer DEFAULT 0,
    urgent boolean DEFAULT false,
    category character varying(255),
    location character varying(255),
    imagen character varying(255),
    "ongId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: Campanas_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Campanas_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Campanas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Campanas_id_seq" OWNED BY public."Campanas".id;


--
-- Name: Donaciones; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Donaciones" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "campanaId" integer NOT NULL,
    monto double precision NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: Donaciones_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Donaciones_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Donaciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Donaciones_id_seq" OWNED BY public."Donaciones".id;


--
-- Name: HistorialVoluntariados; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."HistorialVoluntariados" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "ongId" integer NOT NULL,
    "campanaId" integer,
    "horasAportadas" integer DEFAULT 0,
    "fechaParticipacion" date,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: HistorialVoluntariados_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."HistorialVoluntariados_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: HistorialVoluntariados_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."HistorialVoluntariados_id_seq" OWNED BY public."HistorialVoluntariados".id;


--
-- Name: OngSeguidores; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."OngSeguidores" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "ongId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: OngSeguidores_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."OngSeguidores_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: OngSeguidores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."OngSeguidores_id_seq" OWNED BY public."OngSeguidores".id;


--
-- Name: Ongs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Ongs" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    location character varying(255),
    "desc" text,
    mision text,
    emoji character varying(255),
    color character varying(255),
    banner character varying(255),
    "fotoPortada" character varying(255),
    galeria character varying(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    tags character varying(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    "anioFundacion" integer,
    seguidores integer DEFAULT 0,
    featured boolean DEFAULT false,
    email character varying(255),
    telefono character varying(255),
    web character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: Ongs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Ongs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Ongs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Ongs_id_seq" OWNED BY public."Ongs".id;


--
-- Name: Postulaciones; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Postulaciones" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "voluntariadoId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: Postulaciones_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Postulaciones_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Postulaciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Postulaciones_id_seq" OWNED BY public."Postulaciones".id;


--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


--
-- Name: Users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    "passwordHash" character varying(255) NOT NULL,
    "fullName" character varying(255),
    username character varying(255),
    role public."enum_Users_role" DEFAULT 'persona'::public."enum_Users_role" NOT NULL,
    "ongId" integer,
    creditos integer DEFAULT 200,
    "photoUrl" character varying(255),
    biografia text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: Voluntariados; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Voluntariados" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "desc" text,
    impacto text,
    actualizacion text,
    actividades character varying(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    requisitos character varying(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    location character varying(255),
    category character varying(255),
    modalidad character varying(255),
    cupos integer NOT NULL,
    "cuposOcupados" integer DEFAULT 0,
    duracion character varying(255),
    "fechaInicio" date,
    "ongId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: Voluntariados_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Voluntariados_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Voluntariados_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Voluntariados_id_seq" OWNED BY public."Voluntariados".id;


--
-- Name: Campanas id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Campanas" ALTER COLUMN id SET DEFAULT nextval('public."Campanas_id_seq"'::regclass);


--
-- Name: Donaciones id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Donaciones" ALTER COLUMN id SET DEFAULT nextval('public."Donaciones_id_seq"'::regclass);


--
-- Name: HistorialVoluntariados id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."HistorialVoluntariados" ALTER COLUMN id SET DEFAULT nextval('public."HistorialVoluntariados_id_seq"'::regclass);


--
-- Name: OngSeguidores id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."OngSeguidores" ALTER COLUMN id SET DEFAULT nextval('public."OngSeguidores_id_seq"'::regclass);


--
-- Name: Ongs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Ongs" ALTER COLUMN id SET DEFAULT nextval('public."Ongs_id_seq"'::regclass);


--
-- Name: Postulaciones id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Postulaciones" ALTER COLUMN id SET DEFAULT nextval('public."Postulaciones_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Name: Voluntariados id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Voluntariados" ALTER COLUMN id SET DEFAULT nextval('public."Voluntariados_id_seq"'::regclass);


--
-- Data for Name: Campanas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Campanas" (id, name, meta, actual, "desc", impacto, actualizacion, "fechaInicio", "fechaFin", beneficiarios, donantes, urgent, category, location, imagen, "ongId", "createdAt", "updatedAt") FROM stdin;
1	Plantemos 10,000 árboles en Loreto	15000	11200	Reforestación urgente de zonas deforestadas por minería ilegal en la Amazonía.	Cada árbol plantado ayuda a restaurar el hábitat de especies en peligro, reduce la erosión del suelo y captura CO₂. Con esta campaña buscamos recuperar más de 40 hectáreas de bosque amazónico afectadas por la tala ilegal, beneficiando a comunidades indígenas que dependen del bosque para su subsistencia.	¡Llevamos 7,400 árboles plantados! El equipo de campo está operando en las zonas de Nauta y Requena. Esta semana arranca la segunda fase en el corredor biológico norte.	2026-04-01	2026-07-31	1200	340	t	Medio Ambiente	Loreto, Perú	https://www.rcrperu.com/wp-content/uploads/2024/10/200-ARBOLES-FUERON-PLANTADOS-EN-CARABAYLLO-GRACIAS-A-CAMPANA-DE-REFORESTACION-DE-LENOVO-Y-ONG-RECICLA-LATAM.png	1	2026-07-11 09:33:49.622-05	2026-07-11 09:33:49.622-05
2	Biblioteca comunitaria en Ollantaytambo	8000	8300	Implementación de estanterías, libros y computadoras para niños de la zona.	La biblioteca ya está en funcionamiento y atiende a más de 280 niños cada semana. Cuenta con 1,200 libros en español y quechua, 8 computadoras con acceso a internet satelital y un espacio de lectura abierto. Se convirtió en el primer centro cultural de la comunidad.	¡Meta superada! La inauguración fue el 15 de mayo. Más de 200 vecinos asistieron a la apertura. Gracias a todos los que donaron.	2026-02-10	2026-05-15	280	215	f	Educación	Cusco, Perú	\N	2	2026-07-11 09:33:49.622-05	2026-07-11 09:33:49.622-05
3	Kits escolares para 500 niños rurales	12000	4800	Mochilas, cuadernos y útiles para estudiantes de comunidades sin acceso a tiendas.	En estas comunidades la tienda más cercana está a más de 4 horas de camino. Sin útiles, muchos niños asisten a clases sin poder escribir. Cada kit incluye: mochila, 4 cuadernos, lápices, colores, regla y borrador, suficiente para todo el año escolar.	Hemos entregado 200 kits en las comunidades de Challhuahuacho y Cotabambas. Faltan 300 más. Con S/. 24 puedes completar el kit de un niño.	2026-03-15	2026-08-30	500	128	t	Educación	Apurímac, Perú	\N	2	2026-07-11 09:33:49.622-05	2026-07-11 09:33:49.622-05
4	Campaña médica en zonas de friaje	20000	13500	Brigadas de salud con medicamentos y abrigo para comunidades afectadas por las bajas temperaturas.	Las temperaturas en Puno llegan a -15°C en invierno. Las comunidades rurales sufren neumonía, hipotermia y enfermedades respiratorias sin atención médica. Nuestras brigadas llevan médicos, enfermeros, medicamentos y frazadas para atender a familias en los distritos más alejados.	Esta semana atendimos 430 pacientes en Chucuito y Yunguyo. Detectamos 12 casos de neumonía infantil que recibieron tratamiento inmediato. La brigada continúa hacia el distrito de Acora.	2026-05-01	2026-09-30	2000	412	t	Salud	Puno, Perú	\N	3	2026-07-11 09:33:49.622-05	2026-07-11 09:33:49.622-05
5	Pozos de agua potable en Cajamarca	30000	9200	Instalación de 3 pozos comunales para abastecer a más de 400 familias sin acceso a agua limpia.	El 68% de las familias en estas comunidades consume agua de acequias contaminadas, causando enfermedades gastrointestinales en niños. Cada pozo abastece a un promedio de 130 familias con agua potable segura durante al menos 20 años, eliminando la necesidad de caminar 2 horas diarias para buscar agua.	El primer pozo en el caserío de Porcón Alto está en construcción. Se completó la perforación a 80 metros y esta semana instalamos el sistema de bombeo. Inauguración estimada: 20 de julio.	2026-04-20	2026-12-15	420	187	f	Agua	Cajamarca, Perú	\N	3	2026-07-11 09:33:49.622-05	2026-07-11 09:33:49.622-05
6	Desayunos escolares en Huancavelica	6000	5750	Programa de alimentación matutina para reducir la deserción escolar por hambre en zonas de pobreza extrema.	El 40% de los niños en estas escuelas llega sin desayunar. El hambre provoca dificultad para concentrarse y es una de las principales causas de abandono escolar en la región. Este programa garantiza un desayuno nutritivo con leche, pan y fruta a 150 estudiantes todos los días.	Llevamos 4 meses consecutivos de desayunos sin interrupciones. La asistencia escolar mejoró en un 18% desde que comenzó el programa. ¡Casi llegamos a la meta!	2026-02-01	2026-11-30	150	203	f	Pobreza	Huancavelica, Perú	\N	2	2026-07-11 09:33:49.622-05	2026-07-11 09:33:49.622-05
7	Reforestación costera en Piura	9000	9000	Siembra de 5,000 plantas de mangle para recuperar el ecosistema costero dañado por El Niño.	Los manglares de Piura perdieron el 35% de su cobertura por El Niño de 2023. Este ecosistema protege la costa, filtra el agua y es hábitat de más de 80 especies de aves y peces. Las 5,000 plantas sembradas recuperaron 12 hectáreas de manglar y ya se registran las primeras aves anidando.	¡Campaña completada! Las 5,000 plantas están sembradas y en crecimiento. El monitoreo del ecosistema continúa por los próximos 2 años con voluntarios locales.	2026-01-10	2026-04-30	800	298	f	Medio Ambiente	Piura, Perú	\N	1	2026-07-11 09:33:49.622-05	2026-07-11 09:33:49.622-05
\.


--
-- Data for Name: Donaciones; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Donaciones" (id, "userId", "campanaId", monto, "createdAt", "updatedAt") FROM stdin;
13	3	1	80	2026-04-01 19:00:00-05	2026-04-01 19:00:00-05
14	3	5	50	2026-05-19 19:00:00-05	2026-05-19 19:00:00-05
\.


--
-- Data for Name: HistorialVoluntariados; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."HistorialVoluntariados" (id, "userId", "ongId", "campanaId", "horasAportadas", "fechaParticipacion", "createdAt", "updatedAt") FROM stdin;
11	3	1	1	18	2026-04-15	2026-07-11 09:33:49.622-05	2026-07-11 09:33:49.622-05
12	3	3	4	9	2026-05-10	2026-07-11 09:33:49.622-05	2026-07-11 09:33:49.622-05
\.


--
-- Data for Name: OngSeguidores; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."OngSeguidores" (id, "userId", "ongId", "createdAt", "updatedAt") FROM stdin;
13	3	1	2026-07-11 09:33:49.622-05	2026-07-11 09:33:49.622-05
14	3	3	2026-07-11 09:33:49.622-05	2026-07-11 09:33:49.622-05
\.


--
-- Data for Name: Ongs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Ongs" (id, name, location, "desc", mision, emoji, color, banner, "fotoPortada", galeria, tags, "anioFundacion", seguidores, featured, email, telefono, web, "createdAt", "updatedAt") FROM stdin;
1	Tierra Verde Perú	Lima, Perú	Reforestación y conservación de ecosistemas en zonas vulnerables de la Amazonía peruana.	Restaurar los ecosistemas naturales del Perú mediante la reforestación, la educación ambiental y el trabajo conjunto con comunidades locales, para garantizar un planeta más verde para las próximas generaciones.	🌱	#d4f5e9	linear-gradient(135deg, #2d9b6f, #0f9f8a)	https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80	{https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80,https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=600&q=80,https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80}	{"Medio Ambiente","ODS 15",Voluntariado}	2015	1240	f	contacto@tierraverdeperu.org	\N	\N	2026-07-11 09:33:49.622-05	2026-07-11 09:33:49.622-05
2	Educa Contigo	Cusco, Perú	Acceso a educación de calidad para niños en comunidades rurales de la sierra peruana.	Asegurar que ningún niño peruano se quede sin educación de calidad por razones de distancia o pobreza, conectando voluntarios, recursos y tecnología con las comunidades que más lo necesitan.	📚	#e0f2fe	linear-gradient(135deg, #0284c7, #0ea5e9)	https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80	{https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80,https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80,https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&q=80}	{Educación,"ODS 4",Donaciones}	2018	870	f	contacto@educacontigo.org	\N	\N	2026-07-11 09:33:49.622-05	2026-07-11 09:33:49.622-05
3	Salud Para Todos	Arequipa, Perú	Campañas médicas itinerantes y entrega de medicamentos esenciales en zonas de friaje.	Garantizar el acceso a atención médica básica para las poblaciones rurales más vulnerables del Perú, especialmente en zonas de altura donde el sistema de salud pública no llega.	🏥	#fee2e2	linear-gradient(135deg, #ef4444, #f43f5e)	https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80	{https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=80,https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80,https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80}	{Salud,"ODS 3",Campañas}	2012	1950	t	contacto@saludparatodos.org	\N	\N	2026-07-11 09:33:49.622-05	2026-07-11 09:33:49.622-05
\.


--
-- Data for Name: Postulaciones; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Postulaciones" (id, "userId", "voluntariadoId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."SequelizeMeta" (name) FROM stdin;
20260705000001-create-ongs.js
20260705000002-create-users.js
20260705000003-create-campanas.js
20260705000004-create-voluntariados.js
20260705000005-create-donaciones.js
20260705000006-create-postulaciones.js
20260705000007-create-ong-seguidores.js
20260705000008-create-historial-voluntariados.js
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Users" (id, email, "passwordHash", "fullName", username, role, "ongId", creditos, "photoUrl", biografia, "createdAt", "updatedAt") FROM stdin;
1	persona@demo.com	$2b$10$unzWanRFSbMYPbKo1MgFBOF4eXBBSTDU0LMmHvtOyRBDzh0DkJgB.	María García López	maria_garcia	persona	\N	500	\N	\N	2026-07-11 09:33:49.622-05	2026-07-11 09:33:49.622-05
2	ong@demo.com	$2b$10$unzWanRFSbMYPbKo1MgFBOF4eXBBSTDU0LMmHvtOyRBDzh0DkJgB.	Admin Tierra Verde	admin_tierra_verde	ong	1	0	\N	\N	2026-07-11 09:33:49.622-05	2026-07-11 09:33:49.622-05
3	amante.de.gatitos55@example.com	$2b$10$rz3wVdHfZ7bxWORMT6vwCejPV/cY9tsI9c/mjHRzxHRMTYiL7WPqW	Amante de Gatitos 55	amante_gatitos55	persona	\N	350	https://img.buzzfeed.com/buzzfeed-static/static/2025-03/13/18/subbuzz/UjLcjUoUE0.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto	Lo que disfruto es poder ayudar a la gente	2026-07-11 09:33:49.622-05	2026-07-11 09:33:49.622-05
\.


--
-- Data for Name: Voluntariados; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Voluntariados" (id, name, "desc", impacto, actualizacion, actividades, requisitos, location, category, modalidad, cupos, "cuposOcupados", duracion, "fechaInicio", "ongId", "createdAt", "updatedAt") FROM stdin;
1	Brigada de reforestación en la Amazonía	Únete a nuestro equipo de campo para plantar árboles nativos en zonas deforestadas de Loreto. Trabajo físico al aire libre.	Cada voluntario que se une a la brigada planta en promedio 80 árboles por día. En dos semanas contribuirás directamente a restaurar entre 1 y 2 hectáreas de bosque amazónico, hábitat de especies como el paiche y el guacamayo escarlata. Tu esfuerzo físico tiene un impacto medible y visible desde el primer día.	La brigada de mayo terminó con 1,600 árboles plantados. El equipo de junio sale el día 15 desde Lima. Hay 6 cupos disponibles: los primeros en confirmar tienen alojamiento incluido en el campamento base.	{"Preparación del terreno y apertura de hoyos de siembra","Selección y trasplante de plantones nativos del vivero","Registro fotográfico y geolocalización de cada árbol plantado","Charlas nocturnas sobre biodiversidad amazónica con guías locales"}	{"Buena condición física (caminatas de hasta 8 km diarios)","Disponibilidad completa durante las 2 semanas","Vacuna de fiebre amarilla vigente","Edad mínima: 18 años"}	Loreto, Perú	Medio Ambiente	Presencial	20	14	2 semanas	2026-06-15	1	2026-07-11 09:33:49.622-05	2026-07-11 09:33:49.622-05
2	Tutor virtual de matemáticas para niños rurales	Imparte clases de refuerzo escolar por videollamada a estudiantes de primaria en comunidades sin docentes suficientes.	En estas comunidades hay un solo docente para tres grados simultáneos. Los niños de 3° a 6° de primaria tienen un rezago promedio de 2 años en matemáticas. Con solo 3 horas semanales de tutoría personalizada, los voluntarios anteriores lograron que el 70% de sus estudiantes mejorara sus calificaciones en un trimestre.	¡Todas las plazas están cubiertas! Gracias a los 30 tutores activos. Si quieres sumarte al próximo ciclo (septiembre 2026), deja tu correo y te avisamos cuando abran nuevas inscripciones.	{"Sesiones de refuerzo de 1 hora por videollamada, 3 veces por semana","Preparación de materiales didácticos adaptados al currículo nacional","Seguimiento del progreso de cada estudiante en una planilla compartida","Reunión mensual con el equipo de coordinación pedagógica"}	{"Conocimientos sólidos de matemáticas hasta 6° de primaria","Conexión estable a internet y dispositivo con cámara","Disponibilidad de al menos 4 horas semanales","Paciencia y vocación para enseñar a niños"}	Remoto	Educación	Virtual	30	30	3 meses	2026-06-01	2	2026-07-11 09:33:49.622-05	2026-07-11 09:33:49.622-05
3	Apoyo en brigada médica de friaje	Asiste a médicos y enfermeros en campañas itinerantes de atención a comunidades de Puno afectadas por bajas temperaturas.	Las comunidades altiplánicas de Puno están a más de 4,000 metros sobre el nivel del mar y en invierno las temperaturas bajan a -15°C. El sistema de salud público no alcanza a cubrir estas zonas remotas. Con tu apoyo, los médicos pueden atender hasta 60 pacientes diarios en vez de 30, duplicando el alcance de cada brigada.	La brigada de julio sale el 10 desde Puno ciudad. Se organizará transporte desde Lima para voluntarios del interior del país. Quedan 8 cupos disponibles.	{"Registro y triaje de pacientes a la entrada del puesto médico temporal","Asistencia en la distribución de medicamentos y abrigo","Apoyo logístico: armado y desmontaje del puesto médico","Documentación fotográfica y redacción de informe de impacto diario"}	{"Estudiantes de ciencias de la salud (medicina, enfermería, farmacia) preferentemente","Resistencia a la altura y el frío extremo","Disponibilidad completa durante la semana","Traer ropa de abrigo para temperaturas bajo cero"}	Puno, Perú	Salud	Presencial	15	7	1 semana	2026-07-10	3	2026-07-11 09:33:49.622-05	2026-07-11 09:33:49.622-05
4	Diseñador gráfico para campañas sociales	Crea materiales visuales (afiches, banners, redes sociales) para las campañas de recaudación de nuestras ONGs aliadas.	Una buena pieza visual puede duplicar el alcance de una publicación en redes. Los voluntarios de diseño del año pasado ayudaron a que la campaña de pozos de agua llegara a 40,000 personas, logrando recaudar en 3 semanas lo que antes tardaba 3 meses. Tu creatividad tiene impacto directo en cuántas donaciones se consiguen.	Estamos armando el equipo creativo para la campaña de friaje de julio. Necesitamos 3 diseñadores más. El briefing de proyecto está listo y se comparte el primer día de incorporación.	{"Diseño de afiches, banners y piezas para Instagram, Facebook y WhatsApp","Creación de infografías de impacto para informes de donantes","Adaptación de materiales al manual de identidad visual de cada ONG","Reunión semanal de revisión con el equipo de comunicaciones"}	{"Dominio de Canva, Adobe Illustrator o Figma","Portfolio con al menos 3 proyectos previos","Disponibilidad de 6-8 horas semanales","Capacidad de entregar en plazos cortos (48-72 horas)"}	Remoto	Medio Ambiente	Virtual	5	2	1 mes	2026-06-20	1	2026-07-11 09:33:49.622-05	2026-07-11 09:33:49.622-05
5	Monitor de comedor escolar en Huancavelica	Supervisa y apoya la distribución de desayunos escolares en escuelas rurales de la región. Requiere disponibilidad de lunes a viernes.	Muchos niños recorren hasta 2 horas a pie para llegar a la escuela con el estómago vacío. Un monitor presente asegura que cada niño reciba su desayuno, que se respeten las porciones y que el programa funcione con orden. Desde que tenemos monitores, la tasa de inasistencia bajó un 18% en las escuelas participantes.	El mes de julio necesitamos 2 monitores adicionales porque tres escuelas nuevas se suman al programa. El hospedaje está cubierto por la ONG en la casa comunal del distrito.	{"Supervisión de la preparación y distribución del desayuno escolar","Control de asistencia diaria de los estudiantes beneficiados","Coordinación con la directora de cada escuela sobre logística","Reporte semanal de avances al equipo de Educa Contigo"}	{"Disponibilidad de lunes a viernes por las mañanas","Facilidad para relacionarse con niños y docentes","No se requiere experiencia previa, se brinda capacitación","Disposición para vivir en zona rural durante el voluntariado"}	Huancavelica, Perú	Pobreza	Presencial	10	4	2 meses	2026-07-01	2	2026-07-11 09:33:49.622-05	2026-07-11 09:33:49.622-05
6	Técnico de instalación de pozos comunales	Apoya al equipo de ingeniería en la instalación de sistemas de agua potable en zonas rurales de Cajamarca.	Instalar un pozo cambia la vida de una comunidad entera: las mujeres dejan de caminar 2 horas diarias buscando agua, los niños se enferman menos y las familias pueden tener huertos. Tu apoyo técnico permite que el equipo de ingeniería avance más rápido y llegue a más comunidades en la misma temporada de trabajo.	El primer pozo en Porcón Alto entra en fase de instalación del sistema de bombeo en agosto. El equipo de campo sale el 5 de agosto desde Cajamarca. Se necesitan 5 voluntarios más con conocimientos básicos de plomería o construcción.	{"Apoyo en la instalación de tuberías y conexiones del sistema de bombeo","Capacitación a líderes comunales sobre mantenimiento del pozo","Registro de avance diario con fotos y mediciones técnicas","Participación en la inauguración comunitaria del pozo"}	{"Conocimientos básicos de plomería, electricidad o construcción (deseable)","Condición física para trabajo de campo en zona rural","Disponibilidad completa durante las 3 semanas","Edad mínima: 20 años"}	Cajamarca, Perú	Agua	Presencial	8	3	3 semanas	2026-08-05	3	2026-07-11 09:33:49.622-05	2026-07-11 09:33:49.622-05
7	Asistente de comunicaciones híbrido	Gestiona redes sociales y redacta boletines de impacto. Parte del trabajo es presencial en Lima y parte remoto.	Las ONGs con buena comunicación digital recaudan 3 veces más que las que no la tienen. Tu trabajo como asistente de comunicaciones se traduce directamente en más donaciones y más voluntarios captados. El equipo anterior logró crecer el seguimiento en redes de 2,000 a 8,500 personas en dos meses.	Incorporación inmediata disponible. El equipo trabaja presencial los martes y jueves en la oficina de Miraflores (Lima). El resto es remoto con reunión semanal por Zoom.	{"Gestión de Instagram, Facebook y LinkedIn de Educa Contigo","Redacción de boletines mensuales para donantes y aliados","Cobertura fotográfica y de video en actividades presenciales","Apoyo en la elaboración del informe anual de impacto"}	{"Experiencia en gestión de redes sociales (personal o profesional)","Buena redacción en español y capacidad de síntesis","Disponibilidad de 8-10 horas semanales","Residencia en Lima para los días presenciales (martes y jueves)"}	Lima / Remoto	Educación	Híbrido	3	1	2 meses	2026-06-10	2	2026-07-11 09:33:49.622-05	2026-07-11 09:33:49.622-05
\.


--
-- Name: Campanas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Campanas_id_seq"', 7, true);


--
-- Name: Donaciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Donaciones_id_seq"', 14, true);


--
-- Name: HistorialVoluntariados_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."HistorialVoluntariados_id_seq"', 12, true);


--
-- Name: OngSeguidores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."OngSeguidores_id_seq"', 14, true);


--
-- Name: Ongs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Ongs_id_seq"', 3, true);


--
-- Name: Postulaciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Postulaciones_id_seq"', 2, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Users_id_seq"', 3, true);


--
-- Name: Voluntariados_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Voluntariados_id_seq"', 7, true);


--
-- Name: Campanas Campanas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Campanas"
    ADD CONSTRAINT "Campanas_pkey" PRIMARY KEY (id);


--
-- Name: Donaciones Donaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Donaciones"
    ADD CONSTRAINT "Donaciones_pkey" PRIMARY KEY (id);


--
-- Name: HistorialVoluntariados HistorialVoluntariados_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."HistorialVoluntariados"
    ADD CONSTRAINT "HistorialVoluntariados_pkey" PRIMARY KEY (id);


--
-- Name: OngSeguidores OngSeguidores_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."OngSeguidores"
    ADD CONSTRAINT "OngSeguidores_pkey" PRIMARY KEY (id);


--
-- Name: Ongs Ongs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Ongs"
    ADD CONSTRAINT "Ongs_pkey" PRIMARY KEY (id);


--
-- Name: Postulaciones Postulaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Postulaciones"
    ADD CONSTRAINT "Postulaciones_pkey" PRIMARY KEY (id);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Voluntariados Voluntariados_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Voluntariados"
    ADD CONSTRAINT "Voluntariados_pkey" PRIMARY KEY (id);


--
-- Name: OngSeguidores unique_user_ong_seguidor; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."OngSeguidores"
    ADD CONSTRAINT unique_user_ong_seguidor UNIQUE ("userId", "ongId");


--
-- Name: Postulaciones unique_user_voluntariado; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Postulaciones"
    ADD CONSTRAINT unique_user_voluntariado UNIQUE ("userId", "voluntariadoId");


--
-- Name: Campanas Campanas_ongId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Campanas"
    ADD CONSTRAINT "Campanas_ongId_fkey" FOREIGN KEY ("ongId") REFERENCES public."Ongs"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Donaciones Donaciones_campanaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Donaciones"
    ADD CONSTRAINT "Donaciones_campanaId_fkey" FOREIGN KEY ("campanaId") REFERENCES public."Campanas"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Donaciones Donaciones_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Donaciones"
    ADD CONSTRAINT "Donaciones_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: HistorialVoluntariados HistorialVoluntariados_campanaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."HistorialVoluntariados"
    ADD CONSTRAINT "HistorialVoluntariados_campanaId_fkey" FOREIGN KEY ("campanaId") REFERENCES public."Campanas"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: HistorialVoluntariados HistorialVoluntariados_ongId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."HistorialVoluntariados"
    ADD CONSTRAINT "HistorialVoluntariados_ongId_fkey" FOREIGN KEY ("ongId") REFERENCES public."Ongs"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: HistorialVoluntariados HistorialVoluntariados_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."HistorialVoluntariados"
    ADD CONSTRAINT "HistorialVoluntariados_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: OngSeguidores OngSeguidores_ongId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."OngSeguidores"
    ADD CONSTRAINT "OngSeguidores_ongId_fkey" FOREIGN KEY ("ongId") REFERENCES public."Ongs"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: OngSeguidores OngSeguidores_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."OngSeguidores"
    ADD CONSTRAINT "OngSeguidores_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Postulaciones Postulaciones_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Postulaciones"
    ADD CONSTRAINT "Postulaciones_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Postulaciones Postulaciones_voluntariadoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Postulaciones"
    ADD CONSTRAINT "Postulaciones_voluntariadoId_fkey" FOREIGN KEY ("voluntariadoId") REFERENCES public."Voluntariados"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Users Users_ongId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_ongId_fkey" FOREIGN KEY ("ongId") REFERENCES public."Ongs"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Voluntariados Voluntariados_ongId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Voluntariados"
    ADD CONSTRAINT "Voluntariados_ongId_fkey" FOREIGN KEY ("ongId") REFERENCES public."Ongs"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict cKErMHvhutN25V1SXfD58V5a7txl45V84th01I3QgpddQBdxP6XcNTqDCFAd9RM

