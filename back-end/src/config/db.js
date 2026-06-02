 const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cidade_segura', 'postgres', 'senai', {
    host: 'localhost',
    dialect: 'postgres', 
    logging: false    
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true }); 
        console.log('💾 [Banco de Dados] SQL (Sequelize) conectado com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao conectar ao banco SQL:', error.message);
        process.exit(1);
    }
};

module.exports = { connectDB, sequelize };