const express = require('express');
const router = express.Router();
const HealthController = require('../controllers/healthController');

// Rota de registro com Auditoria SHA-256 e Validação C++
router.post('/record', HealthController.saveRecord);

// Rota de Predição IA de Risco
router.get('/predict/:userId', HealthController.getPrediction);

module.exports = router;
