
window.carregarDashboard = async function() {

    const respostaClientes =
        await fetch('http://localhost:3000/contagem/clientes');

    const clientes =
        await respostaClientes.json();

    const respostaCarros =
        await fetch('http://localhost:3000/contagem/carros');

    const carros =
        await respostaCarros.json();

    const respostaServicos =
        await fetch('http://localhost:3000/contagem/servicos');

    const servicos =
        await respostaServicos.json();

    document.getElementById('dashboard').innerHTML = `

<div class="dashboard-container">

    <div class="dashboard-card">
        <h3>👤 Clientes</h3>
        <p>${clientes.total}</p>
    </div>

    <div class="dashboard-card">
        <h3>🚗 Veículos</h3>
        <p>${carros.total}</p>
    </div>

    <div class="dashboard-card">
        <h3>🔧 Serviços</h3>
        <p>${servicos.total}</p>
    </div>

</div>

`;
}

carregarDashboard();

const botaoFiltrar =
    document.getElementById('filtrar');

botaoFiltrar.addEventListener('click', async () => {

    const dataInicial =
        document.getElementById('dataInicial').value;

    const dataFinal =
        document.getElementById('dataFinal').value;

   const resposta = await fetch(
    'http://localhost:3000/servicos/periodo',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            dataInicial,
            dataFinal
        })
    }
);

const dados = await resposta.json();

console.log(dados);

let total = 0;

for(const servico of dados){
    total += Number(servico.valor);
}

resultado.innerHTML = `
    <h3>Total de serviços: ${dados.length}</h3>
`;


for(const servico of dados){

    resultado.innerHTML += `
        <div class="card">
            <p>${servico.servico}</p>
            <p>${servico.valor}</p>
            <p>${servico.data}</p>
        </div>
    `;
}
});
