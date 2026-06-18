# 50 Points — Documento de Requisitos del Cliente
**Fecha:** 15 Junio 2026  
**Estado:** En desarrollo activo

---

## FLUJO DE ENTRADA (Entry Flow)

### Lo que entendí:
1. Usuario abre la app → aparece **logo/splash** (~2.4 segundos)
2. Después del logo → va a la **PORTADA** (`/`)
3. Desde la portada → el usuario elige y entra al programa
4. **NUNCA** mostrar el Salón de la Fama ni otra pantalla antes de la portada

### La portada muestra:
- Logo TORNEO con corona
- 3 estrategias: **FULL POINT / DUAL POINT / SMART POINT**
- 4 botones de modalidad: Iniciar Sesión, Registrarse, Entrar sin registrarse, Torneo Especial
- ~~Banner "ELEGIR MODALIDAD"~~ → **ELIMINADO** por pedido del cliente

---

## MENÚ FLOTANTE

### Lo que entendí:
- El menú lateral flotante debe aparecer en **TODAS las páginas**
- Debe aparecer para **TODOS los usuarios** (invitado sin registro + usuarios registrados)
- **NO** requiere iniciar sesión para ver el menú
- Solo se oculta en: la portada `/` y las páginas `/login` y `/register`
- Para usuarios NO registrados: el botón inferior muestra **"Iniciar Sesión"**
- Para usuarios registrados: el botón inferior muestra **"Cerrar Sesión"**

---

## MODALIDADES DE JUEGO (en `/inicio`)

### Lo que entendí:
- 4 tarjetas grandes con imagen:
  - **Azul** → Invitado (sin registro)
  - **Magenta/Rosa** → Registrado gratis
  - **Amarillo** → Pago
  - **Gris oscuro** → Especial
- Al hacer clic en una tarjeta → **navega directamente** a `/modalidades/[modo]`
- Los botones SÍ deben funcionar (no solo cambiar color)

---

## PÁGINA DE HIPÓDROMOS (`/modalidades/guest`)

### Lo que entendí:
- Muestra las mismas tarjetas grandes con foto que `/tournaments`
- **Gulfstream Park**, **Churchill Downs**, **Santa Anita Park**
- Cada tarjeta tiene botón **"ENTRAR AL TORNEO >"**
- Al hacer clic → **expande abajo en la MISMA página** (no navega a otra página)
- Se muestra: tickets + carreras, todo en el mismo scroll

### Lo que se ELIMINÓ:
- ~~La barra "1 DISPONIBLE / VER TICKET / JUGAR PRIMERA CARRERA"~~ → **ELIMINADA**

---

## TICKETS (3 estados de color)

### Lo que entendí (exactamente):

| Estado | Color | Texto | Cuándo ocurre |
|--------|-------|-------|--------------|
| **No iniciado** | **Gris oscuro** (relleno sólido) | DISPONIBLE | Cuando el ticket no ha sido tocado |
| **En uso** | **Verde** (relleno sólido) | EN PROGRESO | Cuando el usuario hace clic y está eligiendo carreras |
| **Completado** | **Amarillo** (relleno sólido) + ✓ verde | USADO | Cuando el usuario terminó el ticket |

---

## CARRERAS (dentro del ticket)

### Lo que entendí:
- 7 carreras listadas (CARRERA 1 a CARRERA 7)
- Se pueden expandir haciendo clic
- Al expandir muestra: tabla de caballos con N°, Nombre, Jinete, Entrenador, Peso, Dividendo
- Los números de los caballos tienen colores estándar mundial:
  - 1=Rojo, 2=Blanco, 3=Azul, 4=Amarillo, 5=Verde, 6=Negro/Amarillo, 7=Naranja, 8=Rosa, 9=Turquesa, 10=Morado, 11=Gris, 12=Lima
- Al confirmar picks → la carrera se marca COMPLETADA (opacidad reducida + ✓)

---

## ESTRATEGIAS DE JUEGO

### Lo que entendí (orden exacto, izquierda a derecha):
1. **FULL POINT** → Morado, botón más grande → 50 puntos a 1 caballo
2. **DUAL POINT** → Cyan/Aguamarina → 25 + 25 puntos a 2 caballos
3. **SMART POINT** → Amarillo/Dorado → 30 + 15 + 5 puntos a 3 caballos

### Reglas de puntuación (motor del juego):
- Solo el caballo **GANADOR** suma puntos
- Fórmula: `puntos_asignados × dividendo_oficial`
- Ejemplo Full Point: `50 × 4.20 = 210 puntos`
- Segundo y tercer lugar **NO suman**
- Cada ticket es **independiente** (máx. 3 tickets por torneo)

---

## CHAT EN VIVO

### Lo que entendí:
- Panel de chat visible en `/leaderboard` (tab Chat) y `/chat`
- Avatares con iniciales (no emojis)
- Mensajes de ADMIN → fondo dorado/ámbar
- Mensajes normales → fondo oscuro
- Input con placeholder "Escribe un mensaje..."
- Botón enviar → **morado**
- Disclaimer al pie

---

## SALÓN DE LA FAMA (`/hall-of-fame`)

### Lo que entendí:
- El **wizard de "INGRESO OFICIAL"** ya **NO se abre automáticamente**
- Solo se abre si el usuario hace clic en el botón "Ver mi presentación oficial"
- El podio muestra:
  - **1° lugar** → Círculo magenta + corona de laurel dorada + estrella
  - **2° lugar** → Círculo morado
  - **3° lugar** → Círculo cyan
- Pedestales con bandas: morado, cyan, amarillo

---

## GRUPOS Y HOLOGRAMA

### Lo que entendí:
- Solo **Fundador y Administradores** pueden publicar hologramas
- El holograma aparece como un **banner flotante** que desaparece en **10 segundos**
- El admin elige entre 4 versiones de color: Morado / Aqua / Amarillo / Multicolor
- Después de publicar → **cooldown de 5 minutos** (cuenta regresiva visible)
- Emojis disponibles: 🔥 👑 🏆 ⚡ ⭐ 💎 📢 🚀

---

## FEED DE VIDEOS (`/feed`)

### Lo que entendí:
- Secciones: Jugadores Hot, Carreras en Vivo, En Tendencia, Destacados
- Cada sección tiene **botón X para ocultar**
- Botón **"Restaurar secciones"** para volverlas a mostrar
- Videos se reproducen automáticamente al estar en pantalla
- Se pausan al salir del viewport

---

## PÁGINA DE SIMULACIÓN (`/simulate`)

### Lo que entendí:
- Solo para administradores
- Permite: elegir torneo → ingresar caballo ganador + dividendo por carrera → ejecutar motor de puntuación → ver ranking actualizado
- Valida que el sistema calcule correctamente

---

## LO QUE NO QUIERE EL CLIENTE

| ❌ NO quiere | ✅ SÍ quiere |
|-------------|-------------|
| El wizard del Salón de la Fama al entrar | Solo con botón manual |
| Múltiples páginas para lo mismo | Todo en una sola página cuando sea posible |
| La barra "1 DISPONIBLE / VER TICKET" en `/modalidades/guest` | Eliminada |
| Banner "ELEGIR MODALIDAD" en la portada | Eliminado |
| Iniciar sesión para ver el menú | Menú visible para todos |
| Tickets con texto "LISTO PARA JUGAR" | Texto: DISPONIBLE / EN PROGRESO / USADO |

---

## ESTADO ACTUAL (15 Junio 2026)

### ✅ IMPLEMENTADO y desplegado en Vercel:
- Flujo de entrada (splash → portada)
- Menú flotante para todos los usuarios
- Tarjetas de modo con navegación funcional
- Tarjetas grandes en `/modalidades/guest` (mismo estilo que `/tournaments`)
- Expansión inline de carreras (misma página)
- 3 estados de tickets (gris/verde/amarillo)
- Post-position colors (norma mundial)
- Chat modernizado
- Salón de la Fama (sin auto-apertura)
- Holograma grupal
- Feed de videos
- Página `/simulate`

### ⏳ PENDIENTE / EN REVISIÓN DEL CLIENTE:
- Confirmar que los colores de tickets se ven correctamente
- Confirmar que el flujo portada → modalidades → hipódromos → carrera funciona de extremo a extremo

---

**Nota:** Si algo en este documento no refleja lo que quieres, por favor corrígeme aquí mismo y lo ajusto inmediatamente.
