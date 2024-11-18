const Light = require('../../models/Light');
const { updateLightWS } = require('../../websocket');

const getLights = async (req, res) => {
  try {
    const lights = await Light.find();
    res.json(lights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const getLightById = async (req, res) => {
  try {
    const light = await Light.findById(req.params.id);
    if (!light) {
      return res.status(404).json({ message: "Light not found" });
    }
    res.json(light);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const updateLight = async (req, res) => {
  try {
    const light = await Light.findById(req.params.id);
    if (!light) {
      return res.status(404).json({ message: "Light not found" });
    }
    if (req.body.name != null) light.name = req.body.name;
    if (req.body.description != null) light.description = req.body.description;
    if (req.body.intensity != null) light.intensity = req.body.intensity;
    if (req.body.state != null) light.state = req.body.state;
    if (req.body.temperature != null) light.temperature = req.body.temperature;
    if (req.body.color != null) light.color = req.body.color;
    await light.save();

    updateLightWS(light);

    res.json(light);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getLights,
  getLightById,
  updateLight
};