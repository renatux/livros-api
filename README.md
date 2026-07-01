# 📚 Livros API

API REST para catálogo de livros com **Node.js**, **Express**, **MongoDB** e testes **Cypress**.

[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org)
[![Express](https://img.shields.io/badge/express-5-blue)](https://expressjs.com)
[![Mongoose](https://img.shields.io/badge/mongoose-9-green)](https://mongoosejs.com)
[![Cypress](https://img.shields.io/badge/cypress-15-purple)](https://cypress.io)
[![License](https://img.shields.io/badge/license-ISC-lightgrey)](LICENSE)

---

## 📑 Sumário

- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Setup](#-setup)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Endpoints da API](#-endpoints-da-api)
  - [POST /api/livros — Cadastrar livro](#1-post-apilivros--cadastrar-livro)
  - [GET /api/livros — Listar todos](#2-get-apilivros--listar-todos)
  - [GET /api/livros/:id — Buscar por ID](#3-get-apilivrosid--buscar-por-id)
  - [DELETE /api/livros/:id — Remover livro](#4-delete-apilivrosid--remover-livro)
- [Modelo de Dados](#-modelo-de-dados)
- [Códigos de Erro](#-códigos-de-erro)
- [Testes](#-testes)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Desenvolvimento](#-desenvolvimento)
- [Licença](#-licença)

---

## ✅ Funcionalidades

- Cadastro de livros com validação de campos obrigatórios
- Prevenção de duplicidade (mesmo título **e** mesmo autor, case insensitive)
- Listagem completa do acervo
- Consulta individual por ID
- Remoção de livros
- Testes E2E com cobertura dos fluxos principal e de erro

---

## 🛠 Tecnologias

| Tecnologia | Versão | Função |
|---|---|---|
| [Express](https://expressjs.com) | 5.x | Framework HTTP |
| [Mongoose](https://mongoosejs.com) | 9.x | ODM para MongoDB |
| [MongoDB Atlas](https://mongodb.com/atlas) | — | Banco de dados NoSQL na nuvem |
| [Cypress](https://cypress.io) | 15.x | Testes E2E |
| [cypress-mongodb](https://github.com/ivsgroup/cypress-mongodb) | 7.x | Manipulação do banco nos testes |
| [cypress-plugin-api](https://github.com/filiphric/cypress-plugin-api) | 2.x | Comando `cy.api()` |
| [dotenv](https://github.com/motdotla/dotenv) | 16.x | Gerenciamento de variáveis de ambiente |

---

## 📋 Pré-requisitos

- **Node.js** 18 ou superior
- **npm** (ou yarn/pnpm)
- Conta no **MongoDB Atlas** (ou instância MongoDB local)

---

## 🔧 Setup

```bash
# 1. Clonar o repositório
git clone https://github.com/renatux/livros-api.git
cd livros-api

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env
# Edite .env com sua senha do MongoDB Atlas

# 4. Iniciar servidor
npm run dev
```

O servidor sobe em **`http://localhost:50000`**.

---

## 📁 Estrutura do Projeto

```
livros-api/
├── .env                    # Variáveis de ambiente (NÃO comitar)
├── .env.example            # Modelo seguro para versionamento
├── .gitignore
├── package.json
├── server.js               # Ponto de entrada do servidor
├── README.md
├── config/
│   └── db.js               # Conexão com MongoDB
├── models/
│   └── Livro.js            # Schema Mongoose
├── routes/
│   └── livroRoutes.js      # Rotas e lógica dos endpoints
└── cypress/
    ├── cypress.config.js    # Configuração do Cypress
    ├── e2e/
    │   └── livro.cy.js      # Testes E2E
    └── support/
        ├── e2e.js           # Importação de plugins
        └── commands.js      # Comandos customizados
```

---

## 📡 Endpoints da API

### 1. POST `/api/livros` — Cadastrar livro

Cadastra um novo livro no acervo. Retorna **201** em caso de sucesso.

**Request:**
```json
{
  "titulo": "O Senhor dos Anéis: A Sociedade do Anel",
  "autor": "J.R.R. Tolkien",
  "editora": "HarperCollins",
  "anoPublicacao": 1954,
  "numeroPaginas": 424
}
```

**Response (201):**
```json
{
  "_id": "665a1b2c3d4e5f6a7b8c9d0e",
  "titulo": "O Senhor dos Anéis: A Sociedade do Anel",
  "autor": "J.R.R. Tolkien",
  "editora": "HarperCollins",
  "anoPublicacao": 1954,
  "numeroPaginas": 424,
  "createdAt": "2025-06-22T14:15:00.000Z",
  "updatedAt": "2025-06-22T14:15:00.000Z"
}
```

**Erro** — livro duplicado (409):
```json
{
  "mensagem": "Erro de cadastro",
  "erro": "Este livro (mesmo título e autor) já existe"
}
```

**Erro** — campo obrigatório ausente (400):
```json
{
  "mensagem": "Erro de validação",
  "erros": "Livro validation failed: titulo: O título é obrigatório."
}
```

---

### 2. GET `/api/livros` — Listar todos

Retorna a lista completa de livros cadastrados.

**Response (200):**
```json
[
  {
    "_id": "665a1b2c3d4e5f6a7b8c9d0e",
    "titulo": "O Senhor dos Anéis: A Sociedade do Anel",
    "autor": "J.R.R. Tolkien",
    "editora": "HarperCollins",
    "anoPublicacao": 1954,
    "numeroPaginas": 424,
    "createdAt": "2025-06-22T14:15:00.000Z",
    "updatedAt": "2025-06-22T14:15:00.000Z"
  }
]
```

---

### 3. GET `/api/livros/:id` — Buscar por ID

Retorna um livro específico pelo seu `_id` do MongoDB.

**Response (200):**
```json
{
  "_id": "665a1b2c3d4e5f6a7b8c9d0e",
  "titulo": "O Senhor dos Anéis",
  "autor": "J.R.R. Tolkien",
  "editora": "HarperCollins",
  "anoPublicacao": 1954,
  "numeroPaginas": 424,
  "createdAt": "2025-06-22T14:15:00.000Z",
  "updatedAt": "2025-06-22T14:15:00.000Z"
}
```

**Erro** — não encontrado (404):
```json
{
  "mensagem": "Livro não encontrado."
}
```

**Erro** — ID inválido (400):
```json
{
  "mensagem": "ID informado é inválido."
}
```

---

### 4. DELETE `/api/livros/:id` — Remover livro

Remove um livro pelo seu `_id`.

**Response (200):**
```json
{
  "mensagem": "Livro removido com sucesso!",
  "livro": {
    "_id": "665a1b2c3d4e5f6a7b8c9d0e",
    "titulo": "O Senhor dos Anéis",
    ...
  }
}
```

**Erro** — não encontrado (404):
```json
{
  "mensagem": "Livro não encontrado para remoção."
}
```

---

## 📦 Modelo de Dados

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `titulo` | String | ✅ | Título do livro |
| `autor` | String | ✅ | Nome do autor |
| `editora` | String | ✅ | Editora responsável |
| `anoPublicacao` | Number | ✅ | Ano de publicação |
| `numeroPaginas` | Number | ✅ | Quantidade de páginas |
| `createdAt` | Date | automático | Timestamp de criação |
| `updatedAt` | Date | automático | Timestamp de atualização |

---

## ⚠️ Códigos de Erro

| Código | Significado | Quando ocorre |
|---|---|---|
| `400` | Bad Request | Campo obrigatório ausente ou ID inválido |
| `404` | Not Found | Livro não encontrado |
| `409` | Conflict | Tentativa de cadastro duplicado |
| `500` | Internal Server Error | Erro inesperado no servidor |

---

## 🧪 Testes

### Estrutura

```
cypress/e2e/livro.cy.js
├── POST /livros
│   ├── ✅ Deve cadastrar um novo livro
│   └── ✅ Não deve cadastrar livro duplicado
```

### Como rodar

> ⚠️ O servidor precisa estar rodando antes dos testes.

```bash
# Terminal 1: servidor
npm run dev

# Terminal 2: testes
npx cypress open        # Interface gráfica
npm test                # Headless (CI)
```

### O que os testes cobrem

1. **Cadastro com sucesso** — envia um POST com dados válidos e verifica status `201` + todos os campos retornados
2. **Duplicidade rejeitada** — cadastra o mesmo livro duas vezes e verifica status `409` + mensagem de erro

### Plugins de teste

- **cypress-mongodb**: limpa a collection (`dropCollection`) antes dos testes, garantindo um estado conhecido
- **cypress-plugin-api**: `cy.api()` substitui `cy.request()` com melhor suporte a requisições REST

---

## 🔐 Variáveis de Ambiente

| Variável | Obrigatória | Descrição |
|---|---|---|
| `MONGODB_URI` | ✅ | Connection string completa do MongoDB Atlas |
| `PORT` | ❌ | Porta do servidor (padrão: `50000`) |

Crie um arquivo `.env` na raiz do projeto (use `.env.example` como modelo):

```ini
MONGODB_USERNAME=alucardsp_db_user
MONGODB_PASSWORD=sua_senha_aqui
MONGODB_URI=mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@szlab.crjhpiy.mongodb.net/?appName=szlab
PORT=50000
```

---

## 💻 Desenvolvimento

```bash
# Servidor com hot-reload (nodemon)
npm run dev

# Rodar apenas os testes
npm test
```

---

## 📄 Licença

Distribuído sob licença **ISC**.
