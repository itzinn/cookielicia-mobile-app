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
        password TEXT NOT NULL,
        address TEXT
      )
    `);
  });

  // Create Cookies table if it doesn't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS cookies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      oldPrice TEXT NOT NULL,
      newPrice TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      total_amount REAL NOT NULL,
      delivery_method TEXT NOT NULL,
      address TEXT,
      created_at TIMESTAMP DEFAULT (datetime(CURRENT_TIMESTAMP, '-3 hours')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      cookie_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (cookie_id) REFERENCES cookies(id)
    )
  `);
}

// Função para popular tabelas com dados iniciais, se necessário
function seedDatabase() {
  db.serialize(() => {
    const stmt = db.prepare(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`);
    stmt.run('admin','admin@example.com', 'password123');
    stmt.finalize();

    // Inserir dados na tabela cookies
    const cookieStmt = db.prepare(`INSERT INTO cookies (title, description, oldPrice, newPrice) VALUES (?, ?, ?, ?)`);
    cookieStmt.run('Cookie de Chocolate', 'Delicioso cookie de chocolate com pedaços irresistíveis de chocolate derretido', 'R$ 12,00', 'R$ 8,00');
    cookieStmt.run('Cookie de Baunilha', 'Saboroso cookie de baunilha, suave e aromático, perfeito para qualquer ocasião', 'R$ 10,00', 'R$ 7,00');
    cookieStmt.run('Cookie de Aveia', 'Saudável cookie de aveia, crocante e cheio de sabor, com um toque de mel', 'R$ 8,00', 'R$ 5,00');
    cookieStmt.run('Cookie de Amendoim', 'Crocante cookie de amendoim, rico em sabor e textura, com pedaços de amendoim torrado', 'R$ 11,00', 'R$ 7,50');
    cookieStmt.run('Cookie de Limão', 'Refrescante cookie de limão, com um toque cítrico e uma crocância perfeita', 'R$ 9,00', 'R$ 6,50');
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
