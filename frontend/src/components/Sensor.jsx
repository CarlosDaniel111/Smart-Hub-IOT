import axios from "axios";
import { API_URL } from "../utils/constants";
import { useState } from "react";
import debounce from "lodash.debounce";
import { FaEdit, FaTemperatureHigh, FaTint, FaRegHandshake } from "react-icons/fa";

const Sensor = ({ sensor }) => {
  const { _id: id } = sensor;

  const [isActive, setIsActive] = useState(sensor.isActive);
  const [name, setName] = useState(sensor.name);
  const [description, setDescription] = useState(sensor.description);
  const [humidity, setHumidity] = useState(sensor.humidity);
  const [temperature, setTemperature] = useState(sensor.temperature);
  const [vibration, setVibration] = useState(sensor.vibration);
  const [aperture, setAperture] = useState(sensor.aperture);

  const SENSOR_ENDPOINT = `${API_URL}/devices/sensor/${id}`;

  const updateDeviceProperty = async (property, value) => {
    try {
      await axios.put(SENSOR_ENDPOINT, { [property]: value });
    } catch (error) {
      console.error(`Error al actualizar ${property}:`, error);
    }
  };

  const updateAperture = debounce(async (value) => {
    await updateDeviceProperty("aperture", value);
  }, 500);

  const handleChangeAperture = (event) => {
    const value = event.target.value;
    setAperture(value);
    updateAperture(value);
  };

  const clickUpdateName = async () => {
    const newName = prompt("Ingrese el nuevo nombre", name);
    if (newName) {
      setName(newName);
      await updateDeviceProperty("name", newName);
    }
  };

  const clickUpdateDescription = async () => {
    const newDescription = prompt("Ingrese la nueva descripción", description);
    if (newDescription) {
      setDescription(newDescription);
      await updateDeviceProperty("description", newDescription);
    }
  };

  return (
    <div
      className={`p-8 rounded-xl shadow-2xl transition-transform transform bg-gray-900 text-white ${!isActive && 'opacity-50 pointer-events-none'}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-3">
          <FaRegHandshake className="text-gray-500" />
          {name}
          <button
            onClick={clickUpdateName}
            className={`text-blue-400 hover:text-blue-600 transition-colors ${!isActive && 'cursor-not-allowed'}`}
            title="Editar nombre"
            disabled={!isActive}
          >
            <FaEdit />
          </button>
        </h2>
      </div>

      {/* Descripción */}
      <div className="mb-6">
        <p className="text-sm">
          <strong>Descripción:</strong> {description || "Sin descripción"}
          <button
            onClick={clickUpdateDescription}
            className={`text-blue-400 hover:text-blue-600 transition-colors ml-2 ${!isActive && 'cursor-not-allowed'}`}
            title="Editar descripción"
            disabled={!isActive}
          >
            <FaEdit />
          </button>
        </p>
      </div>

      {/* Humedad */}
      <div className="mb-6">
        <p className="text-sm flex items-center gap-2">
          <FaTint />
          <strong>Humedad:</strong> {humidity}%
        </p>
      </div>

      {/* Temperatura */}
      <div className="mb-6">
        <p className="text-sm flex items-center gap-2">
          <FaTemperatureHigh />
          <strong>Temperatura:</strong> {temperature}°C
        </p>
      </div>

      {/* Vibración */}
      <div className="mb-6">
        <p className="text-sm flex items-center gap-2">
          <FaRegHandshake />
          <strong>Vibración:</strong> {vibration} mm/s²
        </p>
      </div>

      {/* Apertura */}
      <div className="mb-6">
        <label htmlFor="aperture" className="block font-semibold mb-2">
          Apertura:
        </label>
        <input
          id="aperture"
          type="range"
          min="0"
          max="100"
          value={aperture}
          onChange={handleChangeAperture}
          className={`w-full accent-green-500 hover:accent-green-700 ${!isActive && 'cursor-not-allowed'}`}
          disabled={!isActive}
        />
        <p className="text-sm mt-1">{aperture}%</p>
      </div>
    </div>
  );
};

export default Sensor;