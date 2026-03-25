// Local: backend/services/mlService.js

class HealthAI {
    static analisar(dados) {
        const { sis, dia, mgdl } = dados;
        let insights = [];
        let nivelRisco = "Baixo";

        // --- Lógica para Pressão Arterial ---
        if (sis >= 140 || dia >= 90) {
            insights.push("⚠️ Hipertensão Detectada: Reduza o sódio e descanse 15 min.");
            nivelRisco = "Alto";
        } else if (sis < 90) {
            insights.push("📉 Hipotensão: Beba água e evite levantar-se rapidamente.");
            nivelRisco = "Médio";
        } else {
            insights.push("✅ Pressão Arterial dentro da meta ideal.");
        }

        // --- Lógica para Glicémia ---
        if (mgdl > 126) {
            insights.push("🚨 Glicémia Elevada: Possível estado hiperglicémico. Evite hidratos de carbono.");
            nivelRisco = "Crítico";
        } else if (mgdl < 70) {
            insights.push("🍬 Hipoglicémia: Consuma 15g de açúcar rápido imediatamente.");
            nivelRisco = "Crítico";
        }

        // --- Análise de Tendência (Predição) ---
        // Aqui a IA simula se o próximo valor será perigoso
        const tendencia = (sis > 130 && mgdl > 110) ? 
            "Prognóstico: Risco de mal-estar nas próximas 4h aumentado em 40%." : 
            "Prognóstico: Estabilidade prevista para as próximas 12h.";

        return {
            status: nivelRisco,
            conselhos: insights,
            predicao: tendencia,
            timestamp: new Date().toISOString()
        };
    }
}

module.exports = HealthAI;
