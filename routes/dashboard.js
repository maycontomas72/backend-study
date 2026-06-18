const express = require('express');

const router = express.Router();

const db = require('../database/database');

const {
    contagemClientes,
    contagemCarros,
    contagemServicos,
    periodoData
} = require('../controllers/dashboardController');

router.get('/contagem/clientes', contagemClientes);

router.get('/contagem/carros', contagemCarros);

router.get('/contagem/servicos', contagemServicos);

router.post('/servicos/periodo', periodoData);

module.exports = router;