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


app.post('/add-to-cart', (req, res) => {
  const { productId } = req.body;

  // Inicializa o carrinho na sessão se não existir
  if (!req.session.cart) {
    req.session.cart = [];
  }

  // Verifica se o item já existe no carrinho
  const itemIndex = req.session.cart.findIndex(item => item.productId === productId);
  if (itemIndex > -1) {
    // Se o item já existe, incrementa a quantidade
    req.session.cart[itemIndex].quantity += 1;
  } else {
    // Se o item não existe, adiciona-o com quantidade 1
    req.session.cart.push({ productId, quantity: 1 });
  }

  res.json({ message: 'Produto adicionado ao carrinho', cart: req.session.cart });
});

// Obter itens do carrinho
app.get('/cart', (req, res) => {
  res.json(req.session.cart || []);
});

app.get('/cart-details', (req, res) => {
  if (!req.session.cart || req.session.cart.length === 0) {
    return res.json([]);
  }

  const productIds = req.session.cart.map(item => item.productId);
  const sql = `SELECT * FROM cookies WHERE id IN (${productIds.map(() => '?').join(',')})`;

  db.all(sql, productIds, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Map each row to include quantity from session cart
    const cartDetails = rows.map(row => {
      const cartItem = req.session.cart.find(item => item.productId === row.id);
      return { ...row, quantity: cartItem.quantity };
    });

    res.json(cartDetails);
  });
});

app.post('/increment-quantity', (req, res) => {
  const { productId } = req.body;

  if (!req.session.cart) {
    return res.status(400).json({ message: 'Carrinho não encontrado' });
  }

  const itemIndex = req.session.cart.findIndex(item => item.productId === productId);
  if (itemIndex > -1) {
    req.session.cart[itemIndex].quantity += 1;
    res.json({ message: 'Quantidade incrementada', cart: req.session.cart });
  } else {
    res.status(404).json({ message: 'Produto não encontrado no carrinho' });
  }
});

app.post('/decrement-quantity', (req, res) => {
  const { productId } = req.body;

  if (!req.session.cart) {
    return res.status(400).json({ message: 'Carrinho não encontrado' });
  }

  const itemIndex = req.session.cart.findIndex(item => item.productId === productId);
  if (itemIndex > -1) {
    if (req.session.cart[itemIndex].quantity > 1) {
      req.session.cart[itemIndex].quantity -= 1;
      res.json({ message: 'Quantidade decrementada', cart: req.session.cart });
    } else {
      res.status(400).json({ message: 'Quantidade mínima atingida' });
    }
  } else {
    res.status(404).json({ message: 'Produto não encontrado no carrinho' });
  }
});

// Remove item endpoint
app.post('/remove-item', (req, res) => {
  const { productId } = req.body;

  if (!req.session.cart) {
    return res.status(400).json({ message: 'Cart not found' });
  }

  // Convert productId to number if necessary
  const productIdNumber = Number(productId);

  const originalLength = req.session.cart.length;

  req.session.cart = req.session.cart.filter(item => item.productId !== productIdNumber);

  if (req.session.cart.length === originalLength) {
    return res.status(404).json({ message: 'Product not found in cart' });
  }

  res.json({ message: 'Item removed from cart', cart: req.session.cart });
});

// Rota para atualizar o endereço do usuário
app.post('/update-address', (req, res) => {
  const { address } = req.body;
  const user = req.session.user; // Obter informações do usuário da sessão

  if (!user) {
    return res.status(401).json({ message: 'Usuário não autenticado' });
  }

  const query = `UPDATE users SET address = ? WHERE id = ?`;

  db.run(query, [address, user.id], function(err) {
    if (err) {
      console.error('Erro ao atualizar o endereço:', err);
      return res.status(500).json({ message: 'Erro ao atualizar o endereço' });
    }

    res.json({ message: 'Endereço atualizado com sucesso' });
  });
});

app.get('/user-address', (req, res) => {
  const user = req.session.user;

  if (!user) {
    return res.status(401).json({ message: 'Usuário não autenticado' });
  }

  db.get('SELECT address FROM users WHERE id = ?', [user.id], (err, row) => {
    if (err) {
      console.error('Erro ao buscar os detalhes do usuário:', err);
      return res.status(500).json({ message: 'Erro ao buscar os detalhes do usuário' });
    }

    if (row) {
      res.json({ address: row.address });
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  });
});

// Complete Order Route
app.post('/complete-order', (req, res) => {
  const { deliveryMethod, address, cartItems, totalAmount } = req.body;
  const userId = req.session.user.id;

  db.run(`
    INSERT INTO orders (user_id, total_amount, delivery_method, address)
    VALUES (?, ?, ?, ?)
  `, [userId, totalAmount, deliveryMethod, deliveryMethod === 'Retirada' ? null : address], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Erro ao criar pedido', error: err.message });
    }

    const orderId = this.lastID;
    const orderItems = cartItems.map(item => [orderId, item.id, item.quantity, parseFloat(item.newPrice.replace('R$', '').replace(',', '.'))]);

    const placeholders = orderItems.map(() => '(?, ?, ?, ?)').join(',');
    const flatValues = orderItems.reduce((acc, item) => acc.concat(item), []);

    db.run(`
      INSERT INTO order_items (order_id, cookie_id, quantity, price)
      VALUES ${placeholders}
    `, flatValues, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao criar itens do pedido', error: err.message });
      }

      res.json({ message: 'Pedido criado com sucesso', orderId });
    });
  });
});

// Rota para buscar detalhes do pedido
app.get('/order-details', async (req, res) => {
  const user = req.session.user;
  const orderId = req.query.orderId;

  if (!user) {
    return res.status(401).json({ message: 'Usuário não autenticado' });
  }

  if (!orderId) {
    return res.status(400).json({ message: 'ID do pedido não fornecido' });
  }

  try {
    const orderQuery = `
      SELECT orders.id, orders.total_amount, orders.delivery_method, orders.address, orders.created_at,
             order_items.id AS item_id, order_items.cookie_id, order_items.quantity, order_items.price, cookies.title
      FROM orders
      JOIN order_items ON orders.id = order_items.order_id
      JOIN cookies ON order_items.cookie_id = cookies.id
      WHERE orders.id = ? AND orders.user_id = ?
    `;
    db.all(orderQuery, [orderId, user.id], (err, rows) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao buscar detalhes do pedido' });
      }

      if (rows.length === 0) {
        return res.status(404).json({ message: 'Pedido não encontrado' });
      }

      const order = {
        id: rows[0].id,
        total_amount: rows[0].total_amount,
        delivery_method: rows[0].delivery_method,
        address: rows[0].address,
        created_at: rows[0].created_at,
        items: rows.map(row => ({
          id: row.item_id,
          cookie_id: row.cookie_id,
          quantity: row.quantity,
          price: row.price,
          title: row.title
        }))
      };

      res.json(order);
    });
  } catch (error) {
    console.error('Erro ao buscar detalhes do pedido:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Clear Cart Route
app.post('/clear-cart', (req, res) => {
  req.session.cart = [];
  res.json({ message: 'Carrinho limpo com sucesso' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
