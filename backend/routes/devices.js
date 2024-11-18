const express = require('express');

const { getLights, getLightById, updateLight } = require('../controllers/device/light');
const { getFans, getFanById, updateFan } = require('../controllers/device/fan');
const { getSensors, getSensorById, updateSensor } = require('../controllers/device/sensor');

const router = express.Router();

router.get('/lights', getLights);
router.get('/light/:id', getLightById);
router.put('/light/:id', updateLight);

router.get('/fans', getFans);
router.get('/fan/:id', getFanById);
router.put('/fan/:id', updateFan);

router.get('/sensors', getSensors);
router.get('/sensor/:id', getSensorById);
router.put('/sensor/:id', updateSensor);

module.exports = router;