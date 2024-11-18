import React from 'react'

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard de Dispositivos</h1>
        <nav className='hidden lg:block'>
          <ul className="flex space-x-6">
            <li><a href="#lights" className="hover:text-yellow-400">Luces</a></li>
            <li><a href="#fans" className="hover:text-yellow-400">Ventiladores</a></li>
            <li><a href="#sensors" className="hover:text-yellow-400">Sensores</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header