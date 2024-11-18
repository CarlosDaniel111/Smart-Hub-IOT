import { useEffect, useState } from 'react';
import Light from './Light';
import axios from 'axios';
import { API_URL } from '../utils/constants';

const LightList = () => {
  const [lights, setLights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLights();
  }, []);

  async function fetchLights() {
    try {
      const response = await axios.get(`${API_URL}/devices/lights`);
      setLights(response.data);
    } catch (error) {
      setError('Hubo un problema al cargar las luces. Intenta nuevamente.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Lista de Focos</h2>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : lights.length === 0 ? (
        <p className="text-gray-600 text-center">No hay focos disponibles en este momento.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {lights.map((light) => (
            <Light key={light._id} light={light} />
          ))}
        </div>
      )}
    </section>
  );
};

export default LightList;