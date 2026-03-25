// Local: frontend/app.js (Dentro da classe AppEngine)

static bindEvents() {
    // ... (eventos anteriores)
    
    // Adiciona listener para a aba mental (Event Delegation)
    document.getElementById('view-port').addEventListener('click', (e) => {
        if (e.target.id === 'btn-generate-script') this.gerarScriptIA();
    });
}

static async gerarScriptIA() {
    const scriptDisplay = document.getElementById('ai-generative-script');
    const loader = document.getElementById('loading-ai');
    
    scriptDisplay.style.display = 'none';
    loader.style.display = 'block';

    // 1. Simula o "Prompt" que seria enviado para a API Generativa
    // Pega o risco do localStorage (que salvámos quando o ML no backend foi chamado)
    const riscoAtual = localStorage.getItem('saudePro_lastRisk') || "Stable";
    
    // 2. Simula o Processamento de LLM (com delay para realismo)
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    let generatedScript = "";
    if (riscoAtual === "HIGH RISK") {
        generatedScript = "Este script foi gerado focado em calmar o sistema nervoso... <br><br><strong>Início:</strong> Feche os olhos. Inspire pelo nariz por 4 segundos, segure por 7, solte pela boca por 8. Repita 5 vezes.<br><strong>Visualização:</strong> Imagine que está flutuando numa água calma e morna. A sua pressão está a descer a cada respiração.<br><strong>Afirmação:</strong> Eu estou calmo. Eu controlo o meu corpo.";
    } else {
        generatedScript = "Script de manutenção de bem-estar... <br><br><strong>Início:</strong> Sente-se direito. Inspire profundamente. <br><strong>Mindfulness:</strong> Foque na sensação do ar a entrar e a sair. Se a mente divagar, traga-a de volta.<br><strong>Gratidão:</strong> Pense em três coisas pelas quais é grato hoje.";
    }

    loader.style.display = 'none';
    scriptDisplay.innerHTML = generatedScript;
    scriptDisplay.style.display = 'block';
}
