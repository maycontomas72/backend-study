const db = require('./database/database');

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const clientesRoutes = require('./routes/clientes');
const servicosRoutes = require('./routes/servicos');
const carrosRoutes = require('./routes/carros');
const atendimentoRoutes = require('./routes/atendimento');
const dashboardRoutes = require('./routes/dashboard');

app.use('/', clientesRoutes);
app.use('/', servicosRoutes);
app.use('/', carrosRoutes);
app.use('/', atendimentoRoutes);
app.use('/', dashboardRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
