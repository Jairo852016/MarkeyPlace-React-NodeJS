
//const store=require('../../../store/dummy')
const { nanoid } = require(`nanoid`);
//import { nanoid } from "nanoid";
const auth=require('../auth')

const TABLA='user'

//function list(){
//    return store.list(TABLA);
//}

module.exports= function(injectedStore){
    let store=injectedStore;
 
    if (!store){
        store=require('../../../store/dummy')
    }
    
    async function list() {
        return store.list(TABLA);
    }
    function get(id){
        return store.get(TABLA,id);
    }
    async function upsert(body) {
        if (validateEmail(body.username)) {
            const user = {
                name: body.name,
                username: body.username,
                tipo:body.tipo,
            }
    
            if (body.id) {
                user.id = body.id;
            } else {
                user.id = nanoid();
            }
            if (body.password||body.username){
                await auth.upsert({
                    id:user.id,
                    username:body.username,
                    password:body.password,
                    tipo:body.tipo,
                })
            }
    
            return store.upsert(TABLA, user);
        } else {
            //console.log("El correo electrónico no es válido.");
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
        list,
        get,
        upsert,

    }
}
