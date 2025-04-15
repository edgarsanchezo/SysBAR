// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Importar rutas
import tableRoutes from './routes/tables.js';
import orderRoutes from './routes/orders.js';
import kitchenRoutes from './routes/kitchen.js';

// Usar rutas
app.use('/api/tables', tableRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/kitchen', kitchenRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.send('🍽️ API del POS del restaurante funcionando...');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor POS corriendo en http://localhost:${PORT}`);
});
