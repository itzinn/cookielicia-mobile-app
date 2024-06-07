import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './screens/Login';


export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
    
    </Router>
  );
}
