const viewport = document.getElementById('app-viewport');

const routes = {
    dash: () => {
        render('temp-dash');
        initChart();
    },
    registro: () => render('temp-registro'),
    biomov: () => render('temp-biomov'),
    audit: () => render('temp-audit')
};

function render(templateId) {
    const template = document.getElementById(templateId);
    viewport.innerHTML = '';
    viewport.appendChild(template.content.cloneNode(true));
}

function initChart() {
    const ctx = document.getElementById('aiChart')?.getContext('2d');
    if(!ctx) return;
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['10h', '12h', '14h', '16h'],
            datasets: [{ label: 'Previsão IA', data: [115, 118, 112, 119], borderColor: '#3b82f6', tension: 0.4 }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
    });
}

// Escuta cliques no menu
document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        const section = e.target.getAttribute('data-section');
        routes[section]();
    });
});

// Inicialização
routes.dash();
