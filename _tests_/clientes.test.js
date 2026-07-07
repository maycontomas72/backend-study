const request = require('supertest');
const app = require('../app');

test('cria um cliente novo', async () => {
    const resultado = await request(app)
    .post('/clientes')
    .send({ nome : 'Joao teste', wpp : 54991999999});

    expect(resultado.status).toBe(201);
});