const botaoBuscar = document.getElementById('buscar');

botaoBuscar.addEventListener('click', async () => {

    const placa = document.getElementById('placaBusca').value;  

    try {

        const resposta = await fetch(
            `http://localhost:3000/carros/historico/${placa}`
        );

        const dados = await resposta.json();

        const resultado = document.getElementById('resultado');

        let listaServicos = '';

        for (let servico of dados.servicos) {

             console.log(servico);

            listaServicos += `
    <div class="card">
        <p><strong>Serviço:</strong> ${servico.servico}</p>
        <p><strong>Valor:</strong> R$ ${servico.valor}</p>
        <p><strong>KM:</strong> ${servico.km}</p>
        <p><strong>Data:</strong> ${servico.data}</p>
    </div>
`;
        }

        resultado.innerHTML = `
    <div class="card">
        <h2>Cliente</h2>
        <p><strong>Nome:</strong> ${dados.cliente.nome}</p>
        <p><strong>WhatsApp:</strong> ${dados.cliente.wpp}</p>
    </div>

    <div class="card">
        <h2>Veículo</h2>
        <p><strong>Placa:</strong> ${dados.carro.placa}</p>
        <p><strong>Marca:</strong> ${dados.carro.marca}</p>
        <p><strong>Modelo:</strong> ${dados.carro.modelo}</p>
        <p><strong>Ano:</strong> ${dados.carro.ano}</p>
    </div>

    <div class="card">
        <h2>Histórico de Serviços</h2>
        ${listaServicos}

         <button id="excluirUltimo">
    🗑 Excluir último serviço
</button>


    </div>
`;

const botaoExcluir = document.getElementById('excluirUltimo');

botaoExcluir.addEventListener('click', async () => {

    

    const resposta = await fetch(
        `http://localhost:3000/servicos/ultimo/${placa}`,
        {
            method: 'DELETE'
        }
    );

    const mensagem = await resposta.text();

    alert(mensagem);

    await carregarDashboard();

    botaoBuscar.click();

});

    } catch (erro) {

        console.log(erro);

    }

});