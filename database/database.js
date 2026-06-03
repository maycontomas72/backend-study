const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/banco.db');

db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      wpp TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS servicos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clienteId INTEGER,
      servico TEXT,
      valor REAL,
      km INTEGER,
      data TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS carros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    clienteId INTEGER,
    placa TEXT,
    marca TEXT,
    modelo TEXT,
    ano INTEGER
    )
  `)
});

module.exports = db; 