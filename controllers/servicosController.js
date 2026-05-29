const db = require('../database/database');

function adicionarServico(req, res){
    const servico = req.body.servico;
    const clienteId = req.body.clienteId;
    const data = req.body.data;
    const valor = req.body.valor;
    const km = req.body.km;

    db.run(

    `INSERT INTO servicos
    (clienteId, servico, km, valor, data)
    VALUES (?, ?, ?, ?, ?)`,

    [clienteId, servico, km, valor, data],

    (erro) => {

        if(erro){
            res.send('Erro ao adicionar serviço!');
            return;
        };

        res.send('Serviço adicionado!');
    }
);
}



function listarServicos(req, res){
    
    
    db.all(

        'SELECT * FROM servicos',
        (erro, linhas) => {

            if(erro){
                res.send(`Serviços não encontrados!`);
                return;
            };

        res.send(linhas);
        }
    );
}



function buscarServico(req, res){
    const id = req.params.id;
    const servico = req.body.servico;

    db.get(

        'SELECT * FROM servicos WHERE id = ?',
        [id],
        (erro, servico) => {

            if(erro){
                res.send(`Erro ao buscar serviço!`);
                return;
            };

        res.send(servico);

        }
    );
}

function removerServico(req, res){
    const id = req.params.id;

    db.run(

        'DELETE FROM servicos WHERE id =?',
        [id],
        (erro) => {
            res.send(`Erro ao remover o serviço!`);
            return;

            res.send(`Serviço removido!`);
            
        }
    );
}

module.exports = {
    adicionarServico,
    listarServicos,
    buscarServico,
    removerServico
}