const bcrypt=require('bcrypt');

const auth=require('../../../auth');
const TABLA='auth';

module.exports= function(injectedStore){
    let store=injectedStore;
    if (!store){
        store=require('../../../store/mysql')
    }

    async function login(username, password){
        const join = {}
        join['user'] = 'id'; // { user: 'id' }
        const data= await store.query(TABLA,{username:username},join);
        //console.log(data.password+'  '+password)
        return bcrypt.compare(password,data.password)
            .then(sonIguales=>{
                if(sonIguales=== true){
                    //Generar token
                    const resp={
                        token:auth.sign(data),
                        tipo:data.tipo,
                    };
                    return resp;
                }else{
                    throw new Error('Informacion Invalida');
                }
            })
      

    }
    async function upsert(data){
        if (validateEmail(data.username)) {
            const authData={
                id:data.id,
            }
            //console.log('log in controller auth ' + data.id);
            if (data.username){
                
                authData.username=data.username;
            }
            if (data.password){
                authData.password=await bcrypt.hash(data.password,5);
            }
            return  store.upsert(TABLA,authData)
        } else {
            throw new Error('El correo electrónico no es válido');
        }
        
    }

    function validateEmail(email) {
        // Expresión regular para validar el formato del correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Verificar si el correo electrónico coincide con la expresión regular
        return emailRegex.test(email);
      }

    return{
        login,
        upsert,
    };
};