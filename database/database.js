const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./banco.db');

db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      produto TEXT,
      preco REAL
    )
  `);

});

module.exports = db;