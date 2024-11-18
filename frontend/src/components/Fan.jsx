import axios from "axios";
import { API_URL } from "../utils/constants";
import { useState } from "react";
import debounce from "lodash.debounce";
import { FaPowerOff, FaEdit, FaFan } from "react-icons/fa";

const Fan = ({ fan }) => {
  const { _id: id } = fan;

  const [name, setName] = useState(fan.name);
  const [description, setDescription] = useState(fan.description);
  const [state, setState] = useState(fan.state);
  const [intensity, setIntensity] = useState(fan.intensity);
  const [isActive, setIsActive] = useState(fan.isActive);  // Verificar si el dispositivo está activo

  const FAN_ENDPOINT = `${API_URL}/devices/fan/${id}`;

  const updateDeviceProperty = async (property, value) => {
    try {
      await axios.put(FAN_ENDPOINT, { [property]: value });
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

  const handleChangeIntensity = (event) => {
    const value = event.target.value;
    setIntensity(value);
    updateIntensity(value);
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
      className={`p-8 rounded-xl shadow-2xl transition-transform transform
        ${state ? "bg-gradient-to-r from-blue-300 to-blue-500 text-gray-800" : "bg-gray-900 text-white"}
        ${!isActive ? "bg-gray-500 cursor-not-allowed" : ""}`} // Cambio de color y cursor si está inactivo
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-3">
          <FaFan className={`transition-transform ${state ? "text-blue-500 scale-125" : "text-gray-500"}`} />
          {name}
          <button
            onClick={clickUpdateName}
            className={`text-blue-400 hover:text-blue-600 transition-colors ${!isActive ? "cursor-not-allowed" : ""}`}
            title="Editar nombre"
            disabled={!isActive} // Deshabilitar si inactivo
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
            className={`text-blue-400 hover:text-blue-600 transition-colors ml-2 ${!isActive ? "cursor-not-allowed" : ""}`}
            title="Editar descripción"
            disabled={!isActive} // Deshabilitar si inactivo
          >
            <FaEdit />
          </button>
        </p>
      </div>

      {/* Estado */}
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
          className={`w-full accent-blue-500 hover:accent-blue-700 ${!isActive ? "cursor-not-allowed" : ""}`}
          disabled={!isActive} // Deshabilitar si inactivo
        />
        <p className="text-sm mt-1">{intensity}%</p>
      </div>
    </div>
  );
};

export default Fan;