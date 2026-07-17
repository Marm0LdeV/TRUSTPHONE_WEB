# 📱 TRUSTPHONE WEB

TRUSTPHONE WEB es una aplicación web desarrollada para ofrecer una plataforma moderna, rápida e intuitiva para la gestión y visualización de productos y servicios de TRUSTPHONE. El proyecto fue construido utilizando React y Vite, implementando una arquitectura basada en componentes reutilizables, navegación dinámica y una interfaz responsiva orientada a mejorar la experiencia del usuario.

---

# 📑 Tabla de Contenidos

- Descripción General
- Funcionalidades
- Tecnologías Utilizadas
- Dependencias del Proyecto
- Estructura del Proyecto
- Instalación y Configuración
- Variables de Entorno
- Scripts Disponibles
- Arquitectura del Proyecto
- Buenas Prácticas
- Licencia

---

# 📖 Descripción General

TRUSTPHONE WEB fue desarrollado como el frontend principal del sistema TRUSTPHONE, proporcionando una interfaz amigable para que los usuarios puedan navegar por el catálogo de productos, acceder a información de la empresa, gestionar su cuenta y utilizar las distintas funcionalidades del sistema.

El proyecto sigue una arquitectura modular basada en componentes, permitiendo que el código sea fácil de mantener, reutilizar y escalar.

Como convención de desarrollo se utiliza **camelCase** para variables, funciones y propiedades.

---

# ✨ Funcionalidades

- Inicio de sesión de usuarios.
- Registro de nuevas cuentas.
- Recuperación de contraseña.
- Navegación mediante React Router.
- Catálogo de productos.
- Carrito de compras.
- Página de contacto.
- Visualización de ubicación mediante Leaflet.
- Componentes reutilizables.
- Diseño completamente responsivo.

---

# 🛠 Tecnologías Utilizadas

## Frontend

- React 19
- Vite
- JavaScript ES6
- Tailwind CSS

## Navegación

- React Router DOM

## Mapas

- React Leaflet
- Leaflet

## Interfaz

- SweetAlert2
- Lucide React

---

# 📦 Dependencias del Proyecto

| Paquete | Uso |
|----------|-----|
| react | Construcción de la interfaz |
| react-dom | Renderizado de React |
| vite | Entorno de desarrollo |
| react-router-dom | Navegación entre páginas |
| tailwindcss | Estilos responsivos |
| leaflet | Motor de mapas |
| react-leaflet | Componentes React para mapas |
| sweetalert2 | Alertas personalizadas |
| lucide-react | Iconografía |

---

# 📁 Estructura del Proyecto

```text
TRUSTPHONE_WEB
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md
```

## Descripción de carpetas

| Carpeta | Descripción |
|----------|-------------|
| public | Recursos públicos del proyecto |
| assets | Imágenes, íconos y archivos estáticos |
| components | Componentes reutilizables |
| hooks | Hooks personalizados |
| pages | Vistas principales del sistema |

---

# 🚀 Instalación y Configuración

## Requisitos

- Node.js 18 o superior
- npm

## 1. Clonar el repositorio

```bash
git clone https://github.com/Marm0LdeV/TRUSTPHONE_WEB.git
```

```bash
cd TRUSTPHONE_WEB
```

## 2. Instalar dependencias

```bash
npm install
```

## 3. Ejecutar el proyecto

```bash
npm run dev
```

El proyecto estará disponible en:

```
http://localhost:5173
```

---

# ⚙ Variables de Entorno

Crear un archivo **.env** en la raíz del proyecto si el sistema requiere consumir una API.

```env
VITE_API_URL=http://localhost:4000/api
```

> **Importante:** El archivo `.env` no debe subirse al repositorio y debe estar incluido en `.gitignore`.

---

# 📜 Scripts Disponibles

| Script | Descripción |
|---------|-------------|
| npm run dev | Ejecuta el proyecto en desarrollo |
| npm run build | Compila la aplicación para producción |
| npm run preview | Visualiza la versión compilada |
| npm run lint | Analiza el código en busca de errores |

---

# 🏗 Arquitectura del Proyecto

```text
Usuario
    │
    ▼
React Router
    │
    ▼
Pages
    │
    ▼
Components
    │
    ▼
Hooks
    │
    ▼
API / Backend
```

Esta arquitectura facilita:

- Reutilización de componentes.
- Separación de responsabilidades.
- Escalabilidad del sistema.
- Fácil mantenimiento del código.

---

# 📷 Capturas del Sistema

Se recomienda agregar capturas de:

- Página Principal
- Inicio de Sesión
- Registro
- Catálogo
- Carrito
- Contacto

---

# 🧑‍💻 Buenas Prácticas

- Mantener la estructura de carpetas.
- Reutilizar componentes siempre que sea posible.
- Utilizar Hooks para lógica compartida.
- Documentar nuevas funcionalidades.
- Mantener actualizadas las dependencias del proyecto.
- Seguir la convención **camelCase** para nombres de variables y funciones.

---

# 👨‍💻 Equipo de Desarrollo

Proyecto desarrollado por el equipo de **TRUSTPHONE**.

Repositorio oficial:

**https://github.com/Marm0LdeV/TRUSTPHONE_WEB**

---

# 📄 Licencia

Este proyecto fue desarrollado con fines académicos y educativos.

Todos los derechos reservados © 2026.
