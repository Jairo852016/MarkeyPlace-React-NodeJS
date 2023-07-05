import React, { useEffect } from 'react';
import  { useState } from "react";
import { useParams } from 'react-router-dom';
import { apiUrl } from '../services/apirest';
import axios from 'axios';
import Header from '../template/Header';

const Editar = () => {
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    tipo: "",
    id:"",
    username:""
  });

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + `user/"${id}"`);
        console.log(response.data.body[0]);
        setForm({
          ...form,
          name: response.data.body[0].name,
          tipo:response.data.body[0].tipo,
          id:response.data.body[0].id,
          username:response.data.body[0].username
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const handleButtonUsertSubmit = () => {
    console.log(form);
    let url = apiUrl + 'user';
    const token = localStorage.getItem('token'); // Reemplaza con el token de autenticación que hayas obtenido
    
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      console.log(config);
    axios.put(url, form,config)
      .then(response => {
        console.log(response);
       
      })
      .catch(error => {
        console.log(error);
        setError(true);
        setErrorMsg("Error: al conectar con el servidor");
      });
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <React.Fragment>
      <Header/>
      <div className='container'>
        <h3>Editar usuario</h3>
      </div>
      <div className='container'>
        <br/>
        <form  className="form-horizontal" onSubmit={handleFormSubmit}>
          <div className="row">
            <div className="col-sm-12">
              <label  className="col-md-2 control-label">Nombre</label>
              <div className="col-md-10">
                <input type="text" className="from-control" name='name' placeholder='Nombre' value={form.name}
  onChange={handleInputChange} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <label  className="col-md-2 control-label">Tipo</label>
              <div className="col-md-10">
                <input type="text" className="from-control" name='tipo' placeholder='Tipo'  value={form.tipo} onChange={handleInputChange} /> 
              </div>
            </div>
          </div>
          <br/><br/>
          <button type='submit' className='btn btn-primary' style={{marginRight:"10px"}} onClick={handleButtonUsertSubmit}>Editar</button>
          
          <a className='btn btn-dark' href='/dashboard'>Salir</a>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Editar;
