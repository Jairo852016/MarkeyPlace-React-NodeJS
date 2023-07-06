const express=require('express');
const bodyParser = require('body-parser');

const config= require('../config.js');
const product=require('./components/network');

const errors=require('../network/errors');

const app=express();
// Middleware para configurar los encabezados CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
app.use(bodyParser.json());



//ROUTER

app.use('/api/product',product);


app.use(errors);

app.listen(config.product.port,()=>{
    console.log('Servicio product escuchando en el puerto', config.product.port);
});