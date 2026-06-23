function getAsync(sql, params) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (erro, resultado) => {
        if(erro){
            reject(erro);
            return;
        }

        resolve(resultado);

    })
  })
};

function runAsync(sql, params) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (erro){
            if(erro){
                reject(erro);
                return;
            }

            resolve(this)
        })
    })
  }

async function adicionarAtendimento(req, res){
    const {nome, wpp, placa, marca, modelo, ano, servico, valor, km, data} = req.body;

    try{

        let clienteId;

        let cliente = await getAsync (`SELECT * FROM clientes WHERE wpp = ?`, [wpp])

        if(!cliente){
            
            const resultado = await runAsync(`INSERT INTO clientes (nome, wpp) 
                VALUES(?, ?)`, 
                [nome, wpp])

                clienteId = resultado.lastID;

            } else {

                clienteId = cliente.id;

            }

        const carro = await getAsync(`SELECT * FROM carros WHERE placa = ?`, [placa])

        if(!carro){
        
            await runAsync(`INSERT INTO carros(clienteId, placa, marca, modelo, ano) VALUES(?, ?, ?, ?, ?)`,
        [clienteId, placa, marca, modelo, ano])

        }

        await runAsync(`INSERT INTO servicos (clienteId, servico, km, valor, data, placa) VALUES (?, ?, ?, ?, ?, ?)`,
      [clienteId, servico, km, valor, data, placa])

      res.status(201).send("Serviço incluido com sucesso!");

    } catch (erro) {

        res.status(500).send("Erro interno ao adicionar atendimento!");

    }
}