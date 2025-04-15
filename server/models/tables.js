// models/tables.js

/**
 * Simulación de mesas del restaurante.
 * Estas mesas son almacenadas en memoria usando un array de objetos.
 * Cada mesa tiene un id, número, estado y lista de pedidos asociados.
 * 
 * Estados posibles: "libre", "ocupada", "esperando cuenta", "pagada"
 */

export const tables = [
    {
      id: 'mesa-1',
      number: 1,
      status: 'libre',
      assignedTo: null, // ID del cliente si está registrado
      orders: [],
    },
    {
      id: 'mesa-2',
      number: 2,
      status: 'libre',
      assignedTo: null,
      orders: [],
    },
    {
      id: 'mesa-3',
      number: 3,
      status: 'libre',
      assignedTo: null,
      orders: [],
    },
    {
      id: 'mesa-4',
      number: 4,
      status: 'libre',
      assignedTo: null,
      orders: [],
    },
    {
      id: 'mesa-5',
      number: 5,
      status: 'libre',
      assignedTo: null,
      orders: [],
    },
    {
      id: 'mesa-10',
      number: 10,
      status: 'libre',
      assignedTo: null,
      orders: [],
    }
  ];
  