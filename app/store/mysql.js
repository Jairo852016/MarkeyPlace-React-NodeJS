const mysql=require('mysql');

const config=require('../config');
const { reject } = require('bcrypt/promises');
const dbconf={
    host:config.mysql.host,
    port:config.mysql.port,
    user:config.mysql.user,
    password:config.mysql.password,
    database:config.mysql.database,
};

//Coneccion
let connection;

function handleCon(){
    console.log(dbconf.host+' '+dbconf.port+' '+dbconf.user+ ' '+dbconf.password+' '+dbconf.database)
    connection=mysql.createConnection(dbconf);
    connection.connect((err)=>{
        if(err){
            console.error('[db err]', err);
            setTimeout(handleCon,2000);

        }else{
            console.log('DB conected!!!!')
        }
        
    });
    connection.on('error',err=>{
        console.error('[db err]', err);
        if(err.code==='PROTOCOL_CONNECTION_LOST'){
            handleCon();
        }else{
            throw err;
        }

    });

}
handleCon();

function list(table){
    return new Promise((resolve, reject)=>{
        connection.query(`Select * from ${table}`,(err,data)=>{
            if(err)return reject(err);
            resolve(data);
        })
    })
}

function get(table, id){
    return new Promise((resolve, reject)=>{
        connection.query(`Select * from ${table} where id=${id}`,(err,data)=>{
            if(err)return reject(err);
            resolve(data);
        })
    })
}
function getUser(table, user){
    return new Promise((resolve, reject)=>{
        connection.query(`Select * from ${table} where user=${user}`,(err,data)=>{
            if(err)return reject(err);
            resolve(data);
        })
    })
}

function insert(table, data){
    return new Promise((resolve, reject)=>{
        console.log(data);
        connection.query(`INSERT INTO ${table} SET ?`, data,(err,result)=>{
            if(err)return reject(err);
            resolve(result);
        })
    })
}

function update(table, data){
    return new Promise((resolve, reject)=>{
        connection.query(`UPDATE INTO ${table} SET ? WHERE id= ?`, [data,data.id],(err,result)=>{
            if(err)return reject(err);
            resolve(result);
        })
    })
}


// FUNCION PARA ACTUALIZAR MODIFICAR
// LA FUNCION  upsert VA VA A HACER LA DIFERENCIA QUE ENTRE UN INSERT Y UN UPDATE
// SI LA DATA TIENE IN data.id SERA UN UPDATE POR QUE ASI VIENEN DE
// ROUTER /api/components/user/network.js
const upsert = async (table, payload) =>
  new Promise((resolve, reject) => {
    console.log("DATA TO BE UPSERT: ", payload);
    connection.query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [payload, payload], (error, data) => {
        console.log("UPSERT DATA: ", data);
        console.log("UPDATE TABLE: ", table);
        if (error) {
            return reject(error);
        }
        resolve(data);
    });
  });

  // FUNCION ASINCRONA PARA SABER SI ESTA REGISTRADO EL USUARIO
// SE GUARDA LA LISTA PARA FILTRAR
function query(table, query,join) {
    let joinQuery = '';
    if (join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }
    return new Promise((resolve, reject) => {
        console.log("DATA TO BE QUERY: ", query);
        console.log("IN TABLE: ", table);
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, res) => {
            console.log('QUERY RESULT: ', res)
            if (err) return reject(err);
            result=JSON.stringify(res[0]);
            result=JSON.parse(result)   
            resolve(result || null);
            //resolve(res[0] || null);
        })
    })
}



module.exports={
    list,
    get,
    getUser,
    upsert,
    query,
}