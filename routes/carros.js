const express = require('express');

const router = express.Router();

const db = require('../database/database');

const {
   listarCarros,
   buscarCarro,
   adicionarCarro,
   removerCarro
} = require('../controllers/carrosController');

router.get('/carros', listarCarros);

router.get('/carros/:placa', buscarCarro); 

router.post('/carros', adicionarCarro);

router.delete('/carros/:placa', removerCarro);

module.exports = router;