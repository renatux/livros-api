const express = require('express');
const conectarBD = require('./config/db');
const rotasLivros = require('./routes/livroRoutes');

const app = express();

// Conectar ao Banco de Dados MongoDB
conectarBD();

// Middleware para permitir que o Express interprete JSON no corpo (body) das requisições
app.use(express.json());

// Definição do prefixo base para as rotas de livros
app.use('/api/livros', rotasLivros);

// Rota padrão para caminhos não encontrados (404)
app.use((req, res) => {
    res.status(404).json({ mensagem: 'Rota não encontrada.' });
});

// Inicialização do servidor na porta 3000
const PORT = 50000;
app.listen(PORT, () => {
    console.log(`Servidor rodando ativamente na porta ${PORT}`);
});