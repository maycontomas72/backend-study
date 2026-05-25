const express = require('express');

const router = express.Router();

const db = require('../database/database');

const {
    listarProdutos,
    adicionarProduto,
    atualizarProduto,
    buscarProduto,
    removerProduto
} = require('../controllers/produtosController');

const {
    validarProduto,
    validarPreco
}= require('../middleware/validarProduto');


router.get('/produtos', listarProdutos);

router.post('/produto', validarProduto, validarPreco, adicionarProduto);

router.put('/atualizar/:produto', validarProduto, validarPreco, atualizarProduto);

router.get('/produto/:nome', validarProduto, validarPreco, buscarProduto);
    
router.delete('/remover/:produto', validarProduto, removerProduto);

module.exports = router;