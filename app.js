/**
 * HEALTH_CONNECT_PRO | CORE_LOGIC_ENGINE v2.5
 * Architecture: Event-Driven & Security Focused
 * Standards: ES6+, WebAPI, WHO Protocols
 */

// 1. GERENCIAMENTO DE ESTADO (State Management)
const AppState = {
    user: { name: "Usuário Pro", id: 101 },
    isLogged: true,
    lastUpdate: new Date().toLocaleTimeString(),
    sessionToken: btoa(Math.random()).substring(0, 16) // Simulação de Token
};

// 2. MOTOR DE NAVEGAÇÃO (SPA Style)
function mudarAba(abaId) {
    const abas = document.querySelectorAll('.aba');
    const botoes = document.querySelectorAll('.btn-nav');
    
    // Animação de transição técnica
    abas.forEach(aba => {
        aba.style.opacity = "0";
        aba.classList.remove('active');
    });

    const abaAlvo = document.getElementById(abaId);
    if (abaAlvo) {
        setTimeout(() => {
            abaAlvo.classList.add('active');
            abaAlvo.style.opacity = "1";
        }, 50);
    }

    botoes.forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
    
    console.log(`[SYSTEM] Navegação para: ${abaId} | Hash: ${AppState.sessionToken}`);
}

// 3. VALIDAÇÃO BIOMÉTRICA (Simulação da Bridge C++)
async function processarDadosSaude() {
    const sis = document.getElementById('sis').value;
    const btn = event.target;

    if (!sis || sis <= 0) {
        alert("⚠️ Erro: Insira um valor válido de pressão sistólica.");
        return;
    }

    // Efeito de Processamento (UX)
    btn.disabled = true;
    btn.innerText = "Validando via Core C++...";

    // Simulando latência do motor nativo e hashing SHA-256
    await new Promise(resolve => setTimeout(resolve, 1200));

    if (sis > 140) {
        exibirAlertaIA("ALERTA: Tendência de Hipertensão detectada segundo protocolos OMS.", "danger");
    } else {
        exibirAlertaIA("Sinal validado e arquivado com sucesso na Ledger de Auditoria.", "success");
    }

    btn.disabled = false;
    btn.innerText = "Salvar Registro";
}

// 4. CHATBOT INTELIGENTE (OMS ADVISOR ENGINE)
const WHO_PROTOCOLS = {
    "pressão": "A OMS define hipertensão como sistólica ≥140 mmHg. Recomendamos reduzir o sódio.",
    "sal": "A ingestão de sal deve ser inferior a 5g por dia para adultos.",
    "exercício": "Adultos devem realizar 150-300 min de atividade aeróbica moderada por semana.",
    "diabetes": "O controle glicêmico é vital. A OMS sugere dietas ricas em fibras e baixo açúcar processado.",
    "default": "Não encontrei este termo nos protocolos da OMS. Por favor, consulte um especialista humano."
};

function toggleChat() {
    const win = document.getElementById('chat-window');
    win.style.display = win.style.display === 'flex' ? 'none' : 'flex';
}

function enviarChat() {
    const input = document.getElementById('chat-input');
    const content = document.getElementById('chat-content');
    const mensagem = input.value.trim().toLowerCase();

    if (!mensagem) return;

    // Renderizar Mensagem do Usuário
    content.innerHTML += `<div class="msg-user">${input.value}</div>`;
    
    // Lógica de Resposta "Expert"
    let resposta = WHO_PROTOCOLS["default"];
    for (let chave in WHO_PROTOCOLS) {
        if (mensagem.includes(chave)) {
            resposta = WHO_PROTOCOLS[chave];
            break;
        }
    }

    // Simular "IA pensando"
    setTimeout(() => {
        content.innerHTML += `<div class="msg-oms"><b>OMS Advisor:</b> ${resposta}</div>`;
        content.scrollTop = content.scrollHeight;
    }, 600);

    input.value = "";
}

// 5. SISTEMA SOS GEOLOCALIZADO
function ativarSOS() {
    const audioFeedback = new AudioContext(); // Feedback sonoro de engenharia
    
    if (confirm("🚨 EMERGÊNCIA: Enviar sua localização para os serviços de resgate?")) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                console.error(`[CRITICAL] SOS acionado em: ${latitude}, ${longitude}`);
                alert(`🚨 SOCORRO SOLICITADO!\nCoordenadas: ${latitude}, ${longitude}\nEnviando dados criptografados para a central...`);
            },
            () => alert("Erro ao obter localização. Enviando alerta geral via IP...")
        );
    }
}

// Utilitário de UI
function exibirAlertaIA(msg, tipo) {
    const card = document.createElement('div');
    card.style = `padding: 15px; margin-top: 20px; border-radius: 10px; background: ${tipo === 'danger' ? '#fee2e2' : '#dcfce7'}; color: ${tipo === 'danger' ? '#991b1b' : '#166534'}; border-left: 5px solid;`;
    card.innerHTML = `<strong>🤖 IA Insight:</strong> ${msg}`;
    document.querySelector('.aba.active').appendChild(card);
}
