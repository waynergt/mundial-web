# 🏆 Guía Mundialista 26

Aplicación web moderna para sincronizar automáticamente los 104 partidos del **FIFA World Cup 2026™** con tus calendarios favoritos (Apple Calendar, Google Calendar, Outlook, etc.) mediante un feed dinámico iCalendar.

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=3ECF8E)

</div>

---

## ✨ Características Principales

- **🔄 Sincronización Dinámica:** No es una descarga estática. Los usuarios se suscriben a un feed que se actualiza en tiempo real, permitiendo cambios automáticos en los horarios de los cruces eliminatorios sin intervención manual.
  
- **🌍 Conversión Automática de Zonas Horarias:** Todos los eventos se almacenan en UTC. Al sincronizar, los dispositivos del usuario adaptan automáticamente los horarios a su zona local.

- **📊 Datos Oficiales FIFA:** Cobertura completa de las 48 selecciones clasificadas y los 104 partidos del torneo según la programación oficial.

- **⚡ Interfaz Minimalista:** Landing page optimizada con React y Tailwind CSS. Diseño limpio, rápido y orientado a la máxima conversión de usuarios.

---

## 🛠️ Stack Tecnológico

### Frontend
- **[Vite](https://vitejs.dev/)** — Construcción ultrarrápida y hot module replacement
- **[React 18+](https://react.dev/)** — Interfaz de usuario declarativa
- **[TypeScript](https://www.typescriptlang.org/)** — Type safety y mejor experiencia de desarrollo
- **[Tailwind CSS](https://tailwindcss.com/)** — Estilos utilitarios y componentes reutilizables
- **[Lucide React](https://lucide.dev/)** — Iconografía limpia y escalable

### Backend & Datos
- **[Supabase](https://supabase.com/)** — PostgreSQL gestionado en la nube
- **[Edge Functions (Deno)](https://supabase.com/docs/guides/functions)** — Serverless functions para generar feeds iCalendar en tiempo real
- **RFC 5545** — Estándar de calendario para máxima compatibilidad

---

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js **18.x** o superior
- npm o yarn
- (Opcional) Supabase CLI para desarrollo del backend

### Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/waynergt/mundial-web.git
   cd frontend-mundial
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   ```bash
   cp .env.example .env.local
   # Edita .env.local con tus credenciales de Supabase
   ```

4. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:5173` (puerto por defecto de Vite).

### Construcción para Producción

```bash
npm run build
npm run preview  # Preview local del build
```

---

## 📁 Estructura del Proyecto

```
frontend-mundial/
├── src/
│   ├── App.css          # Estilos del componente principal
│   ├── App.tsx          # Componente raíz
│   ├── assets/          # Imágenes y recursos estáticos
│   ├── index.css        # Estilos globales
│   └── main.tsx         # Punto de entrada
├── public/              # Archivos estáticos
├── index.html           # HTML principal
├── vite.config.ts       # Configuración de Vite
├── tsconfig.json        # Configuración base de TypeScript
├── tsconfig.app.json    # Configuración de TypeScript para la app
├── tsconfig.node.json   # Configuración de TypeScript para Node
├── eslint.config.js     # Configuración de ESLint
├── package.json         # Dependencias y scripts
└── README.md            # Este archivo
```

---

## �‍💻 Autor

Desarrollado por **Wayner Alberto López y López**