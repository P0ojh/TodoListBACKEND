// Importa o framework Express, usado para criar o servidor web
const express = require('express');

// Cria a aplicação servidor
const app = express();

// Middleware global CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "HEAD, GET, POST, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Middleware para receber JSON
app.use(express.json());

// Porta do servidor
const PORT = process.env.PORT || 3000;

// Importa rotas
const routes = require('./routes/routes');

// Usa prefixo /api
app.use('/api', routes);

// Importa mongoose
const mongoose = require('mongoose');

// URL do MongoDB vinda da variável de ambiente
const mongoURL = process.env.MONGO_URL;

// Conecta ao MongoDB
mongoose.connect(mongoURL)
    .then(() => {
        console.log('Database Connected');

        // Só inicia servidor depois do banco conectar
        app.listen(PORT, () => {
            console.log(`Server Started at ${PORT}`);
        });
    })
    .catch((error) => {
        console.log('Erro ao conectar no MongoDB:');
        console.log(error);
    });