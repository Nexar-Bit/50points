# MY 50 POINTS — Situación del proyecto

**Última actualización:** 18 junio 2026  
**Estado general:** Desarrollo activo — perfil de usuario y workspace de modalidades en producción local; últimos cambios pusheados a GitHub.

---

## 1. GitHub — repositorios y ramas

**Organización:** [Nexar-Bit](https://github.com/Nexar-Bit)

| Repositorio | URL | Rama activa | HEAD actual | Tracking |
|-------------|-----|-------------|-------------|----------|
| **Monorepo (padre)** | https://github.com/Nexar-Bit/50points | `master` | `b812e50` | `origin/master` |
| **Frontend** | https://github.com/Nexar-Bit/50_points | `main` | `f95b05b` | `origin/main` |
| **Backend** | https://github.com/Nexar-Bit/50-points-backend | `master` | `a455aae` | `origin/master` |

### Remotes configurados (local)

```
# Repo padre (E:\Work\Workana\50points-main\50points-main)
origin  https://github.com/Nexar-Bit/50points.git

# Submódulo FRONTEND/
origin  https://github.com/Nexar-Bit/50_points.git

# Submódulo BACKEND/
origin  https://github.com/Nexar-Bit/50-points-backend.git
```

> **Nota:** El frontend vive en el repo `50_points` (guión bajo). El monorepo padre es `50points` (sin guión). Son repos **separados** en GitHub; el padre solo guarda **punteros de submódulo** a commits concretos de FRONTEND y BACKEND.

### Clonar el proyecto completo

```bash
git clone --recurse-submodules https://github.com/Nexar-Bit/50points.git
cd 50points
git submodule update --init --recursive
```

Si ya clonaste sin submódulos:

```bash
git submodule update --init --recursive
```

### Flujo de push (submódulos)

```bash
# 1. Commit y push dentro del submódulo
cd FRONTEND
git add .
git commit -m "Descripción del cambio"
git push origin main

# 2. Actualizar puntero en el repo padre
cd ..
git add FRONTEND
git commit -m "Update FRONTEND submodule: descripción breve"
git push origin master
```

Repetir el mismo patrón para `BACKEND/` (rama `master`) cuando haya cambios de API.

### Enlaces útiles

| Recurso | URL |
|---------|-----|
| Repo monorepo | https://github.com/Nexar-Bit/50points |
| Repo frontend | https://github.com/Nexar-Bit/50_points |
| Repo backend | https://github.com/Nexar-Bit/50-points-backend |
| Commits recientes (padre) | https://github.com/Nexar-Bit/50points/commits/master |
| Commits recientes (frontend) | https://github.com/Nexar-Bit/50_points/commits/main |
| Commits recientes (backend) | https://github.com/Nexar-Bit/50-points-backend/commits/master |

### Punteros de submódulo registrados en el padre (commit `b812e50`)

| Submódulo | Commit apuntado | Mensaje |
|-----------|-----------------|---------|
| FRONTEND | `f95b05b` | Add profile hub with ticket history, tournament action headers, and workspace polish |
| BACKEND | `a455aae` | Add ticket DELETE endpoints for clearing picks during edit flow |

### Ramas locales adicionales

- **FRONTEND:** existe rama local `master` (`9a8a476`, “4rd update”) — **no es la rama de trabajo**; usar siempre `main` para push.

---

## 2. Resumen ejecutivo

**MY 50 POINTS** es una plataforma gratuita de torneos hípicos. Los jugadores eligen caballos, asignan puntos por estrategia (Full / Dual / Smart Point) y compiten en rankings en vivo.

El repositorio local es un **monorepo con submódulos Git** (ver §1 GitHub):

| Submódulo | Rama | GitHub | Rol |
|-----------|------|--------|-----|
| **FRONTEND/** | `main` | [50_points](https://github.com/Nexar-Bit/50_points) | Next.js 14 (App Router), UI, i18n ES/EN |
| **BACKEND/** | `master` | [50-points-backend](https://github.com/Nexar-Bit/50-points-backend) | FastAPI, PostgreSQL, sync de carreras |
| **(raíz)** | `master` | [50points](https://github.com/Nexar-Bit/50points) | Orquestación, submódulos, docs |

---

## 3. Commits recientes (referencia)

### Repo padre (`master`) — [50points](https://github.com/Nexar-Bit/50points)

| Commit | Descripción |
|--------|-------------|
| `b812e50` | Update FRONTEND submodule: profile hub, ticket history, tournament action headers |
| `24abba8` | Update FRONTEND submodule: modality welcome flow, workspace layout, ticket bar assets |
| `cb09132` | Update FRONTEND submodule: tournament guide icons, fullscreen modality colors, hero fixes |
| `776acf0` | Update FRONTEND submodule: modality workspace UI, brand colors, onboarding |

### FRONTEND (`main`) — [50_points](https://github.com/Nexar-Bit/50_points)

| Commit | Descripción |
|--------|-------------|
| `f95b05b` | **Profile hub**, historial de tickets, encabezados de torneo en todas las modalidades, polish workspace |
| `eda495e` | Modality welcome workspace flow, info bars, track labels, PNG assets |
| `6808bd4` | Tournament guide icons, fullscreen modality backgrounds, hero fixes |
| `b98c418` | Modality workspace UI, brand colors, onboarding, ticket overview bar |

### BACKEND (`master`) — [50-points-backend](https://github.com/Nexar-Bit/50-points-backend)

| Commit | Descripción |
|--------|-------------|
| `a455aae` | Add ticket DELETE endpoints for clearing picks during edit flow *(puntero actual en padre)* |

---

## 4. Stack técnico

### Frontend

- **Next.js 14.2**, React 18, Tailwind CSS 3.4
- **Framer Motion**, Lucide React
- **Socket.io-client** (chat en vivo)
- i18n: `src/frontend/lib/i18n/translations.js` (ES default, EN)
- Estilos globales: `globals.css`, `modality-workspace.css`, `tournament-guide.css`, `profile-hub.css`

### Backend

- FastAPI routers: `auth`, `profile`, `tournaments`, `tickets`, `races`, `leaderboard`, `statistics`, `groups`, `records`, `admin`
- Sync de hipódromos vía HorseracingNation (`data/last_racing_sync.json` — **no versionar**; es estado runtime local)

### Comandos útiles

```bash
# Frontend
cd FRONTEND
npm run dev          # desarrollo
npm run build        # build producción
node scripts/write-profile-hub-assets.mjs   # regenerar SVG perfil

# Repo padre (después de commit en submódulo)
cd ..
git add FRONTEND
git commit -m "Update FRONTEND submodule: ..."
git push
```

---

## 5. Arquitectura de modalidades

Cuatro modalidades (`gameModalities.js`):

| ID | Color | gameMode | Disponible | Uso |
|----|-------|----------|------------|-----|
| `guest` | Blanco / invitado | 1 | Sí | Entrar sin registrarse |
| `free` | Cyan | 2 | Sí | Registrado gratis |
| `paid` | Morado | 3 | No (locked) | Modalidad paga — próximamente |
| `special` | Dorado | 4 | No (locked) | Torneo especial — próximamente |

**Flujo:** Modalidades → Hipódromos → Tickets (1–3) → Torneo (7 carreras).

Rutas clave:

- `/modalidades` — hub de modalidades
- `/modalidades/[modalityId]` — workspace con hipódromos, tickets, carreras inline
- `/profile` — Mi Perfil (hub propio)
- `/guia-torneo` — guía del torneo (pasos, reglas)
- `/tournament/[id]` — torneo en juego
- `/leaderboard`, `/inicio`, `/comenzar`, etc.

---

## 6. Funcionalidades implementadas (sesiones recientes)

### 5.1 Guía del torneo

- Modal y página `/guia-torneo`
- Tarjetas de pasos con hover que sobresalen del borde del modal (mockup)
- Assets en `public/images/tournament-guide/`
- CSS: `tournament-guide.css`
- Integración en menú flotante e i18n

### 5.2 Banner TORNEO + workspace de modalidad

- **`ModalityTorneoBar.jsx`**: banner con borde blanco, fondo por modalidad, logo sobre 3 franjas (morado / cyan / dorado **mismo tamaño**), slogan con colores fijos
- **`ModalityWorkspaceChrome.jsx`**: chrome unificado post-bienvenida
- **`ModalityNavRail.jsx`**: tabs Modalidad 1–4; en perfil soporta `stayOnPage` + `onModalityChange` sin navegar fuera
- **`FreeTicketsOverviewBar.jsx`**: MIS TICKETS DISPONIBLES — carrusel de hipódromos + 3 slots por track
- Nav de modalidades a ancho completo (`flex: 1`)

### 5.3 Modalidad 4 (guest) — legibilidad

- Texto oscuro en paneles claros (`ModalityWelcomeDetail`, `.mw-detail--guest`)
- Título TORNEO en negro en banner guest por contraste

### 5.4 Estrategias y picks en carrera

- **`RaceCard.jsx`**: 3 barras apiladas (morado / cyan / dorado), nombre + cajas PUNTOS, sin iconos
- **Bloqueo de puntos**: al elegir caballos, números de puntos tachados en orden (línea roja diagonal)
- **Botón único ACEPTAR** (`EmbeddedTicketRaces.jsx`): eliminados “Confirmar picks” + “Siguiente carrera”; `handleConfirm` avanza solo
- **EDITAR** en tarjetas de carrera confirmadas (overview + barra inferior)
- i18n: `gameModalities.acceptRacePick`

### 5.5 Encabezado dinámico del torneo (TODAS las modalidades)

Componente compartido: **`TournamentActionBar.jsx`**

| Estado | Color | Texto (ES) | Condición |
|--------|-------|-----------|-----------|
| `none` | Morado | IR AL TORNEO | 0 tickets jugados en el hipódromo activo |
| `partial` | Amarillo | AÚN QUEDAN TICKETS POR HACER | 1–2 tickets |
| `complete` | Verde | TICKETS JUGADOS EN ESTE TORNEO | 3 tickets |

- Leyenda visible debajo: tickets disponibles / pendientes / completados
- Montado en **perfil** y en **`ModalityWorkspaceChrome`** para guest, free, paid y special
- Estado de tickets en `localStorage`: `50points_free_track_tickets_v1` (`trackTicketUsage.js`)

---

## 7. Perfil de usuario (`/profile`) — Hub implementado

Solo el **perfil propio** (`isOwnProfile`) usa el nuevo layout. Perfiles públicos mantienen vista anterior.

### 7.1 Estructura del hub (`ProfileHubChrome.jsx`)

1. **Tabs de modalidad** — cambio local sin salir de `/profile`
2. **Identidad** — número de jugador (gameMode) + nombre + badge modalidad (**sin icono jockey**)
3. **3 casillas de insight** — Ticket más hot, Subida de ranking, Último logro (datos del API `/profile`)
4. **2 banners TORNEO** — espacios publicidad sistema + anunciante (`ProfileAdTorneoSlot.jsx`)
5. **Barras colapsables** — Novedades del perfil / Novedades del torneo
6. **MIS TICKETS DISPONIBLES** — reutiliza `FreeTicketsOverviewBar`
7. **Barra de acción del torneo** — `TournamentActionBar`
8. **Historial de tickets** — `ProfileTicketHistoryPanel` (ver §7.2)
9. **Footer** — stats circulares + enlaces ranking / logros / tickets jugados (registrado)

### 7.2 Historial de tickets — invitado vs registrado

| Pestaña | Invitado | Registrado |
|---------|----------|------------|
| **Mis tickets de hoy** | Top 5 del día | Top 5 del día |
| **Historial reciente (1 mes)** | CTA registrarse | Calendario del mes por hipódromo |
| **Historial completo** | CTA registrarse | 8 mini-calendarios (ene–ago) por hipódromo |

- Calendarios: días jugados con borde cyan tipo ticket
- Sidebar: búsqueda “Buscar por hipódromos” + lista con logos
- Botones **Editar** / **Compartir** en vistas de calendario (UI; lógica pendiente)
- Datos: `profile.allTickets` + tracks en vivo + uso local de tickets free
- Helpers: `profileTicketHistory.js`, `profileHubInsights.js`

### 7.3 Componentes del hub

```
FRONTEND/src/frontend/components/profile/hub/
├── ProfileHubChrome.jsx          # Orquestador
├── ProfileHubHeader.jsx          # Número + nombre + 3 insights
├── ProfileAdTorneoSlot.jsx       # Banner TORNEO + novedades
├── ProfileTicketHistoryPanel.jsx # Tabs historial
├── ProfileTopTicketsToday.jsx    # Tabla Top 5 (embedded)
├── ProfileHubFooter.jsx          # Stats + nav
└── ProfileTournamentActionSection.jsx  # Re-export → TournamentActionBar
```

### 7.4 Assets del perfil

- Config: `src/frontend/lib/config/profileHubAssets.js`
- SVG: `public/images/profile-hub/` (15 archivos)
- Script: `scripts/write-profile-hub-assets.mjs`
- CSS: `src/app/profile-hub.css`

### 7.5 i18n perfil

Claves bajo `profile.hub.*` en `translations.js` (ES + EN): insights, novedades, encabezados torneo, leyenda, tabs historial, meses, guest upsell, footer.

---

## 8. Secciones legacy aún en perfil

Debajo del hub (`profile-hub-legacy`):

- `TournamentRankingTabs` — pestañas ranking torneo activo
- `PlayerTicketsPanel` — lista detallada tickets jugados
- `AchievementGallery`, gráficos rendimiento, desglose estrategias, logros

Scroll por query: `?section=achievements`, `?section=tickets` → `#profile-tickets`

---

## 9. API de perfil (backend)

`GET /profile` (autenticado) devuelve:

- `user`, `stats`, `globalRank`
- `allTickets`, `recentTickets`, `tournamentSummaries`
- `strategyStats`, `performanceHistory`, `achievements`, `achievementCards`

`GET /profile/public/{id}` — vista pública reducida.

**Nota:** No hay endpoint dedicado “top tickets del día global”; el Top 5 del perfil se calcula en frontend desde tickets del usuario.

---

## 10. Mapa de archivos clave

| Área | Archivos |
|------|----------|
| Modalidades | `gameModalities.js`, `ModalityWorkspaceChrome.jsx`, `ModalityTorneoBar.jsx`, `ModalityNavRail.jsx`, `TracksWorkflowList.jsx`, `TracksWorkflowAccordion.jsx` |
| Tickets / picks | `EmbeddedTicketRaces.jsx`, `TrackTicketsPanel.jsx`, `trackTicketUsage.js`, `ticketRaceSummary.js` |
| Estrategias | `RaceCard.jsx`, `.race-strategy-strip*` en `globals.css` |
| Guía torneo | `TournamentGuideModal.jsx`, `tournament-guide.css`, `tournamentGuideAssets.js` |
| Perfil hub | Ver §7.3 + `ProfileView.jsx` |
| i18n | `translations.js` |
| Estilos workspace | `modality-workspace.css` |

---

## 11. Requisitos del cliente

Documento base: **`REQUIREMENTS.md`** (15 jun 2026).

Resumen de lo acordado con el cliente:

- Splash → portada → elección de modalidad
- Menú flotante en casi todas las páginas (visible sin login)
- Tickets: DISPONIBLE (gris) / EN PROGRESO (verde) / USADO (amarillo + ✓)
- 7 carreras inline en misma página
- 3 estrategias en orden Full → Dual → Smart
- Salón de la Fama sin wizard automático
- Sin banner “ELEGIR MODALIDAD” en portada
- Sin barra “1 DISPONIBLE / VER TICKET” en guest

**Actualizar REQUIREMENTS.md** cuando el cliente confirme el hub de perfil y el historial por calendario.

---

## 12. Pendiente / próximos pasos

### Perfil

- [ ] Conectar botones **Editar** / **Compartir** del historial a acciones reales
- [ ] Top 5 “del día” global (leaderboard API) vs solo tickets del usuario
- [ ] Publicidad real en slots TORNEO (CMS o URLs configurables)
- [ ] Botón **Editar perfil** en header (existía en vista antigua)
- [ ] Sincronizar historial calendario 100 % con backend (hoy mezcla API + localStorage guest)

### Modalidades

- [ ] Activar modalidades **paid** y **special** cuando producto lo defina
- [ ] Confirmar flujo E2E portada → modalidad → hipódromo → ticket → 7 carreras → ranking

### General

- [ ] Tests E2E automatizados (no hay suite visible en repo)
- [ ] Documentar variables de entorno FRONTEND/BACKEND en README raíz
- [ ] Política clara sobre `last_racing_sync.json` (ignorar en git)

### UX solicitada pero a verificar en producción

- [ ] Colores exactos de tickets en todos los breakpoints
- [ ] Mockup perfil modalidad 2 (cyan) vs implementación actual (sigue tokens por modalidad activa)

---

## 13. Despliegue

- Frontend desplegado en **Vercel** (según REQUIREMENTS.md)
- Tras push: verificar build en Vercel con commit `f95b05b` ([frontend](https://github.com/Nexar-Bit/50_points/commit/f95b05b)) / `b812e50` ([padre](https://github.com/Nexar-Bit/50points/commit/b812e50))
- Submódulos: recordar **commit dentro de FRONTEND** antes de actualizar puntero en [50points](https://github.com/Nexar-Bit/50points)

---

## 14. Notas para el siguiente desarrollador

1. **Perfil propio vs público:** solo `isOwnProfile` monta `ProfileHubChrome`.
2. **Historial registrado:** `isRegistered = !authUser.isGuest`.
3. **Encabezados morado/amarillo/verde** son fijos en todas las modalidades; el resto de la UI usa `--modality-accent`.
4. **Regenerar assets perfil:** `node scripts/write-profile-hub-assets.mjs` desde `FRONTEND/`.
5. **No commitear** `BACKEND/data/last_racing_sync.json` salvo decisión explícita.
6. **Grep en Windows** a veces falla en paths largos; usar `Read`, `Shell dir`, o rutas absolutas.

---

## 15. Historial de conversación (contexto IA)

Trabajo principal en esta iteración (chat jun 2026):

1. Guía del torneo — tarjetas hover fuera del modal  
2. Legibilidad modalidad guest  
3. Banner TORNEO + nav modalidades  
4. Barras estrategia + bloqueo puntos + ACEPTAR + EDITAR  
5. **Perfil completo** según mockups (hub, ads, tickets, encabezado dinámico)  
6. Encabezados de torneo en **las 4 modalidades**  
7. **Historial de tickets** diferenciado invitado/registrado con calendarios  
8. Git: commit [`f95b05b`](https://github.com/Nexar-Bit/50_points/commit/f95b05b) (FRONTEND) + [`b812e50`](https://github.com/Nexar-Bit/50points/commit/b812e50) (padre), push a `origin`

Transcript de referencia: `agent-transcripts/0f03d4c5-77c0-4eb1-8ee2-5a367ad7ae17/`

---

*Este archivo debe actualizarse al cerrar hitos importantes o antes de entregas al cliente.*
