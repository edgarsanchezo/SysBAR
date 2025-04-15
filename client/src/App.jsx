import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Páginas (las iremos creando después)
import Home from './pages/Home'
import Menu from './pages/Menu'
import Kitchen from './pages/Kitchen'
import Table from './pages/Table'
import Payment from './pages/Payment'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <Routes>
        {/* Página principal (puede ser el dashboard o bienvenida) */}
        <Route path="/" element={<Home />} />

        {/* Menú digital visible para el cliente por QR */}
        <Route path="/menu/:tableId" element={<Menu />} />

        {/* Página para la cocina/bar */}
        <Route path="/kitchen" element={<Kitchen />} />

        {/* Vista específica de una mesa (para POS o autogestión) */}
        <Route path="/table/:tableId" element={<Table />} />

        {/* Ver estado de cuenta y solicitar pago */}
        <Route path="/payment/:tableId" element={<Payment />} />

        {/* Ruta fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
