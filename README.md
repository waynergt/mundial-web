# 🏆 Guía Mundialista 26 - Calendario Dinámico

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=3ECF8E)

Una aplicación web minimalista que permite a los usuarios sincronizar los 104 partidos del Mundial 2026 directamente en sus dispositivos (Apple Calendar y Google Calendar) mediante un feed dinámico `.ics`.

## ✨ Características Principales

* **Sincronización Dinámica (iCalendar):** Los usuarios no descargan un archivo estático; se suscriben a un feed. Esto permite actualizar los cruces de las fases eliminatorias en tiempo real sin que el usuario deba realizar ninguna acción extra.
* **Conversión de Zona Horaria:** La base de datos maneja los tiempos en formato universal (UTC). Al generar el archivo `.ics`, los dispositivos de los usuarios interpretan y adaptan automáticamente el horario a su zona local.
* **Datos Oficiales:** Integración de las 48 selecciones clasificadas y los 104 partidos oficiales programados por la FIFA.
* **Interfaz Premium:** Landing page desarrollada con React y estilizada con Tailwind CSS para una experiencia de usuario rápida, elegante y orientada a la conversión.

## 🛠️ Arquitectura y Tecnologías

El proyecto está dividido en dos capas principales:

1. **Frontend (Cliente):**
   * Construido con **Vite**, **React** y **TypeScript**.
   * Estilos utilitarios manejados con **Tailwind CSS**.
   * Iconografía vectorial ligera gracias a **Lucide React**.

2. **Backend (API y Base de Datos):**
   * **Supabase (PostgreSQL):** Base de datos relacional con tablas normalizadas para `teams` y `matches`.
   * **Edge Functions (Deno):** Un endpoint *serverless* escrito en TypeScript que consulta la base de datos, formatea la información según el estándar RFC 5545 y devuelve un archivo `text/calendar` válido.

## 🚀 Instalación y Despliegue Local

Si deseas clonar este proyecto y correrlo en tu entorno local, sigue estos pasos:

### Prerrequisitos
* Node.js (v18 o superior)
* npm o yarn
* Supabase CLI (para el backend)

### Configuración del Frontend
1. Clona el repositorio:
```bash
   git clone [https://github.com/waynergt/mundial-web.git](https://github.com/waynergt/mundial-web.git)

2. Entra al directorio e instala las dependencias:
```bash
    cd mundial-web
    npm install

3. Ejecuta el servidor de desarrollo:
```bash
    npm run dev



👨‍💻 Autor
Desarrollado por Wayner Alberto López y López - Desarrollador Junior con experiencia en la creación de proyectos utilizando APIs, frontend, React, TypeScript y Tailwind CSS.