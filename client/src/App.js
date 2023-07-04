import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';




Modal.setAppElement('#root');


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

function AdminPanel() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Realizar la solicitud GET al servidor para obtener todos los productos
    axios.get('http://localhost:3002/api/product/')
      .then(response => {
        console.log(response.data);
        // Actualizar el estado con los productos obtenidos
        setProductos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
        // Manejar el error según tu necesidad
      });
  }, []);
  return (
    <div>
      <h1>Panel de Administrador</h1>
      <p>Contenido del Panel de Administrador...</p>

      <h2>Listado de Productos</h2>
      <ul>
        {productos.map(producto => (
          <li key={producto.id}>{producto.nombre}</li>
        ))}
      </ul>
    </div>
  );
}

function Menu({ tipo }) {

  const isLoggedIn = useSelector((state) => state.isLoggedIn); // Obtener el estado de isLoggedIn desde el store (usando Redux)

  if (!isLoggedIn) {
    return null; // No mostrar el menú si el usuario no ha iniciado sesión
  }
  return (
    <div>
      <h2>Menú</h2>
      <ul>
        <li>
          <a href="/">Inicio</a>
        </li>
        <li>
          <a href="/dashboard">Dashboard</a>
        </li>
        {tipo === 'Admin' && (
          <li>
            <a href="/admin">Panel de Administrador</a>
          </li>
        )}
      </ul>
    </div>
  );
}

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setEmail] = useState('');
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerType, setRegisterType] = useState('');
  const [token, setToken] = useState('');
  const [tipo, setTipo] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //const history = useHistory();

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRegisterModalOpen = () => {
    setRegisterModalOpen(true);
  };

  const handleRegisterModalClose = () => {
    setRegisterModalOpen(false);
  };

  const handleRegisterUsernameChange = (e) => {
    setRegisterUsername(e.target.value);
  };

  const handleRegisterPasswordChange = (e) => {
    setRegisterPassword(e.target.value);
  };

  const handleRegisterNameChange = (e) => {
    setRegisterName(e.target.value);
  };
  const handleRegisterTypeChange = (e) => {
    setRegisterType(e.target.value);
  };

  function validarEmail(username) {
    // Expresión regular para validar el formato de una dirección de correo electrónico
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Verificar si el email cumple con el formato válido
    return regexEmail.test(username);
  }
  
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes realizar la lógica de autenticación para iniciar sesión
    // Puedes usar los valores de `username` y `password`
    if (!validarEmail(username)) {
      console.log('Email no válido');
      return;
    }

    // Por ejemplo, imprimir los valores en la consola

    console.log('Usuario:', username);
    console.log('Contraseña:', password);

    // Luego, puedes realizar cualquier acción adicional según tu necesidad, como redireccionar o mostrar mensajes al usuario
    
 
     // Realizar la solicitud de registro al servidor
     axios.post('http://localhost:3000/api/auth/login', {
       username: username,
       password: password,
       })
       .then(response => {
         console.log('login', response.data.body.token);
         console.log('tipo', response.data.body.tipo);
         // Realizar cualquier acción adicional según tu necesidad
         // Por ejemplo, redireccionar al usuario a otra página
         if (response.status === 200) {
          const { token } = response.data.body.token;
          const { tipo } = response.data.body.tipo;
          // Guardar el token en el estado
          setToken(token);
          setTipo(tipo);
          setIsLoggedIn(true); // Establecer la variable isLoggedIn en true
          // Navegar a la nueva pantalla
          //history.push('/producto');
          return <Navigate to="/producto" />;
          //history.push('/nueva-pantalla');
        } else {
          // Mostrar un mensaje de error o realizar alguna acción en caso de fallo en el inicio de sesión
          console.log('tiene problemas con el login');
          
        }
       })
       .catch(error => {
         console.error('Error de registro:', error);
         // Manejar el error de registro según tu necesidad
       });
       
    // Cerrar el modal
    handleModalClose();
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes realizar la lógica de registro de usuario
    // Puedes usar los valores de `registerUsername`, `registerPassword` y `registerEmail`
    if (!validarEmail(registerUsername)) {
      alert('Email no válido');
      return;
    }
    // Por ejemplo, imprimir los valores en la consola
    console.log('Nuevo Usuario:', registerUsername);
    console.log('Contraseña:', registerPassword);
    console.log('Name:', registerName);

    // Realizar la solicitud de registro al servidor
    axios.post('http://localhost:3000/api/user', {
      username: registerUsername,
      password: registerPassword,
      name: registerName,
      tipo:registerType,
    })
      .then(response => {
        alert('Registro exitoso',response.data);
        // Realizar cualquier acción adicional según tu necesidad
        // Por ejemplo, redireccionar al usuario a otra página
      })
      .catch(error => {
        console.error('Error de registro:', error);
        // Manejar el error de registro según tu necesidad
      });

    // Cerrar el modalº
    handleRegisterModalClose();
  };

  return (
    
    <div className="container">
      <h1>Market Place PROO</h1>
      <div className="buttons-container">
        <button onClick={handleModalOpen}>Iniciar sesión</button>
        <button onClick={handleRegisterModalOpen}>Registrarse</button>
      </div>

      <Modal
        className="modal"
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Inicio de Sesión"
      >

        <h2 className="modal-heading">Inicio de Sesión</h2>
        <form onSubmit={handleLoginSubmit} className="form">
          <div className="form-group">
            <label className="label" htmlFor="username">Usuario:</label>
            <input  className="input" type="text" id="username" value={username} onChange={handleUsernameChange} />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="password">Contraseña:</label>
            <input  className="input" type="password" id="password" value={password} onChange={handlePasswordChange} />
          </div>
          <button className="button" type="submit">Iniciar sesión</button>
        </form>
       
      </Modal>

      <Modal
        className="modal"
        isOpen={registerModalOpen}
        onRequestClose={handleRegisterModalClose}
        contentLabel="Modal de Registro"
      >
        <h2 className="modal-heading">Registro Usuario</h2>
        <form onSubmit={handleRegisterSubmit} className="form">
          <div className="form-group"> 
            <label className="label" htmlFor="registerUsername">Usuario:</label>
            <input type="text" id="registerUsername" value={registerUsername} onChange={handleRegisterUsernameChange} />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="registerPassword">Contraseña:</label>
            <input type="password" id="registerPassword" value={registerPassword} onChange={handleRegisterPasswordChange} />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="registerName">Name:</label>
            <input type="text" id="registerNAme" value={registerName} onChange={handleRegisterNameChange} />
          </div>
          <div className="form-group">
        <label className="label" htmlFor="registerType">Tipo:</label>
       
        <select id="registerType" value={registerType} onChange={handleRegisterTypeChange}>
        <option value="">Seleccionar opción</option>
        <option value="Admin">Administrador</option>
        <option value="Vendedor">Vendedor</option>
        <option value="Comprador">Comprador</option>
      </select>
      </div>
          <button className="button" type="submit">Registrarse</button>
        </form>
       
      </Modal>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
