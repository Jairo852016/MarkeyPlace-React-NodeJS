const express=require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');

const config= require('../config.js');
const user=require('./components/user/netwok');
const auth=require('./components/auth/network');


const errors=require('../network/errors');

const app=express();

app.use(cors({
  origin: 'http://159.223.98.208:8080',
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization'
}));


app.use(bodyParser.json());

const swaggerDoc = require('./swagger.json');




//ROUTER

app.use('/api/user',user);
app.use('/api/auth',auth);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));




app.use(errors);

app.listen(config.api.port,()=>{
    console.log('Api escuchando en el puerto', config.api.port);
});