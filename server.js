const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const session = require('express-session'); // Import express-session

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for the specified origin
const corsOptions = {
  origin: 'http://localhost:8081',
  methods: ['GET', 'POST'],
  credentials: true, // Isso permite que cookies sejam incluídos
};

app.use(cors(corsOptions));

// Initialize SQLite database
const db = new sqlite3.Database('./database.sqlite');

// Create Users table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);

  // Create Cookies table if it doesn't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS cookies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      oldPrice TEXT NOT NULL,
      newPrice TEXT NOT NULL
    )
  `);
});

// Configure session middleware
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Use secure: true in production
}));

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, row) => {
      if (err) {
        res.status(500).json({ message: 'Erro no servidor' });
      } else if (row) {
        // Save user info in the session
        req.session.user = { username: row.username, id: row.id, email: row.email };
        res.json({ message: 'Login bem-sucedido' });
      } else {
        res.status(401).json({ message: 'Credenciais inválidas' });
      }
    }
  );
});

// Register endpoint
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  db.run(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password],
    function (err) {
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT') {
          return res.status(409).json({ message: 'Email já está em uso' });
        }
        return res.status(500).json({ message: 'Erro no servidor' });
      }
      res.status(201).json({ message: 'Usuário registrado com sucesso' });
    }
  );
});

// Exemplo de rota protegida no back-end
app.get('/home', (req, res) => {
  if (req.session.user) {
    res.status(200).json({ message: 'Usuário autenticado' });
  } else {
    res.status(401).json({ message: 'Não autorizado' });
  }
});

// Endpoint para buscar todos os cookies
app.get('/cookies', (req, res) => {
  db.all('SELECT * FROM cookies', (err, rows) => {
    if (err) {
      res.status(500).json({ message: 'Erro no servidor' });
    } else {
      res.json(rows);
    }
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
