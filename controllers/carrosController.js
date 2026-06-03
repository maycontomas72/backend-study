const db = require('../database/database');

function adicionarCarro(req, res) {

    const clienteId = req.body.clienteId;
    const placa = req.body.placa;
    const marca = req.body.marca;
    const modelo = req.body.modelo;
    const ano = req.body.ano;

    db.run(

        `INSERT INTO carros
        (clienteId, placa, marca, modelo, ano)
        VALUES (?, ?, ?, ?, ?)`,

        [clienteId, placa, marca, modelo, ano],

        (erro) => {

            console.log(erro);

            if(erro){
                res.send('Erro ao adicionar carro!');
                return;
            }

            res.send('Carro adicionado!');
        }
    );
}

function listarCarros(req, res){

    db.all(

        'SELECT * FROM carros',

        (erro, linhas) => {

            if(erro){
                res.send('Erro ao listar carros!');
                return;
            }

            res.send(linhas);
        }
    );
}

function buscarCarro(req, res){

    const id = req.params.id;

    db.get(

        'SELECT * FROM carros WHERE id = ?',

        [id],

        (erro, carro) => {

            if(erro){
                res.send('Erro ao buscar carro!');
                return;
            }

            res.send(carro);
        }
    );
}

function removerCarro(req, res){

    const id = req.params.id;

    db.run(

        'DELETE FROM carros WHERE id = ?',

        [id],

        (erro) => {

            if(erro){
                res.send('Erro ao remover carro!');
                return;
            }

            res.send('Carro removido!');
        }
    );
}

module.exports = {
    adicionarCarro,
    listarCarros,
    buscarCarro,
    removerCarro
};