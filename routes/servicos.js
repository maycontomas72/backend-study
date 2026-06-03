const express = require('express');

const router = express.Router();

const db = require('../database/database');

const {
    adicionarServico,
    listarServicos,
    buscarServico,
    removerServico,
    listarServicosCliente,
    historicoCliente
} = require('../controllers/servicosController');

router.get('/servicos', listarServicos);

router.get('/servicos/:id', buscarServico); 

router.post('/servicos', adicionarServico);

router.delete('/servicos/:id', removerServico);

router.get('/clientes/:id/servicos', listarServicosCliente);

router.get('/clientes/:id/historico', historicoCliente);

module.exports = router;