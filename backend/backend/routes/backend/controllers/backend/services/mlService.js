class MLService {
    static analyzeTrend(data) {
        if (data.length < 3) return { risk: "Inconclusive", detail: "Need more data points." };

        // Lógica de Gradiente: Medimos a velocidade da mudança
        const current = data[0].v_mgdl || data[0].v_sistolica;
        const previous = data[1].v_mgdl || data[1].v_sistolica;
        const acceleration = current - previous;

        let riskLevel = "Stable";
        let recommendation = "Maintain current routine.";

        if (acceleration > 15) {
            riskLevel = "HIGH RISK";
            recommendation = "🚨 Abnormal spike detected. Contact your physician immediately.";
        } else if (acceleration > 5) {
            riskLevel = "MODERATE";
            recommendation = "Trend is rising. Monitor every 4 hours.";
        }

        return {
            risk_assessment: riskLevel,
            trend_acceleration: acceleration,
            action_plan: recommendation
        };
    }
}
module.exports = MLService;
