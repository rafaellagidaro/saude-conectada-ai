// Local: backend/services/mlRiskEngine.js
const { SimpleLinearRegression } = require('ml-regression');

class MLRiskEngine {
    /**
     * Analisa o histórico e prevê o próximo valor e nível de risco
     * @param {Array} logs - Dados vindos do MySQL
     */
    static analyze(logs) {
        if (logs.length < 5) return { risk: "Inconclusive", detail: "Need at least 5 data points." };

        // Prepara os dados para Regressão Linear Simples
        // x = tempo (índice), y = valor (glicémia ou pressão sistólica)
        const x = logs.map((_, index) => index).reverse(); // Inverte para que o mais recente seja o último
        const y = logs.map(log => log.v_mgdl || log.v_sistolica);

        // Treina o modelo (rápido, no próprio servidor)
        const regression = new SimpleLinearRegression(x, y);

        // Prevê o valor para o próximo ponto no tempo
        const nextTimePoint = x.length;
        const predictedValue = regression.predict(nextTimePoint);

        // Calcula a Variância (R-quadrado) para ver a confiabilidade do modelo
        const r2 = regression.r2;

        let riskLevel = "Stable";
        let recommendation = "Maintain current routine.";

        // Lógica de Risco Preditivo (ML-based)
        if (predictedValue > (y[0] * 1.2)) { // Se a previsão for > 20% do último valor
            riskLevel = "HIGH RISK";
            recommendation = "🚨 PREDICTIVE ALARM: Potential spike detected for next reading. Early intervention advised.";
        } else if (r2 < 0.5) { // Se o modelo não for confiável (dados muito erráticos)
            riskLevel = "UNSTABLE DATA";
            recommendation = "Data is erratic. Increase measurement frequency.";
        }

        return {
            predicted_value: predictedValue.toFixed(1),
            model_confidence_r2: r2.toFixed(2),
            risk_assessment: riskLevel,
            action_plan: recommendation
        };
    }
}

module.exports = MLRiskEngine;
