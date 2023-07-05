const express=require('express');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');

const config= require('../config.js');
const user=require('./components/user/netwok');
const auth=require('./components/auth/network');


const errors=require('../network/errors');

const app=express();

app.use(bodyParser.json());

const swaggerDoc = require('./swagger.json');

// Middleware para configurar los encabezados CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });


//ROUTER

app.use('/api/user',user);
app.use('/api/auth',auth);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(errors);

app.listen(config.api.port,()=>{
    console.log('Api escuchando en el puerto', config.api.port);
});