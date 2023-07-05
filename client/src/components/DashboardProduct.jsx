import React, { useEffect } from 'react';
import Header from '../template/Header';
import { useNavigate } from 'react-router-dom';
import { apiUrlP } from '../services/apirest';
import axios from 'axios';

const DashboardProduct = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = React.useState([]);

  const clickUser = (id) => {
    navigate(`/editar/${id}`, { replace: true });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrlP + 'product');
        setProductos(response.data.body);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Precio</th>
              <th scope="col">Usuario</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((value, index) => {
              return (
                <tr key={index} >
                  <td>{value.id}</td>
                  <td>{value.nombre}</td>
                  <td>{value.cantidad}</td>
                  <td>{value.precio}</td>
                  <td>{value.user}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default DashboardProduct;
