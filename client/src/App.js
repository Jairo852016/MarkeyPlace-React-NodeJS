import React from 'react';
import './assetss/css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/DashboardAdmin';
import DashboardProduct from './components/DashboardProduct';
import Nuevo from './components/NuevoProducto';
import Editar from './components/Editar';
import Registrarse from './components/Registrarse';
function App() {
  return (
    <Router>
      <div className="container">
        <h1>Market Place PROO</h1>
        <div className="buttons-container">
          <Link to="/login">
            <button>Iniciar sesión</button>
          </Link>
          <Link to="/registrar">
          <button>Registrarse</button>
          </Link>
          <Link to="/dashboard">
            <button>Lista de usuarios</button>
          </Link>
          <Link to="/dashboardproducto">
          <button>Lista productos</button>
          </Link>
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Registrarse />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboardproducto" element={<DashboardProduct />} />
          <Route path="/nuevo/:id" element={<Nuevo />} />
          <Route path="/editar/:id" element={<Editar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
