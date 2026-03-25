CREATE DATABASE IF NOT EXISTS saude_pro_db;
USE saude_pro_db;

-- Tabela de Utilizadores com Metadados de Saúde
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Registos Vitais (Onde o C++ e o Node actuam)
CREATE TABLE health_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    tipo_registro ENUM('pressao', 'glicemia', 'bpm') NOT NULL,
    valor_sistolica INT,
    valor_diastolica INT,
    valor_glicemia INT,
    -- Campo para a Assinatura Digital (Integridade)
    signature_hash VARCHAR(64) NOT NULL, 
    -- Campo para a Predição de IA
    ai_risk_score DECIMAL(5,2),
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
