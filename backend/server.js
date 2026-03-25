const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

// --- CONFIGURAÇÃO DA BASE DE DADOS (DADOS DIRETOS) ---
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'sua_senha_aqui', // ALTERA PARA A TUA SENHA
    database: 'saude_conectada'
}).promise(); // Usamos .promise() para código mais limpo (Async/Await)

// --- ROTA DE TELEMETRIA E IA (REGISTRO + AUDITORIA) ---
app.post('/api/log-saude', async (req, res) => {
    try {
        const { user_id, sis, dia, mgdl } = req.body;

        // 1. Gerar Hash de Auditoria (SHA-256)
        const hashStr = `${user_id}-${sis}-${dia}-${mgdl}-${Date.now()}`;
        const hashAuditoria = crypto.createHash('sha256').update(hashStr).digest('hex');

        // 2. Lógica de "Motor de IA" no Servidor
        let alerta = "NORMAL";
        if (sis > 140 || mgdl > 126) alerta = "RISCO_ELEVADO";

        // 3. Gravar na Base de Dados
        const sql = "INSERT INTO health_logs (user_id, v_sistolica, v_diastolica, v_mgdl, assinatura_hash, status_ia) VALUES (?,?,?,?,?,?)";
        await db.query(sql, [user_id || 1, sis, dia, mgdl, hashAuditoria, alerta]);

        res.json({ 
            success: true, 
            hash: hashAuditoria, 
            status_ia: alerta,
            message: "Heurística processada e auditada."
        });

    } catch (err) {
        res.status(500).json({ error: "Falha no Kernel de Dados", details: err.message });
    }
});

// --- ROTA DE AGENDAMENTO ÉTICO (REGRA DOS 10) ---
app.post('/api/agendar', async (req, res) => {
    try {
        const { medico_id, data_consulta } = req.body;

        // 1. Verificar o limite de 10 (A Regra de Ouro)
        const [rows] = await db.query(
            "SELECT COUNT(*) as total FROM appointments WHERE medico_id = ? AND data_consulta = ?",
            [medico_id, data_consulta]
        );

        if (rows[0].total >= 10) {
            return res.status(403).json({ error: "LIMITE_ATINGIDO", message: "Este especialista já atingiu o teto ético de 10 consultas diárias." });
        }

        // 2. Se houver vaga, agenda
        await db.query("INSERT INTO appointments (medico_id, data_consulta) VALUES (?,?)", [medico_id, data_consulta]);
        
        res.json({ success: true, message: "Agendamento confirmado no sistema." });

    } catch (err) {
        res.status(500).json({ error: "Erro de Agendamento", details: err.message });
    }
});

// --- ROTA DE HISTÓRICO ---
app.get('/api/historico', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM health_logs ORDER BY data_registro DESC LIMIT 20");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Erro ao ler histórico" });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 CORE_SYSTEM_ONLINE em http://localhost:${PORT}`));
