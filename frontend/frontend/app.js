// Local: frontend/app.js

// CONFIGURAÇÃO DO ESTADO CENTRAL (State Management)
const AppState = {
    currentAba: 'aba-diario',
    isAltoContraste: true,
    isCameraActive: false
};

const API_BASE_URL = 'http://localhost:3000/api/v1/health';

// --- INICIALIZAÇÃO PROVISSORA DO PWA ---
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log('Service Worker Registered'))
        .catch(err => console.error('Service Worker Registration Failed', err));
}

// --- CORE ENGINE (Roteamento SPA Nátivo) ---
class AppEngine {
    static init() {
        this.renderView(AppState.currentAba);
        this.bindEvents();
    }

    static renderView(abaId) {
        const viewport = document.getElementById('view-port');
        const template = document.getElementById(`tpl-${abaId.split('-')[1]}`);
        
        if (!template) {
            viewport.innerHTML = "<h2>Erro: Template não encontrado.</h2>";
            return;
        }

        // Clona o template e renderiza (Clean Injection)
        viewport.innerHTML = ''; 
        viewport.appendChild(template.content.cloneNode(true));
    }

    static bindEvents() {
        // Event Delegator para Nav (Profissional: Um único listener para todos os botões)
        document.querySelector('.top-nav').addEventListener('click', (e) => {
            const aba = e.target.getAttribute('data-aba');
            if (aba) this.navigateTo(aba);
        });

        // SOS Trigger con Geolocalização
        document.getElementById('btn-sos-trigger').addEventListener('click', this.dispararSOS);

        // Alto Contraste
        document.getElementById('btn-contraste').addEventListener('click', () => {
            document.body.classList.toggle('alto-contraste');
        });
    }

    static navigateTo(abaId) {
        // Gerenciamento de Estado
        AppState.currentAba = abaId;
        
        // Atualiza UI
        document.querySelectorAll('.top-nav button').forEach(b => b.classList.remove('active'));
        document.querySelector(`button[data-aba="${abaId}"]`).classList.add('active');

        this.renderView(abaId);
    }

    static dispararSOS() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                alert(`🆘 SOS ATIVADO!\nLocalização: Lat ${latitude}, Lng ${longitude}\nNotificando rede de apoio...`);
            });
        }
    }
}

// --- DOM READY ---
document.addEventListener('DOMContentLoaded', () => {
    AppEngine.init();
});
