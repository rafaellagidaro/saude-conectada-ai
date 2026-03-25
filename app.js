// Local: app.js (Raiz)

// CONFIGURAÇÃO DO ESTADO CENTRAL (State Management)
const AppState = {
    currentSection: 'dash',
    isOnlineMode: false // Altere para true quando tiver o backend no ar
};

const viewport = document.getElementById('app-viewport');

// --- ROTEAMENTO SPA (Clean Architecture) ---
const routes = {
    dash: () => {
        render('temp-dash');
        initDashMode();
    },
    registro: () => {
        render('temp-registro');
        initRegistroMode();
    },
    chat: () => {
        render('temp-chat');
        initChatMode();
    },
    biomov: () => render('temp-biomov'),
    audit: () => {
        render('temp-audit');
        initAuditMode();
    }
};

function render(templateId) {
    const template = document.getElementById(templateId);
    viewport.innerHTML = '';
    viewport.appendChild(template.content.cloneNode(true));
}

// --- EVENT DELEGATOR PARA O MENU (Profissional) ---
document.querySelector('.sidebar').addEventListener('click', (e) => {
    const btn = e.target.closest('.nav-item');
    if (!btn) return;

    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const section = btn.getAttribute('data-section');
    AppState.currentSection = section;
    routes[section]();
});

// --- MOCK DATA ENGINE (Para não parecer amador online) ---

// 📊 Inicializar Dashboard com Gráfico
function initDashMode() {
    const ctx = document.getElementById('aiChart')?.getContext('2d');
    if (!ctx) return;
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['10h', '11h', '12h', '13h', '14h', '15h', 'Agora'],
            datasets: [{
                label: 'Tendência Preditiva (ML)',
                data: [110, 115, 112, 118, 120, 117, 118],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
    });
}

// 🔐 Inicializar Tabela de Auditoria com Logs Falsos
function initAuditMode() {
    const auditBody = document.getElementById('audit-body');
    if (!auditBody) return;
    const mockLogs = [
        { data: '25/03/2026', evento: 'Input Glicémia', hash: '8f92b...c3e1', origem: 'C++ Validated' },
        { data: '25/03/2026', evento: 'Previsão Risco IA', hash: 'a1b2c...f9d0', origem: 'Node.js ML' }
    ];
    auditBody.innerHTML = mockLogs.map(log => `
        <tr><td>${log.data}</td><td>${log.evento}</td><td><small>${log.hash}</small></td><td>${log.origem}</td></tr>
    `).join('');
}

// 🧠 Inicializar Lógica de Chat IA (A NOVA LÓGICA)
function initChatMode() {
    const chatInput = document.getElementById('chat-input');
    const chatWindow = document.getElementById('chat-window');
    const btnSend = document.getElementById('btn-chat-send');

    if(!chatWindow) return;

    function handleSend() {
        const text = chatInput.value;
        if (!text) return;

        // 1. User Message
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-message user';
        userMsg.innerHTML = `<p>${text}</p>`;
        chatWindow.appendChild(userMsg);
        chatInput.value = '';

        // 2. Simular Resposta GenAI (Com delay para realismo)
        setTimeout(() => {
            const aiMsg = document.createElement('div');
            aiMsg.className = 'chat-message ai';
            let responseText = "Entendi. Com base no seu risco preditivo atual de 3.2% (baixo), ";

            if (text.toLowerCase().includes('relaxar')) {
                responseText += "gerando script de relaxamento customizado... <br><br>Feche os olhos. Inspire por 4s, segure por 7s, solte por 8s. Sinta o seu corpo pesar...";
            } else {
                responseText += "recomendo manter a sua rotina. Os seus dados mostram estabilidade clínica.";
            }

            aiMsg.innerHTML = `<p>${responseText}</p>`;
            chatWindow.appendChild(aiMsg);
            chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll
        }, 1500);
    }

    btnSend.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSend(); });
}

// 📝 Inicializar Lógica de Registro (Apenas Alerta)
function initRegistroMode() {
    document.getElementById('btn-save-record')?.addEventListener('click', () => {
        alert("🚨 MOCK MODE: Dado validado pelo C++ e assinado com SHA-256 localmente. (Em modo online, isso seria salvo no MySQL).");
    });
}

// --- SOS LOGIC (Global) ---
document.getElementById('btn-sos-trigger').addEventListener('click', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(pos => {
            alert(`🚨 SOS DISPARADO!\nLocalização: Lat ${pos.coords.latitude}, Lng ${pos.coords.longitude}\nNotificando rede de apoio...`);
        });
    }
});

// INICIALIZAÇÃO PREDETERMINADA
console.log("HealthPro v2.0: Mock Mode Active (For Portfolio Display)");
routes.dash();
