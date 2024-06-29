import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import Profile from './screens/Profile';
import CartPage from './screens/CartPage';
import ProductPage from './screens/ProductPage';


export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cartpage" element={<CartPage />} />
          <Route path="/productpage" element={<ProductPage />} />
        </Routes>
    
    </Router>
  );
}
