import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import Profile from './screens/Profile';
<<<<<<< HEAD
import CartPage from './screens/CartPage';
import ProductPage from './screens/ProductPage';
=======
import OrderStatus from './screens/OrderStatus';import CartPage from './screens/CartPage';
>>>>>>> dd46b9eb60b6a0022ea287708f27341be03fd719


export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orderStatus" element={<OrderStatus />} />
          <Route path="/cartpage" element={<CartPage />} />
          <Route path="/productpage" element={<ProductPage />} />
        </Routes>
    
    </Router>
  );
}
