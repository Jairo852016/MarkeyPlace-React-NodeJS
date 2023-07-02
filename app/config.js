module.exports={
    remoteDB: process.env.REMOTE_DB || false,
    api:{
        port: process.env.API_PORT || 3000,
    },
    product:{
        port: process.env.PRODUCT_PORT || 3002,
    },
    jwt:{
        secret:process.env.JWT_SECRET || 'notasecret!',
    },
    mysql:{
        host: process.env.MYSQL_HOST || 'localhost',
        port: process.env.MYSQL_PORT || '3310',
        user: process.env.MYSQL_USER || 'prueba',
        password: process.env.MYSQL_PASS || 'Vale2016',
        database: process.env.MYSQL_DB || 'prueba',
    },
    mysqlService:{
        host: process.env.MYSQL_SRV_HOST || 'Localhost',
        port: process.env.MYSQL_SRV_PORT || 3001,
    }
}