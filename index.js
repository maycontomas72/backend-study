const express = require('express');

const db = require('./database/database');

const app = express();

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

const clientesRoutes = require('./routes/clientes');

const servicosRoutes = require('./routes/servicos');

const carrosRoutes = require('./routes/carros');

app.use(express.json());

app.use('/', clientesRoutes);

app.use('/', servicosRoutes);

app.use('/', carrosRoutes);
    
 
