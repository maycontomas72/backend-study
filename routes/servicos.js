const express = require('express');

const router = express.Router();

const db = require('../database/database');

const {
    adicionarServico,
    listarServicos,
    buscarServico,
    removerServico,
    removerUltimoServico
} = require('../controllers/servicosController');

router.get('/servicos', listarServicos);

router.get('/servicos/:id', buscarServico); 

router.post('/servicos', adicionarServico);

router.delete('/servicos/ultimo/:placa', removerUltimoServico);

router.delete('/servicos/:id', removerServico);

module.exports = router;