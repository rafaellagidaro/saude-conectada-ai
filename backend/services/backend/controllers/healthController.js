const MLRiskEngine = require('../services/mlRiskEngine'); // Novo Motor

exports.getPrediction = (req, res) => {
    const userId = req.params.userId;
    // Captura os últimos 10 registros para um modelo melhor
    const query = "SELECT v_sistolica, v_mgdl, created_at FROM health_logs WHERE user_id = ? ORDER BY created_at DESC LIMIT 10";

    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).send(err);
        
        // Executa o Serviço de Machine Learning REAL
        const analysis = MLRiskEngine.analyze(results);
        res.json(analysis);
    });
};
