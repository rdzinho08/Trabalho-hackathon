 const express = require('express');
const cors = require('cors');


const { connectDB } = require('./config/db');

const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 3000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('🛡️ API do Cidade Segura está operando normalmente!');
});

app.use('/api', authRoutes);

app.listen(PORT, () => {
    console.log(`\n🚀 [Cidade Segura] Servidor iniciado com sucesso!`);
    console.log(`📡 Escutando na porta: ${PORT}`);
    console.log(`🔗 Link local: http://localhost:${PORT}`);
});