const db = require('../database/database');

function listarClientes(req, res) {


    db.all(

        'SELECT * FROM clientes',
        (erro, linhas) => {

            if(erro){
                res.send(`Clientes não encontrados!`);
                return;
            }

        res.send(linhas);
        }
    );
}

function buscarCliente(req, res) {
    const nome = req.query.nome;


    db.get(

        'SELECT * FROM clientes WHERE cliente = ?',
        [nome],
        (erro, cliente) => {

            if(erro){
                res.send(`Cliente não encontrado!`);
                return;
            };


        res.send(cliente);

        }
    );
}

function adicionarCliente(req, res) {
    const nome = req.body.nome;
    const wpp = req.body.wpp;

    if(!nome){
        res.send(`Nome não encontrado!`);
        return
    };

    if(!wpp){
        res.send(`WhatsApp não encontrado!`);
        return
    };


    db.run(

        'INSERT INTO clientes (nome, wpp) VALUES (?, ?)',
        [nome, wpp],
        (erro) =>{

            if(erro){
                
                res.send(`Erro ao adicionar cliente!`);
                return;
            };

            res.send(`Cliente adicionado!`);

        }
    );    
}

function atualizarCliente(req, res) {
    const idCliente = req.params.idCliente;
    const ultimaVisita = req.body.ultimaVisita;

    if(!idCliente){
        res.send(`idCliente não encontrado!`);
        return;
    };

    if(!ultimaVisita){
        res.send(`Última visita não registrada!`);
        return;
    };

    db.run(

        'UPDATE clientes SET ultimaVisita = ? WHERE idCliente = ?',
        [ultimaVisita, idCliente],
        (erro) => {

            if(erro){
                
                res.send(`Erro ao atualizar a última visita!`);
                return;
            };

        res.send(`Próxima revisão atualizada!`);

        }
    );
}

function removerCliente(req, res) {
    const idCliente = req.params.idCliente;

    db.run(

        'DELETE FROM clientes WHERE idCliente = ?',
        [idCliente],
        (erro) =>{

            if(erro){
                
                res.send(`Erro ao remover cliente!`);
                return;
            };
        
            res.send(`Cliente removido!`);
        }
    );
}

module.exports = {
    listarClientes,
    buscarCliente,
    adicionarCliente,
    atualizarCliente,
    removerCliente
};