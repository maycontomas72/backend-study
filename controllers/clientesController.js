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
    const id = req.params.id;


    db.get(

        'SELECT * FROM clientes WHERE id = ?',
        [id],
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
        res.send(`Nome não preenchido!`);
        return
    };

    if(!wpp){
        res.send(`WhatsApp não preenchido!`);
        return
    };

    db.get(

        'SELECT * FROM clientes WHERE wpp = ?',
        [wpp],
        (erro, cliente) => {

            if(erro){
                res.send("Erro ao buscar cliente");
                return;
            };

            if(cliente){
                res.send({
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
                
                res.send(`Erro ao adicionar cliente!`);
                return;
            };

            res.send({
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
        res.send(`id não encontrado!`);
        return;
    };

    if(!ultimaVisita){
        res.send(`Última visita não registrada!`);
        return;
    };

    db.run(

        'UPDATE clientes SET ultimaVisita = ? WHERE id = ?',
        [ultimaVisita, id],
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
    const id = req.params.id;


    db.run(

        'DELETE FROM clientes WHERE id = ?',
        [id],
        (erro) => {
            if(erro){
                
                res.send(`Erro ao remover cliente!`);
                return;
            };
        
            res.send(`Cliente removido!`);
        }
    );
}

function clientesInativos(req, res){
    console.log("entrou");

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
                res.send("Erro ao buscar clientes");
                return;
            }

            res.send(clientes);

        }
    );
}

module.exports = {
    listarClientes,
    buscarCliente,
    adicionarCliente,
    atualizarCliente,
    removerCliente,
    clientesInativos
};