const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); // Import the cors package

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for the specified origin
const corsOptions = {
  origin: 'http://localhost:8081',
  optionsSuccessStatus: 200
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
});

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
  
  // Check if all fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  // Insert the new user into the database
  db.run(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password],
    function (err) {
      if (err) {
        // Check if the error is because the email is already taken
        if (err.code === 'SQLITE_CONSTRAINT') {
          return res.status(409).json({ message: 'Email já está em uso' });
        }
        return res.status(500).json({ message: 'Erro no servidor' });
      }
      res.status(201).json({ message: 'Usuário registrado com sucesso' });
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
