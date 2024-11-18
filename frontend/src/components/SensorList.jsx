import { useEffect, useState } from 'react';
import Sensor from './Sensor';
import axios from 'axios';
import { API_URL } from '../utils/constants';

const SensorList = () => {
  const [sensors, setSensors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSensor();
  }, []);

  async function fetchSensor() {
    try {
      const response = await axios.get(`${API_URL}/devices/sensors`);
      console.log(response.data);
      setSensors(response.data);
    } catch (error) {
      setError('Hubo un problema al cargar los sensores. Intenta nuevamente.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Lista de Sensores</h2>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : sensors.length === 0 ? (
        <p className="text-gray-600 text-center">No hay sensores disponibles en este momento.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sensors.map((sensor) => (
            <Sensor key={sensor._id} sensor={sensor} />
          ))}
        </div>
      )}
    </section>
  );
};

export default SensorList;