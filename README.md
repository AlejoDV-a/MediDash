
=======
# 🗓️ MediDash - Sistema de Agendamiento de Citas Médicas

MediDash es una aplicación web moderna para la gestión de citas médicas, desarrollada con tecnologías de última generación como **Next.js**, **TypeScript** y **Neon (PostgreSQL)**. Incluye panel de administración, vistas para secretarias y componentes reutilizables para una experiencia fluida.

---

## 🚀 Tecnologías principales

- **Next.js** 15 – Framework React para frontend y backend
- **TypeScript** – Tipado estático y desarrollo más robusto
- **PostgreSQL** – Base de datos relacional escalable, alojada en [Neon](https://neon.tech/)
- **Tailwind CSS** – Utilidades para estilos rápidos y responsivos
- **shadcn/ui** – Componentes accesibles y personalizables

---

## 🛠️ Instalación y ejecución

### 1. Clona el repositorio

```bash
git clone https://github.com/AlejoDV-a/medidash.git
cd medidash
2. Instala dependencias
bash
Copiar
Editar
npm install
# o
yarn
3. Configura el entorno
Crea un archivo .env y añade tu conexión a la base de datos PostgreSQL (Neon):

env
Copiar
Editar
DATABASE_URL=postgresql://usuario:contraseña@host.db.neon.tech/dbname?sslmode=require
NEXT_PUBLIC_APP_URL=http://localhost:3000
4. Ejecuta migraciones y siembra (opcional)
bash
Copiar
Editar
npx prisma migrate dev
npx prisma db seed
5. Inicia la app
bash
Copiar
Editar
npm run dev
📁 Estructura del proyecto
bash
Copiar
Editar
.
├── app/              # Rutas y páginas en Next.js App Router
├── components/       # Componentes reutilizables (botones, formularios, cards)
├── lib/              # Utilidades y helpers (formateadores, validaciones)          # Esquema de base de datos y migraciones
├── public/           # Recursos públicos como imágenes         # Estilos globales (Tailwind)
├── .env              # Variables de entorno
└── README.md
🧪 Pruebas y herramientas recomendadas


Vercel para despliegue rápido y gratuito de Next.js

✨ Funcionalidades actuales
Gestión de citas médicas

Vista por día y semana del calendario

Estado de citas: disponible, agendada, pendiente

Panel de administración

Roles de usuario (admin, secretaria, médico – próximamente)

📌 Próximas mejoras
Sistema de autenticación con clerk/auth.js

Notificaciones por correo o WhatsApp

Panel para pacientes

Historial de citas

🧑‍💻 Desarrollado por
[Alejandro Velasco] – alejandrovdv489@gmail.com
GitHub: @AlejoDV-a

📝 Licencia
Este proyecto está bajo la licencia MIT.

yaml
Copiar
Editar

---






/app                -> rutas y páginas
/components         -> componentes reutilizables
/lib                -> funciones utilitarias, helpers
/hooks              -> custom React hooks
/types              -> tipos TypeScript personalizados
/services           -> funciones para consumir tu backend o API
/prisma (opcional)      -> conexión a base de datos o prisma client



api : 
/api/citas
/api/pacientes
/api/medicos


Diseñar las Interfaces Principales (UI)
Usando los componentes de ShadCN, construye las siguientes vistas clave:

📆 Panel para ver citas por día/semana (usa calendarios como react-big-calendar o @fullcalendar/react)

➕ Formulario para crear citas

👤 Gestión de pacientes y médicos

🔒 Inicio de sesión/registro (si aún no lo implementaste)


 Autenticación y Autorización
Puedes usar:

NextAuth.js (si manejas el auth del lado de Next)

O integrar tu backend Laravel si ya maneja tokens (JWT, Sanctum)



Persistencia de Datos
Si tu app es full-stack con Next.js, considera usar:

Prisma + PostgreSQL

O conexión con tu backend Laravel vía fetch/axios


Estado Global (si es necesario)
Para manejar estado entre componentes puedes usar:

Zustand (ligero)

Context API (nativo)

TanStack Query para datos remotos (ideal para sincronizar citas con el backend)

Pruebas y Validaciones
Validaciones de formularios con react-hook-form + zod

Tests unitarios con jest o integración con playwright


=======





