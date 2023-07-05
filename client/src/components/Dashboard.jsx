import React, { useEffect } from 'react';
import Header from '../template/Header';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../services/apirest';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = React.useState([]);

  const clickUser = (id) => {
    navigate(`/editar/${id}`, { replace: true });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + 'user');
        setUsuarios(response.data.body);
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
              <th scope="col">Email</th>
              <th scope="col">Tipo</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((value, index) => {
              return (
                <tr key={index} onClick={() => clickUser(value.id)}>
                  <td>{value.id}</td>
                  <td>{value.name}</td>
                  <td>{value.username}</td>
                  <td>{value.tipo}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
