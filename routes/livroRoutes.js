const express = require('express');
const router = express.Router();
const Livro = require('../models/Livro');

// 1. CADASTRO DE LIVROS (POST)
router.post('/', async (req, res) => {
    try {
        const { titulo, autor, editora, anoPublicacao, numeroPaginas } = req.body;

        // validando duplicidade
        // Busca no banco se já existe um livro com o mesmo título e mesmo autor
        // Usando regex para deixar case insensitive
        const livroExistente = await Livro.findOne({
            titulo: { $regex: `^${titulo}$`, $options: 'i' },
            autor: { $regex: `^${autor}$`, $options: 'i' }
        });

        // Se encontrar, retorna o erro 409 (Conflict)
        if (livroExistente) {
            return res.status(409).json({ 
                mensagem: 'Erro de cadastro', 
                erro: 'Este livro (mesmo título e autor) já existe' 
             });    
        }

        // Cria uma nova instância do modelo com os dados recebidos
        const novoLivro = new Livro({ titulo, autor, editora, anoPublicacao, numeroPaginas });
        
        // Salva no banco de dados
        const livroSalvo = await novoLivro.save();
        res.status(201).json(livroSalvo);
    } catch (error) {
        // Captura erros de validação do Mongoose (campos ausentes)
        if (error.name === 'ValidationError') {
            return res.status(400).json({ mensagem: 'Erro de validação', erros: error.message });
        }
        res.status(500).json({ mensagem: 'Erro interno do servidor ao cadastrar livro.' });
    }
});

// 2. LISTAGEM DE LIVROS (GET)
router.get('/', async (req, res) => {
    try {
        const livros = await Livro.find();
        res.status(200).json(livros);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar os livros.' });
    }
});

// 3. CONSULTA DE LIVRO POR ID (GET)
router.get('/:id', async (req, res) => {
    try {
        const livro = await Livro.findById(req.params.id);
        
        // Se o ID for válido mas o livro não existir
        if (!livro) {
            return res.status(404).json({ mensagem: 'Livro não encontrado.' });
        }
        
        res.status(200).json(livro);
    } catch (error) {
        // Trata IDs malformados do MongoDB (CastError)
        if (error.name === 'CastError') {
            return res.status(400).json({ mensagem: 'ID informado é inválido.' });
        }
        res.status(500).json({ mensagem: 'Erro ao consultar o livro.' });
    }
});

// 4. REMOÇÃO DE LIVRO (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const livroDeletado = await Livro.findByIdAndDelete(req.params.id);
        
        if (!livroDeletado) {
            return res.status(404).json({ mensagem: 'Livro não encontrado para remoção.' });
        }
        
        res.status(200).json({ mensagem: 'Livro removido com sucesso!', livro: livroDeletado });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ mensagem: 'ID informado é inválido.' });
        }
        res.status(500).json({ mensagem: 'Erro ao deletar o livro.' });
    }
});

module.exports = router;