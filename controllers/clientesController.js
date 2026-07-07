const db = require('../database/database');

function listarClientes(req, res) {


    db.all(

        'SELECT * FROM clientes',
        (erro, linhas) => {

            if(erro){
                res.status(500).send(`Clientes não encontrados!`);
                return;
            }

        res.status(200).send(linhas);
        }   
    );
}

function buscarCliente(req, res) {
    const id = req.params.id;

    if(!id){

        res.status(400).send("Id não encontrado!");
        return;
    }


    db.get(

        'SELECT * FROM clientes WHERE id = ?',
        [id],
        (erro, cliente) => {

            if(erro){
                res.status(500).send(`Cliente não encontrado!`);
                return;
            };


        res.status(200).send(cliente);

        }
    );
}

function adicionarCliente(req, res) {

    const nome = req.body.nome;
    const wpp = req.body.wpp;

    if(!nome){
        res.status(400).send(`Nome não preenchido!`);
        return
    };

    if(!wpp){
        res.status(400).send(`WhatsApp não preenchido!`);
        return
    };

    db.get(

        'SELECT * FROM clientes WHERE wpp = ?',
        [wpp],
        (erro, cliente) => {

            if(erro){
                res.status(500).send("Erro ao buscar cliente");
                return;
            };

            if(cliente){
                res.status(200).send({
                    id : cliente.id,
                    nome : cliente.nome,
                    wpp : cliente.wpp
                });
                
                return;
            };

            db.run(
        
        
            'INSERT INTO clientes (nome, wpp) VALUES (?, ?)',
            [nome, wpp],
            function (erro){

            if(erro){
                
                res.status(500).send(`Erro ao adicionar cliente!`);
                return;
            };

            res.status(201).send({
                id : this.lastID,
                nome : nome,
                wpp : wpp
            });
        });       
        }
    );   
}

function atualizarCliente(req, res) {
    const id = req.params.id;
    const ultimaVisita = req.body.ultimaVisita;

    if(!id){
        res.status(400).send(`id não encontrado!`);
        return;
    };

    if(!ultimaVisita){
        res.status(400).send(`Última visita não registrada!`);
        return;
    };

    db.run(

        'UPDATE clientes SET ultimaVisita = ? WHERE id = ?',
        [ultimaVisita, id],
        (erro) => {

            if(erro){
                
                res.status(500).send(`Erro ao atualizar a última visita!`);
                return;
            };

        res.status(200).send(`Próxima revisão atualizada!`);

        }
    );
}

function removerCliente(req, res) {
    const id = req.params.id;

    if(!id){
        res.status(400).send('Id não preenchido!');
        return;
    }


    db.run(

        'DELETE FROM clientes WHERE id = ?',
        [id],
        function (erro){
            if(erro){

                res.status(500).send("Erro ao remover cliente!");
                return;

            }else{

                if(this.changes === 0){

                    res.status(404).send("Cliente não encontrado");
                    return;

                }

                
            res.status(200).send("Cliente removido!");

                
            }
        }
    );
}

function clientesInativos(req, res){


    db.all(

        `
        SELECT clientes.nome, clientes.wpp, MAX(servicos.data) AS ultimaVisita
        FROM clientes
        JOIN carros
        ON clientes.id = carros.clienteId
        JOIN servicos
        ON carros.placa = servicos.placa
        GROUP BY clientes.id
        HAVING ultimaVisita < DATE('now', '-6 months')`,
        [],
        (erro, clientes) => {

            if(erro){
                res.status(500).send("Erro ao buscar clientes");
                return;
            }

            res.status(200).send(clientes);

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


module.exports = {
    listarClientes,
    buscarCliente,
    adicionarCliente,
    atualizarCliente,
    removerCliente,
    clientesInativos,
    historicoCliente,
    listarServicosCliente
};