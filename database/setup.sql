--  HEALTH_CONNECT_PRO: DATABASE ARCHITECTURE V1.0
--  Author: [Bruna Rafaela]
--  Focus: Scalability, Audit Trail, and Data Integrity

CREATE DATABASE IF NOT EXISTS saude_conectada;
USE saude_conectada;

-- 1. TABELA DE UTILIZADORES (Criptografia de Senha recomendada no Backend)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL, -- Nunca guardar texto puro
    tipo_sanguineo ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. TABELA DE REGISTROS BIOMÉTRICOS (Onde o C++ valida os dados)
CREATE TABLE health_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    sistolica INT CHECK (sistolica > 0 AND sistolica < 300),
    glicemia INT CHECK (glicemia > 0 AND glicemia < 1000),
    status_validacao VARCHAR(50), -- Ex: 'VALIDADO_PELO_CORE_CPP'
    audit_hash CHAR(64) NOT NULL,  -- SHA-256 para garantir imutabilidade
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 3. TABELA DE AGENDAMENTOS (Com regra de limite de consultas)
CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    data_consulta DATETIME NOT NULL,
    medico_especialidade VARCHAR(100),
    observacoes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB;

-- ÍNDICES PARA ALTA PERFORMANCE EM BUSCAS
CREATE INDEX idx_user_logs ON health_logs(user_id, data_registro);
CREATE INDEX idx_user_email ON users(email);
