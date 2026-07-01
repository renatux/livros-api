require('dotenv').config();
const mongoose = require('mongoose');

const montarMongoURI = () => {
    const { MONGODB_USERNAME, MONGODB_PASSWORD, SEUCLUSTER, SEUAPP } = process.env;
    if (MONGODB_USERNAME && MONGODB_PASSWORD && SEUCLUSTER) {
        return `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${SEUCLUSTER}.mongodb.net/?appName=${SEUAPP || 'livros-api'}`;
    }
    return 'mongodb+srv://usuario:***@cluster.mongodb.net/?appName=livros-api';
};

const conectarBD = async () => {
    try {
        const mongoURI = montarMongoURI();
        
        await mongoose.connect(mongoURI);
        console.log('MongoDB conectado com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error.message);
        process.exit(1); // Encerra a aplicação em caso de falha crítica
    }
};

module.exports = conectarBD;