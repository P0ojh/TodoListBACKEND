const express = require('express');
const mongoose = require('mongoose');

const app = express();

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "HEAD, GET, POST, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// JSON
app.use(express.json());

// Porta
const PORT = process.env.PORT || 3000;

// Rotas
const routes = require('./routes/routes');
app.use('/api', routes);

// URL do MongoDB vinda do Render
const mongoURL = process.env.MONGO_URL;

// Conectar banco e iniciar servidor
mongoose.connect(mongoURL)
  .then(() => {
    console.log('Database Connected');

    app.listen(PORT, () => {
      console.log(`Server Started at ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Erro ao conectar no MongoDB');
    console.log(error);
  });