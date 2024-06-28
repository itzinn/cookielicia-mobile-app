const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite');

// Função para criar tabelas
function createTables() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )
    `);
  });
}

// Função para popular tabelas com dados iniciais, se necessário
function seedDatabase() {
  db.serialize(() => {
    const stmt = db.prepare(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`);
    stmt.run('admin','admin@example.com', 'password123');
    stmt.finalize();
  });
}

// Inicializar o banco de dados
db.serialize(() => {
  createTables();
  seedDatabase();
});

// Fechar a conexão com o banco de dados
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Conexão com o banco de dados fechada.');
});
