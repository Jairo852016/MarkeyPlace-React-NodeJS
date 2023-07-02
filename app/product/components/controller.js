const { nanoid } = require(`nanoid`);

const TABLA = 'productos';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/dummy');
    }

    function list() {
        return store.list(TABLA);
    }
    function get(id){
        return store.get(TABLA,id);
    }
    async function upsert(body,tipo) {
         const product = {
                nombre: body.nombre,
                cantidad: body.cantidad,
                precio:body.precio,
                user:tipo,
            }
    
            if (body.id) {
                product.id = body.id;
            } else {
                product.id = nanoid();
            }
           
    
        return store.upsert(TABLA, product);
       
        
    }

    function getUser (user) {
        	
		return store.getUser(TABLA , user);
	}

    return {
        list,
        get,
        upsert,
        getUser,
    };
}