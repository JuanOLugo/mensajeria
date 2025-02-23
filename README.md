# Mensajeria App

## Descripción
Mensajeria App es una plataforma de mensajería en tiempo real desarrollada con **TypeScript**, **Node.js**, **Express**, **MongoDB**, y **React**. Utiliza **WebSockets (Socket.io)** para comunicación en vivo y **Passport.js** para autenticación segura.

## Tecnologías utilizadas
### Backend (server/)
- **Node.js** + **TypeScript**
- **Express.js**
- **MongoDB** (con Mongoose ORM)
- **Socket.io** (para WebSockets)
- **Passport.js** (para autenticación JWT)
- **Docker** (opcional)

### Frontend (client/)
- **React.js** + **Vite**
- **Tailwind CSS**
- **TypeScript**

## Requisitos previos
- **Node.js** (versión LTS recomendada)
- **MongoDB** instalado localmente o usar MongoDB Atlas
- **Docker** (opcional, para levantar servicios con `docker-compose`)
- **Git** para clonar el repositorio

## Instalación y ejecución

### 1. Clonar el repositorio
```sh
git clone https://github.com/JuanOLugo/mensajeria.git
cd mensajeria
```

### 2. Configurar variables de entorno
#### Backend (server/.env)
Crea un archivo `.env` en la carpeta `server/` con lo siguiente:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mensajeria
JWT_SECRET=your_secret_key
```
Si usas **MongoDB Atlas**, reemplaza `MONGO_URI` con tu cadena de conexión.

#### Frontend (client/.env)
Crea un archivo `.env` en `client/` con:
```env
VITE_API_URL=http://localhost:5000
```

### 3. Instalar dependencias
Ejecuta estos comandos en ambas carpetas (`server/` y `client/`):
```sh
cd server
npm install
cd ../client
npm install
```

### 4. Ejecutar el proyecto
#### Opción 1: Ejecutar manualmente
En terminales separadas:
```sh
cd server
npm run dev
```
```sh
cd client
npm run dev
```
El frontend estará disponible en `http://localhost:5173` y el backend en `http://localhost:5000`.

#### Opción 2: Usar Docker
Si tienes **Docker** instalado, puedes ejecutar todo con:
```sh
docker-compose up --build
```

## Endpoints principales (Backend)
### **Autenticación**
- `POST /api/users/register` - Registrar usuario
- `POST /api/users/login` - Iniciar sesión

### **Chats**
- `GET /api/chats/getmychat` - Obtener mis chats

### **Usuarios**
- `GET /api/users/userbasic` - Obtener información básica del usuario

## WebSockets (Mensajería en tiempo real)
Mensajeria App usa **Socket.io** para comunicación en tiempo real:
```js
const socket = io('http://localhost:5000');
socket.on('message', (msg) => console.log(msg));
socket.emit('sendMessage', { senderId, receiverId, message });
```

## Estructura del proyecto
```
mensajeria/
├── client/       # Frontend React
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
├── server/       # Backend Node.js
│   ├── src/
│   │   ├── DB/               # Configuración de MongoDB
│   │   ├── Interfaces/       # Definiciones TypeScript
│   │   ├── middlewares/      # Middlewares Express
│   │   ├── Auth/             # Passport.js configuración
│   │   ├── Routes/           # Definición de rutas
│   │   ├── index.ts          # Punto de entrada
│   ├── package.json
│   ├── tsconfig.json
├── docker-compose.yml
```

## Contribuciones
Si deseas contribuir:
1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature-nueva`).
3. Realiza cambios y haz commit (`git commit -m 'Añadir nueva característica'`).
4. Sube los cambios (`git push origin feature-nueva`).
5. Abre un Pull Request.

## Licencia
Este proyecto está bajo la licencia MIT. ¡Eres libre de usarlo y mejorarlo!

