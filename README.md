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
│   ├── components/       # Componentes React reutilizables
│   ├── pages/           # Páginas principales
│   ├── hooks/           # Custom hooks
│   ├── utils/           # Funciones auxiliares
│   ├── assets/          # Imágenes, logos y recursos estáticos
│   ├── App.tsx          # Componente raíz
│   ├── main.tsx         # Punto de entrada
│   └── index.css        # Estilos globales
├── public/              # Archivos estáticos
├── vite.config.ts       # Configuración de Vite
├── tsconfig.json        # Configuración de TypeScript
├── tailwind.config.js   # Configuración de Tailwind CSS
└── package.json         # Dependencias y scripts
```

---

## 🔧 Scripts Disponibles

| Comando | Descripción |
|---------|------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Construye para producción |
| `npm run preview` | Vista previa del build de producción |
| `npm run lint` | Ejecuta ESLint |
| `npm run type-check` | Valida tipos de TypeScript |

---

## 🌐 API y Endpoints

El endpoint principal `/calendar.ics` genera un feed dinámico compatible con cualquier cliente de calendario que soporte iCalendar. Los cambios en la base de datos se reflejan inmediatamente sin necesidad de redescargas.

```
GET /calendar.ics
Content-Type: text/calendar
```

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está licenciado bajo la **MIT License** — Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

## 👨‍💻 Autor

**Wayner Alberto López y López**  
*Desarrollador Junior | Especialista en React, TypeScript, y Frontend Moderno*

- 🔗 [GitHub](https://github.com/waynergt)
- 💼 [LinkedIn](https://linkedin.com/in/waynerlopez)

---

## 📞 Soporte

¿Tienes dudas o sugerencias? 
- Abre un [issue](https://github.com/waynergt/mundial-web/issues)
- Envía un email a: waynerlopez@example.com

---

<div align="center">

**⭐ Si este proyecto te fue útil, considera dejarle una estrella en GitHub**

Desarrollado con ❤️ para los amantes del fútbol mundial.

</div>