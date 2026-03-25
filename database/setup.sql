-- database/setup.sql
CREATE DATABASE IF NOT EXISTS saude_pro_db;
USE saude_pro_db;

-- Tabela de Usuários com Chave de Segurança
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    status_conta ENUM('ativo', 'suspenso') DEFAULT 'ativo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Saúde com Assinatura Digital (Auditável)
CREATE TABLE health_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    type EN_TYPE('pressao', 'glicemia'),
    v_sistolica INT DEFAULT NULL,
    v_diastolica INT DEFAULT NULL,
    v_mgdl INT DEFAULT NULL,
    -- Coluna Crucial: Armazena o Hash SHA-256 gerado pelo Node.js
    signature VARCHAR(64) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabela de Log de Segurança (Auditoria de Acessos)
CREATE TABLE security_audit (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(255),
    ip_address VARCHAR(45),
    event_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
