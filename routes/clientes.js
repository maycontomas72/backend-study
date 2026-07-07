const express = require('express');

const router = express.Router();

const db = require('../database/database');

const {
    listarClientes,
    buscarCliente,
    adicionarCliente,
    atualizarCliente,
    removerCliente,
    clientesInativos,
    historicoCliente,
    listarServicosCliente
} = require('../controllers/clientesController');

router.get('/clientes', listarClientes);

router.get('/clientes/inativos', clientesInativos)

router.post('/clientes', adicionarCliente);

router.put('/clientes/:id', atualizarCliente);

router.delete('/clientes/:id', removerCliente);

router.get('/clientes/:nome/historico', historicoCliente);

router.get('/clientes/:id/servicos', listarServicosCliente);

router.get('/clientes/:id', buscarCliente); 

module.exports = router;