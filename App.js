import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import CartPage from './screens/CartPage';
import OrderStatus from './screens/OrderStatus';


export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/orderStatus" element={<OrderStatus />} />
          <Route path="/cartpage" element={<CartPage />} />
        </Routes>
    
    </Router>
  );
}
