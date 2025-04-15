import React from 'react'
import { Link } from 'react-router-dom'
import { LucideChefHat, LucideClipboardList, LucideCreditCard, LucideUtensils } from 'lucide-react'

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center space-y-8">
      <h1 className="text-4xl font-bold text-primary">Bienvenido al Sistema POS del Restaurante</h1>
      <p className="text-lg text-gray-300">Selecciona una opción para comenzar:</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl w-full">
        <Link to="/kitchen" className="bg-gray-800 hover:bg-gray-700 transition rounded-2xl p-6 flex flex-col items-center shadow-xl">
          <LucideChefHat size={36} className="mb-3 text-green-400" />
          <h2 className="text-xl font-semibold">Cocina / Bar</h2>
          <p className="text-sm text-gray-400">Ver y preparar pedidos activos</p>
        </Link>

        <Link to="/table/1" className="bg-gray-800 hover:bg-gray-700 transition rounded-2xl p-6 flex flex-col items-center shadow-xl">
          <LucideUtensils size={36} className="mb-3 text-blue-400" />
          <h2 className="text-xl font-semibold">Gestión de Mesa</h2>
          <p className="text-sm text-gray-400">Ver pedidos y agregar nuevos</p>
        </Link>

        <Link to="/menu/1" className="bg-gray-800 hover:bg-gray-700 transition rounded-2xl p-6 flex flex-col items-center shadow-xl">
          <LucideClipboardList size={36} className="mb-3 text-yellow-400" />
          <h2 className="text-xl font-semibold">Menú Digital</h2>
          <p className="text-sm text-gray-400">Vista del menú para el cliente</p>
        </Link>

        <Link to="/payment/1" className="bg-gray-800 hover:bg-gray-700 transition rounded-2xl p-6 flex flex-col items-center shadow-xl">
          <LucideCreditCard size={36} className="mb-3 text-red-400" />
          <h2 className="text-xl font-semibold">Cuenta / Pago</h2>
          <p className="text-sm text-gray-400">Consultar y registrar pagos</p>
        </Link>
      </div>
    </div>
  )
}

export default Home
