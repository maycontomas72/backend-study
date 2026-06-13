const express = require('express');

const router = express.Router();

const db = require('../database/database');

const {
    contagemClientes,
    contagemCarros,
    contagemServicos
} = require('../controllers/dashboardController');

router.get('/contagem/clientes', contagemClientes);

router.get('/contagem/carros', contagemCarros);

router.get('/contagem/servicos', contagemServicos);

module.exports = router;