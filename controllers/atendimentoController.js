const db = require('../database/database'); 

function adicionarAtendimento(req, res){


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
                res.send(cliente.id);
                return;          
            }
            
            console.log("cliente não encontrado!");
            
            res.send("cliente não encontrado!");
            
            
            db.run(
            
            'INSERT INTO clientes (nome, wpp) VALUES (?, ?)',
            [nome, wpp],
            
            function(erro) {
                
                if (erro) {
                    
                    res.send('Erro ao criar cliente');
                    return;
                }
                
                res.send(this.lastID);

            }
            );
        }            
    );
}


module.exports = {
    adicionarAtendimento
};