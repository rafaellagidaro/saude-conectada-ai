const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

// --- CONFIGURAÇÃO DA BASE DE DADOS (SEM .ENV) ---
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',           // Teu usuário do MySQL
    password: 'sua_senha',  // Tua senha do MySQL
    database: 'saude_conectada'
});

// Teste de Conexão no Terminal
db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Erro ao conectar ao MySQL:', err.message);
    } else {
        console.log('✅ Conectado ao MySQL com Sucesso!');
        connection.release();
    }
});

// --- ROTA 1: REGISTRO DE SAÚDE COM AUDITORIA ---
app.post('/api/log-saude', (req, res) => {
    const { user_id, tipo, sis, dia, mgdl } = req.body;
    
    // Gerar Assinatura Digital Única para o Registro
    const hashAuditoria = crypto.createHash('sha256')
        .update(user_id + Date.now().toString())
        .digest('hex');

    const sql = "INSERT INTO health_logs (user_id, tipo, v_sistolica, v_diastolica, v_mgdl, assinatura_hash) VALUES (?,?,?,?,?,?)";
    
    db.query(sql, [user_id, tipo, sis, dia, mgdl, hashAuditoria], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        
        res.json({ 
            message: "Dados registrados com sucesso!", 
            audit_id: hashAuditoria 
        });
    });
});

// --- ROTA 2: AGENDAMENTO COM LIMITE ÉTICO (MAX 10) ---
app.post('/api/agendar', (req, res) => {
    const { medico_id, paciente_id, data_consulta } = req.body;

    // Verificar quantas consultas o médico já tem no dia
    const checkSql = "SELECT COUNT(*) as total FROM appointments WHERE medico_id = ? AND data_consulta = ?";
    
    db.query(checkSql, [medico_id, data_consulta], (err, results) => {
        if (err) return res.status(500).json(err);

        if (results[0].total >= 10) {
            return res.status(403).json({ 
                error: "Limite atingido. Este médico já possui o máximo de 10 consultas para este dia." 
            });
        }

        // Se estiver abaixo de 10, permite o agendamento
        const insertSql = "INSERT INTO appointments (medico_id, paciente_id, data_consulta) VALUES (?,?,?)";
        db.query(insertSql, [medico_id, paciente_id, data_consulta], (err) => {
            if (err) return res.status(500).json(err);
            res.json({ success: "Consulta agendada com sucesso!" });
        });
    });
});

// --- ROTA 3: DASHBOARD DE HISTÓRICO ---
app.get('/api/historico/:userId', (req, res) => {
    const sql = "SELECT * FROM health_logs WHERE user_id = ? ORDER BY data_registro DESC LIMIT 20";
    db.query(sql, [req.params.userId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Inicialização do Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor Health Monitor rodando em http://localhost:${PORT}`);
});
