const express = require('express');

const router = express.router();

const db = require('../database/database');

const {
    listarClientes;
} = require(../controllers/clientesController);

router.get('/clientes', listarClientes);

router.get('/clientes/:nome', buscarCliente);

router.post('/cliente', adicionarCliente);