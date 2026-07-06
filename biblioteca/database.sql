CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL
);

CREATE TABLE perfis (
    id SERIAL PRIMARY KEY,
    telefone VARCHAR(20),
    endereco TEXT,

    usuario_id INT UNIQUE NOT NULL,

    FOREIGN KEY(usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);

CREATE TABLE livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    autor VARCHAR(150) NOT NULL,
    quantidade INT NOT NULL
);

CREATE TABLE emprestimos (
    id SERIAL PRIMARY KEY,

    usuario_id INT NOT NULL,

    data_emprestimo TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(usuario_id)
        REFERENCES usuarios(id)
);

CREATE TABLE emprestimo_livros (
    emprestimo_id INT,
    livro_id INT,

    PRIMARY KEY (
      emprestimo_id,
      livro_id
    ),

    FOREIGN KEY(emprestimo_id)
      REFERENCES emprestimos(id),

    FOREIGN KEY(livro_id)
      REFERENCES livros(id)
);