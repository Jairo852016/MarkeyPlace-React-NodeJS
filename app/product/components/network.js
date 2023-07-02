const express = require('express');

const response = require('../../network/response');
const Controller = require('./index');

const router = express.Router();

// Routes
router.get('/', list);
router.get('/:id', get);
router.get('/user/:user', getUser);
router.get('/', get);
router.post('/:id', upsert);

// functions
function list(req, res, next) {
    Controller.list()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}
function get(req, res,next) {
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(next);
    
}

function upsert(req, res,next) {
    Controller.upsert(req.body,req.params.id)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch(next);
    
}

function getUser(req, res, next){
    Controller.getUser(req.params.user)
        .then(data=>{
            response.success(req,res,data,201);
        })
        .catch(next);

}
module.exports = router;