const mongoose = require('mongoose');

// Definição do Schema do Livro com validações de obrigatoriedade
const LivroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'O título é obrigatório.']
    },
    autor: {
        type: String,
        required: [true, 'O autor é obrigatório.']
    },
    editora: {
        type: String,
        required: [true, 'A editora é obrigatória.']
    },
    anoPublicacao: {
        type: Number,
        required: [true, 'O ano de publicação é obrigatório.']
    },
    numeroPaginas: {
        type: Number,
        required: [true, 'O número de páginas é obrigatório.']
    }
}, {
    timestamps: true // Adiciona automaticamente os campos createdAt e updatedAt
});

module.exports = mongoose.model('Livro', LivroSchema);