const mysql = require('mysql2');
require('dotenv').config();

// Configuração de conexão com suporte a SSL (Obrigatório na Nuvem)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: true // Segurança para conexões remotas
    }
});

module.exports = pool.promise();
