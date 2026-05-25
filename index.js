const express = require('express');

const db = require('./database');

const app = express();

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

const produtosRoutes = require('./routes/produtos');

const clientesRoutes = require('./routes/clientes');

app.use(express.json());

app.use(produtosRoutes);

app.use(clientesRoutes);


    
 
