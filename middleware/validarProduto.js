function validarProduto(req, res, next) {
    
    const produto = req.body.produto || req.params.produto;

    if(!produto){
        res.send(`Produto Inválido!`);
        return;
    };

    next();

}

function validarPreco(req, res, next) {

    const preco = req.body.preco || req.params.preco;

    if(isNaN(preco)){
    
        res.send(`Preço Inválido!`);
        return;
    };

    next();

}

module.exports = {
    validarProduto,
    validarPreco
};

