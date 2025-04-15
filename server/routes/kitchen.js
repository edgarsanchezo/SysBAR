// routes/kitchen.js

import express from 'express';
import { tables } from '../models/tables.js';

const router = express.Router();

/**
 * Obtener todos los pedidos pendientes de todas las mesas
 * Para la vista de cocina y bar
 */
router.get('/pending-orders', (req, res) => {
  const pendingOrders = [];

  tables.forEach(table => {
    table.orders.forEach(order => {
      if (order.status === 'pendiente') {
        pendingOrders.push({
          tableId: table.id,
          orderId: order.id,
          items: order.items,
          origin: order.origin,
          timestamp: order.timestamp,
          status: order.status
        });
      }
    });
  });

  res.json({ pendingOrders });
});

/**
 * Marcar un pedido como preparado
 */
router.post('/:tableId/:orderId/prepare', (req, res) => {
  const { tableId, orderId } = req.params;

  const table = tables.find(t => t.id === tableId);
  if (!table) {
    return res.status(404).json({ message: 'Mesa no encontrada.' });
  }

  const order = table.orders.find(o => o.id === orderId);
  if (!order) {
    return res.status(404).json({ message: 'Pedido no encontrado.' });
  }

  if (order.status !== 'pendiente') {
    return res.status(400).json({ message: 'El pedido ya fue preparado o entregado.' });
  }

  order.status = 'preparado';

  res.json({
    message: `Pedido ${orderId} de la mesa ${tableId} marcado como preparado.`,
    order
  });
});

/**
 * Marcar un pedido como entregado
 * (el mesero confirma que lo llevó a la mesa)
 */
router.post('/:tableId/:orderId/deliver', (req, res) => {
  const { tableId, orderId } = req.params;

  const table = tables.find(t => t.id === tableId);
  if (!table) {
    return res.status(404).json({ message: 'Mesa no encontrada.' });
  }

  const order = table.orders.find(o => o.id === orderId);
  if (!order) {
    return res.status(404).json({ message: 'Pedido no encontrado.' });
  }

  if (order.status !== 'preparado') {
    return res.status(400).json({ message: 'El pedido debe estar preparado antes de entregarlo.' });
  }

  order.status = 'entregado';

  res.json({
    message: `Pedido ${orderId} de la mesa ${tableId} marcado como entregado.`,
    order
  });
});

export default router;
