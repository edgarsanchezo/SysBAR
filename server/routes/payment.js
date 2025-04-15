// routes/payment.js

import express from 'express';
import { tables } from '../models/tables.js';
import { menu } from '../models/menu.js';

const router = express.Router();

/**
 * Obtener el estado de cuenta de una mesa
 * Calcula el total en base a los pedidos entregados
 */
router.get('/:tableId/bill', (req, res) => {
  const { tableId } = req.params;
  const table = tables.find(t => t.id === tableId);

  if (!table) {
    return res.status(404).json({ message: 'Mesa no encontrada.' });
  }

  const deliveredOrders = table.orders.filter(order => order.status === 'entregado');
  const items = deliveredOrders.flatMap(order => order.items);

  const billDetails = items.map(item => {
    const menuItem = menu.find(m => m.id === item.id);
    return {
      id: item.id,
      name: menuItem?.name || 'Producto desconocido',
      price: menuItem?.price || 0,
      quantity: item.quantity,
      total: (menuItem?.price || 0) * item.quantity
    };
  });

  const totalAmount = billDetails.reduce((sum, item) => sum + item.total, 0);

  res.json({
    tableId: table.id,
    bill: billDetails,
    total: totalAmount,
    requested: table.requestedBill
  });
});

/**
 * Solicitar la cuenta
 * Marca que el cliente quiere pagar
 */
router.post('/:tableId/request-bill', (req, res) => {
  const { tableId } = req.params;
  const table = tables.find(t => t.id === tableId);

  if (!table) {
    return res.status(404).json({ message: 'Mesa no encontrada.' });
  }

  table.requestedBill = true;

  res.json({
    message: `La cuenta ha sido solicitada para la mesa ${tableId}.`,
    tableId: table.id,
    requested: true
  });
});

/**
 * Registrar el pago y liberar la mesa
 */
router.post('/:tableId/pay', (req, res) => {
  const { tableId } = req.params;
  const { paymentMethod } = req.body;

  const table = tables.find(t => t.id === tableId);
  if (!table) {
    return res.status(404).json({ message: 'Mesa no encontrada.' });
  }

  // Aquí podríamos actualizar historial CRM e inventario ERP

  // Resetear la mesa
  table.available = true;
  table.orders = [];
  table.requestedBill = false;

  res.json({
    message: `Pago registrado con ${paymentMethod}. Mesa ${tableId} liberada.`,
    tableId: table.id,
    available: true
  });
});

export default router;
