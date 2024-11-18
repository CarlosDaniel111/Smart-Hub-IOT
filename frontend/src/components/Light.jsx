import axios from "axios";
import { API_URL } from "../utils/constants";
import { useState } from "react";
import debounce from "lodash.debounce";
import { Wheel } from "@uiw/react-color";
import { FaPowerOff, FaEdit, FaLightbulb, FaThermometerHalf } from "react-icons/fa";

const Light = ({ light }) => {
  const { _id: id } = light;

  const [name, setName] = useState(light.name);
  const [description, setDescription] = useState(light.description);
  const [state, setState] = useState(light.state);
  const [temperature, setTemperature] = useState(light.temperature);
  const [intensity, setIntensity] = useState(light.intensity);
  const [color, setColor] = useState(light.color);
  const [isActive, setIsActive] = useState(light.isActive);

  const LIGHT_ENDPOINT = `${API_URL}/devices/light/${id}`;

  const updateDeviceProperty = async (property, value) => {
    try {
      await axios.put(LIGHT_ENDPOINT, { [property]: value });
    } catch (error) {
      console.error(`Error al actualizar ${property}:`, error);
    }
  };

  const handleSwitch = async () => {
    const newState = !state;
    await updateDeviceProperty("state", newState);
    setState(newState);
  };

  const updateIntensity = debounce(async (value) => {
    await updateDeviceProperty("intensity", value);
  }, 500);

  const updateTemperature = debounce(async (value) => {
    await updateDeviceProperty("temperature", value);
  }, 500);

  const updateColor = debounce(async (value) => {
    await updateDeviceProperty("color", value);
  }, 500);

  const handleChangeIntensity = (event) => {
    const value = event.target.value;
    setIntensity(value);
    updateIntensity(value);
  };

  const handleChangeTemperature = (event) => {
    const value = event.target.value;
    setTemperature(value);
    updateTemperature(value);
  };

  const handleChangeColor = (newColor) => {
    if (!isActive) return;
    setColor(newColor);
    updateColor(newColor);
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
      className={`p-8 rounded-xl shadow-2xl transition-all
        ${state ? "bg-gradient-to-r from-yellow-300 to-yellow-500 text-gray-800" : "bg-gray-900 text-white"}
        ${!isActive ? "bg-gray-600 text-gray-400 cursor-not-allowed" : ""}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-3">
          <FaLightbulb className={`transition-transform ${state ? "text-yellow-500 scale-125" : "text-gray-500"}`} />
          {name}
          <button
            onClick={clickUpdateName}
            className="text-blue-400 hover:text-blue-600 transition-colors"
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
            className="text-blue-400 hover:text-blue-600 transition-colors ml-2"
            title="Editar descripción"
            disabled={!isActive}
          >
            <FaEdit />
          </button>
        </p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handleSwitch}
          className={`py-3 px-6 rounded-lg font-medium text-lg shadow-md flex items-center gap-3 transition-all
            ${state ? "bg-red-600 hover:bg-red-700 text-white" : "bg-green-500 hover:bg-green-600 text-white"}
            ${!isActive ? "cursor-not-allowed opacity-50" : ""}`} // Cambio de estilo si está inactivo
          disabled={!isActive} // Deshabilitar si inactivo
        >
          <FaPowerOff />
          {state ? "Apagar" : "Encender"}
        </button>
      </div>

      {/* Intensidad */}
      <div className="mb-6">
        <label htmlFor="intensity" className="block font-semibold mb-2">
          Intensidad:
        </label>
        <input
          id="intensity"
          type="range"
          min="0"
          max="100"
          value={intensity}
          onChange={handleChangeIntensity}
          className="w-full accent-yellow-500 hover:accent-yellow-600 transition-colors"
          disabled={!isActive}
        />
        <p className="text-sm mt-1">{intensity}%</p>
      </div>

      {/* Temperatura */}
      <div className="mb-6">
        <label htmlFor="temperature" className="block font-semibold mb-2 flex items-center gap-3">
          <FaThermometerHalf /> Temperatura:
        </label>
        <input
          id="temperature"
          type="range"
          min="0"
          max="100"
          value={temperature}
          onChange={handleChangeTemperature}
          className="w-full accent-yellow-500 hover:accent-yellow-600 transition-colors"
          disabled={!isActive}
        />
      </div>

      {/* Color */}
      <div className="flex flex-col items-center">
        <p className="block font-semibold mb-2">Color:</p>
        <Wheel
          color={color}
          onChange={(color) => handleChangeColor(color.hex)}
          className="rounded-lg"
          disabled={!isActive}
        />
      </div>
    </div>
  );
};

export default Light;