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

            if(erro){

            res.send(`Erro ao remover o serviço!`);
            return;
            }

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
    
    const nome = req.params.nome;

    db.all(

        'SELECT clientes.nome, carros.placa, clientes.wpp FROM clientes JOIN carros ON clientes.id = carros.clienteId WHERE clientes.nome LIKE ?',
        [`%${nome}%`],
        (erro, linhas) => {

            if (erro) {
                res.send("Erro ao fazer a busca!");
                return;
            }

            if (linhas.length === 0) {
                res.send("Nenhum dado encontrado!");
                return;
            }

            res.send(linhas);
        }
    );
}

function removerUltimoServico(req, res){

    const placa = req.params.placa;

    db.get(

        `SELECT id FROM servicos WHERE placa = ?
        ORDER BY id DESC LIMIT 1`,
        [placa],
        (erro, servico) => {

            if(erro){
                res.send("Erro ao buscar o ultimo serviço para remoção!");
                return;
            }

            if(!servico){
                res.send("O cliente não possui serviço registrado!");
                return;
            }

            if(servico){

                db.run(

                    'DELETE FROM servicos WHERE id = ?',
                    [servico.id],
                    (erro) => {

                        if(erro){
                            res.send("Erro ao remover o último serviço!");
                            return;
                        }

                        res.send("Último serviço removido!");
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
    removerUltimoServico
}