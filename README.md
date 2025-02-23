# Mensajeria Backend

## Descripción
Mensajeria Backend es una API RESTful desarrollada con Node.js y Express para gestionar el envío y recepción de mensajes en tiempo real. Utiliza MongoDB como base de datos y WebSockets para comunicación en vivo.

## Tecnologías utilizadas
- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework para el backend
- **MongoDB** - Base de datos NoSQL
- **Socket.io** - Comunicación en tiempo real
- **Dotenv** - Manejo de variables de entorno

## Requisitos previos
Antes de ejecutar el proyecto, asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (versión LTS recomendada)
- [MongoDB](https://www.mongodb.com/) (instancia local o Atlas)
- [Git](https://git-scm.com/) para clonar el repositorio

## Instalación y ejecución

### 1. Clonar el repositorio
```sh
git clone https://github.com/JuanOLugo/mensajeria.git
cd mensajeria
```

### 2. Instalar dependencias
```sh
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto con la siguiente configuración:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mensajeria
JWT_SECRET=your_secret_key
```

Si utilizas MongoDB Atlas, reemplaza `MONGO_URI` con tu cadena de conexión.

### 4. Ejecutar el servidor
```sh
npm start
```
El backend estará disponible en `http://localhost:5000`.

## Endpoints principales
### **Autenticación**
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión

### **Mensajes**
- `GET /api/messages/:conversationId` - Obtener mensajes de una conversación
- `POST /api/messages` - Enviar un mensaje

### **Usuarios**
- `GET /api/users` - Listar usuarios
- `GET /api/users/:id` - Obtener información de un usuario

## WebSockets
Mensajeria Backend utiliza **Socket.io** para mensajes en tiempo real. Para conectarte:
```js
const socket = io('http://localhost:5000');
socket.on('message', (msg) => console.log(msg));
socket.emit('sendMessage', { senderId, receiverId, message });
```

## Contribuciones
Si deseas contribuir al proyecto:
1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature-nueva`).
3. Realiza cambios y haz commit (`git commit -m 'Añadir nueva característica'`).
4. Sube los cambios (`git push origin feature-nueva`).
5. Abre un Pull Request.

## Licencia
Este proyecto está bajo la licencia MIT. ¡Eres libre de usarlo y mejorarlo!

