-- Script de configuração do banco de dados PostgreSQL
-- Execute este script para criar o banco e a tabela

-- Criar banco de dados (execute como superusuário)
-- CREATE DATABASE crud_app;

-- Conectar ao banco de dados
-- \c crud_app;

-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir dados de exemplo
INSERT INTO usuarios (nome, email, telefone) VALUES
    ('João Silva', 'joao@email.com', '(11) 99999-1111'),
    ('Maria Santos', 'maria@email.com', '(11) 99999-2222'),
    ('Pedro Oliveira', 'pedro@email.com', '(11) 99999-3333'),
    ('Ana Costa', 'ana@email.com', '(11) 99999-4444'),
    ('Carlos Ferreira', 'carlos@email.com', '(11) 99999-5555')
ON CONFLICT (email) DO NOTHING;

-- Verificar dados inseridos
SELECT * FROM usuarios ORDER BY data_criacao DESC;

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);
CREATE INDEX IF NOT EXISTS idx_usuarios_nome ON usuarios(nome);
CREATE INDEX IF NOT EXISTS idx_usuarios_data_criacao ON usuarios(data_criacao);

-- Comentários sobre a estrutura
COMMENT ON TABLE usuarios IS 'Tabela para armazenar dados dos usuários do sistema CRUD';
COMMENT ON COLUMN usuarios.id IS 'Identificador único do usuário';
COMMENT ON COLUMN usuarios.nome IS 'Nome completo do usuário';
COMMENT ON COLUMN usuarios.email IS 'Email único do usuário';
COMMENT ON COLUMN usuarios.telefone IS 'Telefone do usuário (opcional)';
COMMENT ON COLUMN usuarios.data_criacao IS 'Data e hora de criação do registro'; 