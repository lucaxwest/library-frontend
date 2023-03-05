import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import App from './App';
import Cliente from './Cliente'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarFix from './Navbar';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavbarFix />

    <BrowserRouter>
      <Routes>
        <Route key="aluguel" path="/aluguel" element={<App />}/>
        <Route key="cliente" path="/cliente" element={<Cliente />}/>
      </Routes>
    </BrowserRouter>

  </React.StrictMode>
);