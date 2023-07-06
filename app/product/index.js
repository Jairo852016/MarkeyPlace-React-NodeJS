const express=require('express');
const bodyParser = require('body-parser');

const config= require('../config.js');
const product=require('./components/network');

const errors=require('../network/errors');

const app=express();

app.use(bodyParser.json());



//ROUTER

app.use('/api/product',product);


app.use(errors);

app.listen(config.product.port,()=>{
    console.log('Servicio product escuchando en el puerto', config.product.port);
});