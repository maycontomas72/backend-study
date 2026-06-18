const db = require('../database/database');

function contagemClientes(req, res){

    db.get(

        'SELECT COUNT(*) as total FROM clientes',
        (erro, linha) => {

            if(erro){
                res.send("Erro ao calcular número de clientes!");
                return;
            }

            res.send(linha);
        }
    );
}

function contagemCarros(req, res){

    db.get(

        'SELECT COUNT(*) as total FROM carros',
        (erro, linha) => {

            if(erro){
                res.send("Erro ao calcular número de carros!");
                return;
            }

            res.send(linha);
        }
    );
}

function contagemServicos(req, res){

    db.get(

        'SELECT COUNT(*) as total FROM servicos',
        (erro, linha) => {

            if(erro){
                res.send("Erro ao calcular número de clientes!");
                return;
            }

            res.send(linha);
        }
    );
}

function periodoData(req, res){
    const dataInicial = req.body.dataInicial;
    const dataFinal = req.body.dataFinal;

    db.all(

        'SELECT * FROM servicos WHERE data >= ? AND data <= ?',
        [dataInicial, dataFinal],
        (erro, servicos) => {

            if(erro){
                res.send("Erro ao buscar a data!");
                return;
            }

            res.send(servicos);


        }
    );
}

module.exports = {
    contagemClientes,
    contagemCarros,
    contagemServicos,
    periodoData
};