const botao = document.getElementById('salvar');

botao.addEventListener('click', async () => {

    const nome = document.getElementById('nome').value;

    const wpp = document.getElementById('wpp').value;

    const placa = document.getElementById('placa').value;

    const marca = document.getElementById('marca').value;

    const modelo = document.getElementById('modelo').value;

    const ano = document.getElementById('ano').value;

    const servico = document.getElementById('servico').value;

    const valor = document.getElementById('valor').value;

    const km = document.getElementById('km').value;

    const data = document.getElementById('data').value;

    const clienteObj = {
        nome,
        wpp
    };

    console.log(clienteObj);

    const carroObj = {
        placa,
        marca,
        modelo,
        ano
    };

    console.log(carroObj);

    const servicoObj = {
        servico,
        valor,
        km,
        data
    };

    console.log(servicoObj);

    try {

    const respostaCliente = await fetch(
        'http://localhost:3000/clientes',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clienteObj)
        }
    );

    const clienteCriado = await respostaCliente.text();
    const clienteId = clienteCriado.id;

    console.log(clienteCriado);

} catch (erro) {

    console.log(erro);

}

 try {

    const respostaCarro = await fetch(
        'http://localhost:3000/carros',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carroObj)
        }
    );

    const mensagemCarro = await respostaCarro.text();

    console.log(mensagemCarro);

} catch (erro) {

    console.log(erro);

}

 try {

    const respostaServico = await fetch(
        'http://localhost:3000/servicos',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(servicoObj)
        }
    );

    const mensagemServico = await respostaServico.text();

    console.log(mensagemServico);

} catch (erro) {

    console.log(erro);

}

});