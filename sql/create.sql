CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    cargo VARCHAR(50),
    telefone VARCHAR(20)
);

CREATE TABLE ocorrencia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno VARCHAR(100) NOT NULL,
    turma VARCHAR(20),
    professor VARCHAR(100),
    tipo VARCHAR(50),
    gravidade VARCHAR(20),
    status VARCHAR(30),
    descricao TEXT,
    observacoes TEXT
);