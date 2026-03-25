const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',      // O teu servidor MySQL
    user: 'root',           // O teu utilizador
    password: 'sua_senha',  // A tua senha do MySQL
    database: 'saude_conectada' // O nome da tua base de dados
});

// Testar a conexão
db.getConnection((err) => {
    if (err) throw err;
    console.log("✅ Conectado à Base de Dados com sucesso!");
});
