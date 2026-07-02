# 📚 Biblioteca API

Projeto de API RESTful desenvolvido com Node.js, Fastify e PostgreSQL, utilizando arquitetura em camadas (Controller, Service e Repository) e padrões de boas práticas como Injeção de Dependência e Vertical Slice.

---

# 🚀 Tecnologias utilizadas

- Node.js
- Fastify
- PostgreSQL
- pg (node-postgres)
- dotenv
- Swagger (@fastify/swagger)
- Swagger UI (@fastify/swagger-ui)

---

# 📦 Funcionalidades do sistema

✔ Cadastro de usuários  
✔ Cadastro de livros  
✔ Cadastro de perfis (relacionamento 1:1 com usuários)  
✔ Empréstimos de livros (relacionamento N:N)  
✔ Controle de estoque de livros (quantidade)  
✔ Validações de regras de negócio  
✔ Tratamento centralizado de erros  
✔ Documentação da API com Swagger  

---

# 🧱 Estrutura do projeto
src/
├── config/
├── errors/
├── features/
│ ├── usuarios/
│ ├── livros/
│ ├── perfis/
│ └── emprestimos/
├── server.js


---

# ⚙️ Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado:

- Node.js (versão 18 ou superior)
- npm ou yarn
- PostgreSQL instalado e configurado

---

# 📥 Instalação do projeto

## 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/seu-projeto.git

2. Acessar a pasta
cd biblioteca

3. Instalar dependências
npm install

📦 Dependências utilizadas

Se precisar instalar manualmente:

npm install fastify
npm install pg
npm install dotenv
npm install @fastify/swagger
npm install @fastify/swagger-ui
npm install nodemon --save-dev
🗄️ Configuração do banco de dados

Crie um arquivo .env na raiz do projeto:

DB_HOST=localhost
DB_PORT=5432
DB_NAME=biblioteca
DB_USER=postgres
DB_PASSWORD=sua_senha

▶️ Executando o projeto
Modo desenvolvimento
npm run dev
🌐 Acessos da aplicação

API principal:

http://localhost:3333

Swagger (documentação):

http://localhost:3333/docs
📌 Rotas principais
Usuários
GET /usuarios
GET /usuarios/:id
POST /usuarios
PATCH /usuarios/:id
DELETE /usuarios/:id
Livros
GET /livros
GET /livros/:id
POST /livros
PATCH /livros/:id
DELETE /livros/:id
Perfis
GET /perfis
POST /perfis
PATCH /perfis/:id
DELETE /perfis/:id
Empréstimos
GET /emprestimos
GET /emprestimos/:id
POST /emprestimos

⚠️ Regras de negócio implementadas
Não permite cadastro de e-mail duplicado
Um usuário não pode ter mais de um perfil
Um livro não pode ser emprestado se estiver sem estoque
Validação de existência de usuário e livro antes do empréstimo
📊 Arquitetura utilizada

O projeto segue:

Vertical Slice Architecture
Separação em camadas:
Controller → HTTP (req/res)
Service → regras de negócio
Repository → acesso ao banco
Injeção de dependência entre camadas
📄 Observações

Este projeto foi desenvolvido com foco em boas práticas de desenvolvimento backend e modelagem de banco de dados relacional.

🚀 Autor

Projeto acadêmico — Sistema de Biblioteca API