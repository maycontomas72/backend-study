const request = require('supertest');
const app = require('../app');

test('cria um cliente novo', async () => {
    const resultado = await request(app)
    .post('/clientes')
    .send({ nome : 'Joao teste', wpp : 54991999999});

    expect(resultado.status).toBe(201);
});

test('cria um atendimento novo', async () => {
    const resultado = await request(app)
    .post('/atendimento')
    .send({ nome : 'atendimento teste', wpp : "54999111111", placa : 'XXX1919', marca : 'vw teste', modelo : 'gol teste', 
        ano : 1998, servico : "novo teste", valor : '1', km : 999, data : "2026-07-09"});

    expect(resultado.status).toBe(201);
})