const db = require('../database/database'); 


function adicionarAtendimento(req, res){

    let clienteId;
    const nome = req.body.nome;
    const wpp = req.body.wpp;
    const placa = req.body.placa;
    const marca = req.body.marca;
    const modelo = req.body.modelo;
    const ano = req.body.ano;
    const servico = req.body.servico;
    const valor = req.body.valor;
    const km = req.body.km;
    const data = req.body.data;
    


    db.get(

        'SELECT * FROM clientes WHERE wpp = ?',
        [wpp],
        (erro, cliente) => {

            if(erro){
                res.send("Erro ao buscar cliente!");
                return;
            }

            if(cliente){
                clienteId = cliente.id; 
                
                db.get(

                    'SELECT * FROM carros WHERE placa = ?',
        [placa],
        (erro, carro) =>{
            
            if(erro){
                res.send("Erro ao buscar veiculo!");
                return;
            }

            if(carro){
                console.log(carro);

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
            }else{
                console.log("clienteId antes do insert:", clienteId);

                db.run(

                    'INSERT INTO carros(clienteId, placa, marca, modelo, ano) VALUES(?, ?, ?, ?, ?)',
                    [clienteId, placa, marca, modelo, ano],
                    (erro) => {

                        if(erro){
                            res.send("Erro ao adicionar veiculo!");
                            return;
                        }

                        
                        console.log("veiculo incluido no sistema!");

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
                    
                );
            }
        }
                );

            } else {

            db.run(

                'INSERT INTO clientes(nome, wpp) VALUES(?, ?)',
                [nome, wpp],
                function(erro){

                    if(erro){
                        res.send("erro ao adicionar cliente!");
                        return;
                    }

                    clienteId = this.lastID;
                    console.log(clienteId);
                    db.get(

                        'SELECT * FROM carros WHERE placa = ?',
        [placa],
        (erro, carro) =>{
            
            if(erro){
                res.send("Erro ao buscar veiculo!");
                return;
            }

            if(carro){
                console.log(carro);

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
            }else{
                console.log("clienteId antes do insert:", clienteId);

                db.run(

                    'INSERT INTO carros(clienteId, placa, marca, modelo, ano) VALUES(?, ?, ?, ?, ?)',
                    [clienteId, placa, marca, modelo, ano],
                    (erro) => {

                        if(erro){
                            res.send("Erro ao adicionar veiculo!");
                            return;
                        }

                        console.log("veiculo incluido no sistema!");

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
                    
                );
            }
        }
                    );
                }
            );
        }   
        }
    );
}

module.exports = {
    adicionarAtendimento
};