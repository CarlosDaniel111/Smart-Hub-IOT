import LightList from './components/LightList';
import FanList from './components/FanList';
import SensorList from './components/SensorList';
import Header from './components/Header';

function App() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="p-6">
        <div className="container mx-auto">
          <section id="lights" className="mb-12">
            <LightList />
          </section>

          <section id="fans" className="mb-12">
            <FanList />
          </section>

          <section id="sensors" className="mb-12">
            <SensorList />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© 2024 Dashboard IoT | Todos los derechos reservados.</p>
      </footer>
    </>
  );
}

export default App;