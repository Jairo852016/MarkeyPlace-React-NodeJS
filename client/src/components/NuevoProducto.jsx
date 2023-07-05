import React, { useEffect } from 'react';
import  { useState } from "react";
import { useParams } from 'react-router-dom';
import { apiUrlP } from '../services/apirest';
import axios from 'axios';
import Header from '../template/Header';

const NuevoProducto = () => {
  const { id } = useParams();

  const [form, setForm] = useState({
    nombre: "",
    cantidad: "",
    precio:""
  });

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }
  

  const handleButtonUsertSubmit = () => {
    console.log(form);
    let url = apiUrlP + `product/${id}`;
    axios.post(url, form)
      .then(response => {
        console.log(response);
       
      })
      .catch(error => {
        console.log(error);
        setError(true);
        setErrorMsg("Error: al conectar con el servidor");
      });
    //let url = apiUrl + 'user';
    //const token = localStorage.getItem('token'); // Reemplaza con el token de autenticación que hayas obtenido
    
    
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <React.Fragment>
      <Header/>
      <div className='container'>
        <h3>Nuevo Producto</h3>
      </div>
      <div className='container'>
        <br/>
        <form  className="form-horizontal" onSubmit={handleFormSubmit}>
          <div className="row">
            <div className="col-sm-12">
              <label  className="col-md-2 control-label">Nombre</label>
              <div className="col-md-10">
                <input type="text" className="from-control" name='nombre' placeholder='Nombre' value={form.nombre}
                  onChange={handleInputChange} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <label  className="col-md-2 control-label">Cantidad</label>
              <div className="col-md-10">
                <input type="text" className="from-control" name='cantidad' placeholder='Cantidad'  value={form.cantidad} onChange={handleInputChange} /> 
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <label  className="col-md-2 control-label">Precio</label>
              <div className="col-md-10">
                <input type="text" className="from-control" name='precio' placeholder='Precio'  value={form.precio} onChange={handleInputChange} /> 
              </div>
            </div>
          </div>
          <br/><br/>
          <button type='submit' className='btn btn-primary' style={{marginRight:"10px"}} onClick={handleButtonUsertSubmit}>Nuevo</button>
          
          <a className='btn btn-dark' href='/dashboard'>Salir</a>
        </form>
      </div>
    </React.Fragment>
  );
};

export default NuevoProducto;
