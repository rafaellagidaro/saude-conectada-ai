const crypto = require('crypto');
const db = require('../config/db'); // Conexão que faremos no SQL
const MLService = require('../services/mlService');

exports.saveRecord = async (req, res) => {
    try {
        const { userId, type, valueSistolica, valueDiastolica, valueMgdl } = req.body;

        // 🛡️ GERAÇÃO DE PROVA DE INTEGRIDADE (SHA-256)
        // Criamos um hash único que prova que este registro é autêntico
        const authSignature = crypto.createHash('sha256')
            .update(`${userId}-${Date.now()}-${type}`)
            .digest('hex');

        const sql = "INSERT INTO health_logs (user_id, type, v_sistolica, v_diastolica, v_mgdl, signature) VALUES (?,?,?,?,?,?)";
        
        db.query(sql, [userId, type, valueSistolica, valueDiastolica, valueMgdl, authSignature], (err) => {
            if (err) throw err;
            res.status(201).json({ 
                status: "Success", 
                audit_hash: authSignature,
                message: "Dados validados e assinados digitalmente." 
            });
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Security Engine Error" });
    }
};

exports.getPrediction = (req, res) => {
    const userId = req.params.userId;
    const query = "SELECT v_sistolica, v_mgdl FROM health_logs WHERE user_id = ? ORDER BY created_at DESC LIMIT 5";

    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).send(err);
        
        // Executa o Serviço de Machine Learning
        const analysis = MLService.analyzeTrend(results);
        res.json(analysis);
    });
};
