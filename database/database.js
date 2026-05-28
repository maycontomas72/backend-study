const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/banco.db');

db.serialize(() => {

   db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      wpp TEXT,
      carro TEXT,
      placa TEXT,
      ultimaVisita TEXT
    )
  `);

});

module.exports = db; 