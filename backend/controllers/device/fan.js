const Fan = require('../../models/Fan');
const { updateFanWS } = require('../../websocket');

const getFans = async (req, res) => {
  try {
    const fan = await Fan.find();
    res.json(fan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const getFanById = async (req, res) => {
  try {
    const fan = await Fan.findById(req.params.id);
    if (!fan) {
      return res.status(404).json({ message: "Fan not found" });
    }
    res.json(fan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const updateFan = async (req, res) => {
  try {
    const fan = await Fan.findById(req.params.id);
    if (!fan) {
      return res.status(404).json({ message: "Fan not found" });
    }
    if (req.body.name) fan.name = req.body.name;
    if (req.body.description) fan.description = req.body.description;
    if (req.body.state != null) fan.state = req.body.state;
    if (req.body.intensity != null) fan.intensity = req.body.intensity;
    await fan.save();

    updateFanWS(fan);

    res.json(fan);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getFans,
  getFanById,
  updateFan
};