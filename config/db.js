require('dotenv').config();
const mongoose = require('mongoose');

// Função assíncrona para conectar ao MongoDB
const conectarBD = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://alucardsp_db_user:***@szlab.crjhpiy.mongodb.net/?appName=szlab'; 
        
        await mongoose.connect(mongoURI);
        console.log('MongoDB conectado com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error.message);
        process.exit(1); // Encerra a aplicação em caso de falha crítica
    }
};

module.exports = conectarBD;