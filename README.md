# My Agentic App

Una aplicación de chat con IA que combina Angular con Genkit para crear un asistente inteligente de soporte al cliente.

## 🏗️ Arquitectura

- **Frontend**: Angular 20 + Kendo UI Conversational Components
- **Backend**: Node.js + TypeScript + Google Genkit + Express
- **IA**: Google Gemini 2.5 Flash

## �� Instalación y Configuración

### Prerrequisitos

- Node.js 18+
- npm o yarn
- Clave API de Google AI

### 1. Configuración del Backend

```bash
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env y agregar tu GOOGLE_GENAI_API_KEY
```

### 2. Configuración del Frontend

```bash
cd my-angular-chat-ui

# Instalar dependencias
npm install
```

### 3. Obtener API Key de Google AI

1. Ve a [Google AI Studio](https://ai.google.dev/)
2. Crea una nueva API key
3. Cópiala en el archivo `backend/.env`

## 🎯 Ejecución

### Backend

```bash
cd backend
npx tsx src/index.ts
```

El servidor estará disponible en: `http://localhost:3400`

### Frontend

```bash
cd my-angular-chat-ui
ng serve
```

La aplicación estará disponible en: `http://localhost:4200`

## 📋 Funcionalidades

- ✅ Chat conversacional con IA
- ✅ Consulta de estado de órdenes
- ✅ Interfaz moderna con Kendo UI
- ✅ API REST con Express
- ✅ Integración con Google Gemini

## 🛠️ Desarrollo

### Estructura del Proyecto

```
my-agentic-app/
├── backend/                 # Servidor Node.js + Genkit
│   ├── src/
│   │   └── index.ts        # Configuración de Genkit y Express
│   ├── .env.example        # Variables de entorno de ejemplo
│   └── package.json
└── my-angular-chat-ui/     # Aplicación Angular
    ├── src/
    │   └── app/
    │       ├── app.ts      # Componente principal
    │       └── services/   # Servicios Angular
    └── package.json
```

### API Endpoints

- `POST /api/flows/orderSupportFlow` - Enviar mensaje al agente IA
- `GET /health` - Health check del servidor

## 📝 Notas

- El archivo `.env` contiene información sensible y no debe ser commiteado
- El proyecto incluye herramientas de Genkit para desarrollo y debugging
- CORS está configurado para desarrollo local

