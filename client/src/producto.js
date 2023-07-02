import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return <h1>Home</h1>;
}

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Contenido del Dashboard...</p>
    </div>
  );
}

function Sidebar() {
  return (
    <div>
      <h2>Menú Lateral</h2>
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
    </div>
  );
}

function PageWithSidebar() {
  return (
    <div>
      <Sidebar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageWithSidebar />} />
      </Routes>
    </Router>
  );
}

export default App;
