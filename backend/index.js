const express = require('express');
const http = require('http');
const connectDb = require('./utils/database');
require("dotenv").config();
const cors = require('cors');

const Light = require('./models/Light');
const Sensor = require('./models/Sensor');
const Fan = require('./models/Fan');

const { initializeWebSocket } = require('./websocket');

// Conexión a la base de datos
connectDb();

// Crear la aplicación de Express
const app = express();
const server = http.createServer(app);
initializeWebSocket(server);

// Middleware básico para la API REST
app.use(express.json());
app.use(cors());

// Endpoints
app.use('/devices', require('./routes/devices'));

// Escuchar en un puerto
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});