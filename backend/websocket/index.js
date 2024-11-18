const { WebSocketServer } = require('ws');
const handleWebSocketConnection = require('./handlers.js');
const Light = require('../models/Light');

let wss;

const initializeWebSocket = (server) => {
  wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    console.log('Cliente conectado');
    handleWebSocketConnection(ws, wss);
  });

  console.log('WebSocket Server inicializado');
};

const updateLightWS = async (light) => {
  const lightId = "light" + light._id;
  wss.clients.forEach((client) => {
    if (client.deviceId === lightId && client.readyState === 1) {
      client.send(JSON.stringify(light));
    }
  });
};

const updateSensorWS = async (sensor) => {
  const sensorId = "sensor" + sensor._id;
  wss.clients.forEach((client) => {
    if (client.deviceId === sensorId && client.readyState === 1) {
      client.send(JSON.stringify(sensor));
    }
  });
};

const updateFanWS = async (fan) => {
  const fanId = "fan" + fan._id;
  wss.clients.forEach((client) => {
    if (client.deviceId === fanId && client.readyState === 1) {
      client.send(JSON.stringify(fan));
    }
  });
};

module.exports = { initializeWebSocket, updateLightWS, updateSensorWS, updateFanWS };