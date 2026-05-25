const db = require('../database');

console.log("teste");

function listarProdutos(req, res) {


    db.all(

        'SELECT * FROM produtos',
        (erro, linhas) => {

            if(erro){
                
                res.send(`Produtos não encontrados`);
                return;
            };

        res.send(linhas);

        }
    );
}

function buscarProduto(req, res) {
    const nome = req.params.nome;
    const preco = req.body.preco;

    db.get(

        'SELECT * FROM produtos WHERE produto = ?',
        [nome],
        (erro, produto) => {

            if(erro){
                res.send(`Produto não encontrado!`);
            };

        res.send(produto);

        }
    );
}

function adicionarProduto(req, res) {
    const produto = req.body.produto;
    const preco = req.body.preco;

    if(!produto){
        res.send(`Produto inválido!`);
        return;
    };

    if (!preco){
        res.send(`Preço inválido!`);
        return;
    };

    db.run(

        'INSERT INTO produtos (produto, preco) VALUES (?, ?)',
        [produto, preco]
    );

    res.send(`Produto adicionado`);

}

function atualizarProduto(req, res) {
    const produto = req.params.produto;
    const preco = req.body.preco;

    if(!preco){
        res.send(`Preço inválido!`);
        return;
    };

    if(!produto){
        res.send(`Produto inválido!`);
        return;
    };

    db.run(

        'UPDATE produtos SET preco = ? WHERE produto = ?',
        [preco, produto]
    );

    res.send(`Produto atualizado!`);

}

function removerProduto(req, res) {
    const produto = req.params.produto;

    
    if(!produto){
        res.send(`Produto inválido!`);
    };


    db.run(

        'DELETE FROM produtos WHERE produto = ?',
        [produto]

    );

    res.send(`Produto removido!`);

}

module.exports = {
    listarProdutos,
    buscarProduto,
    adicionarProduto,
    atualizarProduto,
    removerProduto
};

