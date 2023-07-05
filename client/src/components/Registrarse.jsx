import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../assetss/css/Login.css';
import Logo from '../assetss/img/icon.png';
import { apiUrl } from "../services/apirest";
import axios from 'axios';

const Registarse = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    name:"",
    tipo:""
  });

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let url = apiUrl + 'user';
    axios.post(url, form)
      .then(response => {
        console.log(response);
        if (!response.data.error) {
          //localStorage.setItem('token', response.data.body.token);
          //localStorage.setItem('tipo', response.data.body.tipo);
          //navigate('/dashboard', { replace: true });
          alert('Registro exitoso',response.data);
          navigate('/', { replace: true });
        } else {
          setError(true);
          setErrorMsg(response.data.status);
        }
      })
      .catch(error => {
        console.log(error);
        setError(true);
        setErrorMsg("Error: al conectar con el servidor");
      });
  }

  return (
    <React.Fragment>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            <br /><br />
            <img src={Logo} width="100px" alt="User Icon" />
            <br /><br />
          </div>
          <form onSubmit={handleFormSubmit}>
            <input type="text" className="fadeIn second" name="username" placeholder="EMAIL" onChange={handleInputChange} />
            <input type="password" className="fadeIn third" name="password" placeholder="Password" onChange={handleInputChange} />
            <input type="text" className="fadeIn second" name="name" placeholder="Nombre" onChange={handleInputChange} />
            <input type="text" className="fadeIn second" name="tipo" placeholder="Tipo" onChange={handleInputChange} />
            <input type="submit" className="fadeIn fourth" value="Registrar" />
          </form>
          {error === true &&
            <div className="alert alert-danger" role="alert">
              {errorMsg}
            </div>
          }
        </div>
      </div>
    </React.Fragment>
  );
}

export default Registarse;
