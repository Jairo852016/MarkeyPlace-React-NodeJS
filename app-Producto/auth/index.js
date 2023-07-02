const jwt=require('jsonwebtoken');

const config=require('../config');
const error=require('../utils/error');
const secret=config.jwt.secret;

function sign(data){
    return jwt.sign(data,secret);
    //let jsonData = JSON.parse(JSON.stringify(data));
    //return jwt.sign(jsonData, secret);

}

function verify(token){
    return jwt.verify(token,secret)
}

const check={
    own:function(req, owner){
        const decoded= decodeHeader(req);
        //console.log('++++++');
        console.log(decoded);
        
        if (decoded.id !== owner) {
            //throw new Error('No puedes hacer esto');
            throw error ('No puedes hacer esto',401);

        }
    },
    logged:function(req, owner){
        const decoded= decodeHeader(req);
       
    },
}

function getToken(auth){
    if(!auth){
        
        throw error ('No hay token',401);
    }
    if(auth.indexOf('Bearer ')===-1){
        throw error ('Formato invalido',401);
      
    }
    let token=auth.replace('Bearer ','');
    return token
}


function decodeHeader(req){

    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports ={
    sign,
    check,
};