const express = require('express');

const router = express.Router();

const db = require('../database/database');

const {
   listarCarros,
   buscarCarro,
   adicionarCarro,
   removerCarro,
   historicoCarro
} = require('../controllers/carrosController');

router.get('/carros', listarCarros);

router.post('/carros', adicionarCarro);

router.delete('/carros/:placa', removerCarro);

router.get('/carros/historico/:placa', historicoCarro);

router.get('/carros/:placa', buscarCarro); 

module.exports = router;