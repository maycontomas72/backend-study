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

    const placa = req.params.placa;

    db.get(

        'SELECT * FROM carros WHERE placa = ?',

        [placa],

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

function historicoCarro(req, res){

    const placa = req.params.placa;

    db.get(

        'SELECT * FROM carros WHERE placa = ?',
        [placa],
        (erro, carro) => {

            if(erro){
                res.send(`Erro ao buscar veiculo!`);
                return;
            };

            if(!carro){
                res.send(`Veiculo não encontrado!`);
                return;
            };

            if(carro){

                db.get(

                    'SELECT * FROM clientes WHERE id = ?',
                    [carro.clienteId],
                    (erro, cliente) => {

                        if(erro){
                            res.send(`Erro ao encontrar cliente!`);
                            return;
                        };

                        if(!cliente){
                            res.send(`Cliente não encontrado!`);
                            return;
                        };

                        if(cliente){
                            
                            db.all(

                                'SELECT * FROM servicos WHERE placa = ?',
                                [placa],
                                (erro, servicos) => {

                                    if(erro){
                                        res.send(`Erro ao encontrar serviços!`);
                                        return;
                                    };

                                    if(!servicos){
                                        res.send(`Erro ao encontrar serviços!`);
                                        return;
                                    };
                                    
                                    const resultado = {
                                        carro : carro,
                                        cliente : cliente,
                                        servicos : servicos
                                    };

                                    res.send(resultado);
                                }
                            );
                        }
                    }
                );
            }
        }
    );    
}

module.exports = {
    adicionarCarro,
    listarCarros,
    buscarCarro,
    removerCarro,
    historicoCarro
};