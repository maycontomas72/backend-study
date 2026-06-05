const db = require('../database/database');

function adicionarServico(req, res){
    const servico = req.body.servico;
    const clienteId = req.body.clienteId;
    const data = req.body.data;
    const valor = req.body.valor;
    const km = req.body.km;
    const placa = req.body.placa;

    db.run(

    `INSERT INTO servicos
    (clienteId, servico, km, valor, data, placa)
    VALUES (?, ?, ?, ?, ?, ?)`,

    [clienteId, servico, km, valor, data, placa],

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

function listarServicosCliente(req, res){
    const clienteId = req.params.id;

    db.all(

        'SELECT * FROM servicos WHERE clienteId = ?',
        [clienteId],
        (erro, linhas) => {
            if(erro){
                res.send(`Erro ao listar serviços!`);
                return;
            };

            res.send(linhas);
        }
    );
}

function historicoCliente(req, res) {
    
    const id = req.params.id;


    db.get(

        'SELECT * FROM clientes WHERE id = ?',
        [id],
        (erro, cliente) => {
            if(erro){
                res.send(`Cliente não encontrado!`);
                return;
            }
            
            if(!cliente){
                res.send(`Cliente não encontrado!`);
                return;
            }

            if(cliente){

                db.all(

                    'SELECT * FROM servicos WHERE id = ?',
                    [id],
                    (erro, servicos) => {

                        if(erro){
                            res.send(`Serviços não encontrados!`);
                            return;
                        }

                        const resultado = {
                            cliente : cliente,
                            servicos : servicos
                        }

                        res.send(resultado);
                    }
                );
            }   
        }
    );
}


module.exports = {
    adicionarServico,
    listarServicos,
    buscarServico,
    removerServico,
    listarServicosCliente,
    historicoCliente,
}