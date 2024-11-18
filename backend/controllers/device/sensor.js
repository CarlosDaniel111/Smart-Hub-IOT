const Sensor = require('../../models/Sensor');
const { updateSensorWS } = require('../../websocket/index');

const getSensors = async (req, res) => {
  try {
    const sensor = await Sensor.find();
    res.json(sensor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getSensorById = async (req, res) => {
  try {
    const sensor = await Sensor.findById(req.params.id);
    if (!sensor) {
      return res.status(404).json({ message: "Sensor not found" });
    }
    res.json(sensor);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const updateSensor = async (req, res) => {
  try {
    const sensor = await Sensor.findById(req.params.id);
    if (!sensor) {
      return res.status(404).json({ message: "Sensor not found" });
    }
    if (req.body.name != null) sensor.name = req.body.name;
    if (req.body.description != null) sensor.description = req.body.description;
    if (req.body.aperture != null) sensor.aperture = req.body.aperture;
    await sensor.save();

    updateSensorWS(sensor);

    res.json(sensor);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getSensors,
  getSensorById,
  updateSensor
};
