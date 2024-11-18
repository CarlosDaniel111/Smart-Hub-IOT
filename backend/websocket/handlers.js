const Light = require('../models/Light');
const Sensor = require('../models/Sensor');
const Fan = require('../models/Fan');

const handleWebSocketConnection = (ws, wss) => {
  // Mensaje recibido desde el cliente
  ws.on('message', async (message) => {
    try {
      const { type, data } = JSON.parse(message.toString());

      // Checar en la bd si el dispositivo existe
      if (type === "light") {
        let light = await Light.findById(data._id);
        if (!light) {
          light = new Light({ name: "Light-" + data._id, isActive: true, ...data });;
          await light.save();
          ws.send("Dispositivo creado.");
        } else {
          ws.send("Dispositivo encontrado.");

          //Actualizar el dispositivo
          const newData = { ...data, isActive: true };
          await Light.findByIdAndUpdate(newData._id, newData);
        }

        ws.deviceId = "light" + data._id;
      } else if (type === "sensor") {
        let sensor = await Sensor.findById(data._id);
        if (!sensor) {
          sensor = new Sensor({ name: "Sensor-" + data._id, isActive: true, ...data });
          await sensor.save();
          ws.send("Dispositivo creado.");
        } else {
          ws.send("Dispositivo encontrado.");

          //Actualizar el dispositivo
          const newData = { ...data, isActive: true };
          await Sensor.findByIdAndUpdate(data._id, newData);
        }
        ws.deviceId = "sensor" + data._id;
      } else if (type === "fan") {
        let fan = await Fan.findById(data._id);
        if (!fan) {
          fan = new Fan({ name: "Fan-" + data._id, isActive: true, ...data });
          await fan.save();
          ws.send("Dispositivo creado.");
        } else {
          ws.send("Dispositivo encontrado.");

          //Actualizar el dispositivo
          const newData = { ...data, isActive: true };
          await Fan.findByIdAndUpdate(data._id, newData);
        }
        ws.deviceId = "fan" + data._id;
      } else {
        ws.send("Tipo de dispositivo no válido.");
        return;
      }

    } catch (error) {
      console.error("Error al parsear el mensaje:", error);
    }


  });

  ws.on('close', async () => {
    if (ws.deviceId && ws.deviceId.startsWith("light")) {
      await
        Light.findByIdAndUpdate(ws.deviceId.replace("light", ""), { isActive: false });
    } else if (ws.deviceId && ws.deviceId.startsWith("sensor")) {
      await Sensor.findByIdAndUpdate(ws.deviceId.replace("sensor", ""), { isActive: false });
    }
    else if (ws.deviceId && ws.deviceId.startsWith("fan")) {
      await Fan.findByIdAndUpdate(ws.deviceId.replace("fan", ""), { isActive: false });
    }

    console.log('Cliente desconectado');
  });

  ws.send('Conexión exitosa al servidor WebSocket');
};

module.exports = handleWebSocketConnection;