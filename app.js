// Configuração do Gráfico de IA (Chart.js)
const ctx = document.getElementById('aiChart').getContext('2d');
const aiChart = new Chart(ctx, {
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
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            y: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' } },
            x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
        }
    }
});

// Lógica de SOS
document.getElementById('btn-sos-trigger').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            alert(`🚨 ALERTA SOS ENVIADO!\nLocalização: Lat ${pos.coords.latitude}, Lng ${pos.coords.longitude}\nServiços de emergência notificados via API.`);
        });
    }
});

// Simulação de IA (Input do Usuário)
console.log("HealthPro Engine: Versão 2.0 Ativa");
