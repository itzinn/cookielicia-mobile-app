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

  // Create Cookies table if it doesn't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS cookies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      oldPrice TEXT NOT NULL,
      newPrice TEXT NOT NULL
    )
  `);
}

// Função para popular tabelas com dados iniciais, se necessário
function seedDatabase() {
  db.serialize(() => {
    // const stmt = db.prepare(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`);
    // stmt.run('admin','admin@example.com', 'password123');
    // stmt.finalize();

    // Inserir dados na tabela cookies
    const cookieStmt = db.prepare(`INSERT INTO cookies (title, oldPrice, newPrice) VALUES (?, ?, ?)`);
    cookieStmt.run('Cookie de Chocolate', 'R$ 12,00', 'R$ 8,00');
    cookieStmt.run('Cookie de Baunilha', 'R$ 10,00', 'R$ 7,00');
    cookieStmt.run('Cookie de Aveia', 'R$ 8,00', 'R$ 5,00');
    cookieStmt.finalize();
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
