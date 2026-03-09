const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Conexão com o Banco de Dados
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jitterbit_db')
    .then(() => console.log('MongoDB Conectado'))
    .catch(err => console.error('Erro de conexão:', err));

// Uso das Rotas
const orderRoutes = require('./routes/orderRoutes');
app.use('/order', orderRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));