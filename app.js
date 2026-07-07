const db = require('./database/database');

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

app.use(
    express.static(
        path.join(__dirname, 'frontend')
    )
);

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

module.exports = app;