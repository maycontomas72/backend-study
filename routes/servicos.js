const express = require('express');

const router = express.Router();

const db = require('../database/database');

const {
    adicionarServico,
    listarServicos,
    buscarServico,
    removerServico,
    listarServicosCliente,
    historicoCliente,
    removerUltimoServico
} = require('../controllers/servicosController');

router.get('/servicos', listarServicos);

router.get('/servicos/:id', buscarServico); 

router.post('/servicos', adicionarServico);

router.delete('/servicos/:id', removerServico);

router.delete('/servicos/ultimo/:placa', removerUltimoServico);

router.get('/clientes/:id/servicos', listarServicosCliente);

router.get('/clientes/:nome/historico', historicoCliente);

module.exports = router;