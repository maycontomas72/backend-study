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
});

const atendimentoObj = {
    nome,
    wpp,
    placa,
    marca,
    modelo,
    ano,
    servico,
    valor,
    km,
    data
};

await fetch(
    'http://localhost:3000/atendimento',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(atendimentoObj)
    }
);