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

module.exports = {
    contagemClientes,
    contagemCarros,
    contagemServicos
};