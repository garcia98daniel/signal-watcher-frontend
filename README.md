# Signal Watcher - Frontend

Esta es la aplicación de frontend para Signal Watcher, una interfaz de usuario moderna y reactiva construida con Next.js y TypeScript. Permite a los analistas de seguridad interactuar con el backend para gestionar listas de observación y analizar eventos de seguridad.

## Características

- **Interfaz Moderna:** Construida con Tailwind CSS para un diseño limpio y responsivo.
- **Componentes Reutilizables:** Uso de componentes de UI para consistencia y mantenibilidad.
- **Páginas Dinámicas:** Las páginas de Watchlists y Eventos cargan y envían datos a la API del backend en tiempo real.
- **Notificaciones Toast:** Feedback inmediato para el usuario en operaciones clave (crear, eliminar) usando `react-hot-toast`.
- **Localización:** La interfaz de usuario está completamente traducida al español.

## Tecnologías Utilizadas

- **Next.js** (con App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **react-hot-toast** para notificaciones.

---

## Pasos para la Instalación y Ejecución

Sigue estos pasos para levantar el entorno de desarrollo local.

### 1. Prerrequisitos

- **Node.js** (v18 o superior)
- **npm** o un gestor de paquetes compatible.
- **El backend de Signal Watcher debe estar corriendo.** Por defecto, el frontend intentará conectarse a `http://localhost:3001`.

### 2. Clonar y Configurar el Proyecto

```bash
# Navega al directorio del frontend
cd signal-watcher-frontend

# Instala las dependencias
npm install
```

### 3. Configurar Variables de Entorno

El frontend buscará la URL del backend en una variable de entorno. Aunque no es estrictamente necesario para el desarrollo local (ya que tiene un valor por defecto), es una buena práctica crear un archivo `.env.local`:

```env
# URL base de la API del backend
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_API_VERSION=v1
```

### 4. Ejecutar el Servidor de Desarrollo

Una vez completados los pasos anteriores, puedes iniciar el servidor:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

