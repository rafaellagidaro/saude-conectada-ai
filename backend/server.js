const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // Segurança de cabeçalhos
require('dotenv').config();

const healthRoutes = require('./routes/healthRoutes');

const app = express();

// Middlewares de Segurança Avançada
app.use(helmet()); 
app.use(cors());
app.use(express.json());

// Rota Base
app.use('/api/v1/health', healthRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Advanced Health Engine running on port ${PORT}`);
});
