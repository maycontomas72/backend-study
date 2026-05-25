const db = require('../database/database');

console.log("teste");

function listarClientes(req, res) {


    db.all(

        'SELECT * FROM produtos',
        (erro, linhas) => {

            if(erro){
                res.send(`Clientes não encontrados!`);
            }

        res.send(linhas);
        }
    );
}

function buscarCliente(req, res) {
    const nome = req.params.nome;
    const id = req.body.id;
    const wpp = req.body.wpp;
    const carro = req.body.carro;



    db.get(

        'SELECT * FROM produtos WHERE cliente = ?',
        [nome, id, wpp, carro],
        (erro, cliente) => {

            if(erro){
                res.send(`Cliente não encontrado!`);
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
    };


    db.run(

        'INSERT INTO clientes (nome, wpp) VALUES (?, ?)',
        [nome, wpp],
    )
}