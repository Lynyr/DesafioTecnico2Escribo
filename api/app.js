const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Rotas da API
app.use('/api', userRoutes);

// Inicialização do servidor
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });


module.exports = app;
