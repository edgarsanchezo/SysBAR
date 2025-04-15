// routes/tables.js

import express from 'express';
import { tables } from '../models/tables.js';
import { menu } from '../models/menu.js';

const router = express.Router();

/**
 * Asignar una mesa por QR escaneado
 * Simula la asignación automática al escanear un código QR en una mesa vacía.
 * Devuelve el ID de mesa asignado y el menú disponible.
 */
router.post('/assign-by-qr', (req, res) => {
  const availableTable = tables.find(t => t.status === 'libre');
  if (!availableTable) {
    return res.status(404).json({ message: 'No hay mesas disponibles.' });
  }

  availableTable.status = 'ocupada';
  availableTable.clientOrigin = 'qr';

  return res.json({
    message: `Mesa ${availableTable.id} asignada por QR.`,
    table: availableTable,
    menu
  });
});

/**
 * Asignar una mesa desde el POS por parte del mesero
 * Permite al mesero asignar manualmente una mesa a un cliente.
 */
router.post('/assign-by-waiter', (req, res) => {
  const { tableId } = req.body;
  const table = tables.find(t => t.id === tableId);

  if (!table) {
    return res.status(404).json({ message: 'Mesa no encontrada.' });
  }

  if (table.status !== 'libre') {
    return res.status(400).json({ message: 'La mesa ya está ocupada.' });
  }

  table.status = 'ocupada';
  table.clientOrigin = 'pos';

  return res.json({
    message: `Mesa ${tableId} asignada por mesero.`,
    table
  });
});

/**
 * Obtener el estado y pedidos actuales de una mesa
 */
router.get('/:tableId/status', (req, res) => {
  const { tableId } = req.params;
  const table = tables.find(t => t.id === tableId);

  if (!table) {
    return res.status(404).json({ message: 'Mesa no encontrada.' });
  }

  return res.json({
    table
  });
});

/**
 * Agregar un pedido a una mesa (desde QR o POS)
 */
router.post('/:tableId/add-order', (req, res) => {
  const { tableId } = req.params;
  const { items, origin } = req.body; // origin: 'qr' o 'pos'
  const table = tables.find(t => t.id === tableId);

  if (!table) {
    return res.status(404).json({ message: 'Mesa no encontrada.' });
  }

  const timestamp = new Date().toISOString();

  const newOrder = {
    id: `order-${Date.now()}`,
    items,
    origin,
    timestamp,
    status: 'pendiente'
  };

  table.orders.push(newOrder);

  return res.json({
    message: `Pedido agregado a la mesa ${tableId}`,
    order: newOrder
  });
});

export default router;
