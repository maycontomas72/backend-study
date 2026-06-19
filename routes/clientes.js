const express = require('express');

const router = express.Router();

const db = require('../database/database');

const {
    listarClientes,
    buscarCliente,
    adicionarCliente,
    atualizarCliente,
    removerCliente,
    clientesInativos
} = require('../controllers/clientesController');

router.get('/clientes', listarClientes);

router.get('/clientes/inativos', clientesInativos)

router.get('/clientes/:id', buscarCliente); 

router.post('/clientes', adicionarCliente);

router.put('/clientes/:id', atualizarCliente);

router.delete('/clientes/:id', removerCliente);

module.exports = router;