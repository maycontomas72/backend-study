const botao = document.getElementById('buscar');

botao.addEventListener('click', async () => {

    const placa = document.getElementById('placa').value;

    try {

        const resposta = await fetch(
            `http://localhost:3000/carros/historico/${placa}`
        );

        const dados = await resposta.json();

        const resultado = document.getElementById('resultado');
        console.log(dados.servicos);

        for (let servico of dados.servicos) {

    console.log(servico);

}

resultado.innerHTML = `
    <h2>Cliente</h2>
    <p>Nome: ${dados.cliente.nome}</p>
    <p>WhatsApp: ${dados.cliente.wpp}</p>

    <h2>Carro</h2>
    <p>Placa: ${dados.carro.placa}</p>
    <p>Marca: ${dados.carro.marca}</p>
    <p>Modelo: ${dados.carro.modelo}</p>
    <p>Ano: ${dados.carro.ano}</p>
`;

        

        console.log(dados);

    } catch (erro) {

        console.log(erro);

    }
    

});
