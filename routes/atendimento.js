const express = require('express');

const router = express.Router();

const {
    adicionarAtendimento
} = require('../controllers/atendimentoController');

router.post('/atendimento', adicionarAtendimento);

module.exports = router;