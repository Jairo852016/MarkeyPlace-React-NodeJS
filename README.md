# MarkeyPlace-React-NodeJS
 
> This project is created in node JS microservices, with a MySql database and Frontend React..

* Used tools
    * NodeJS
    * MySQL
    * React.js
    * Docker



## Installation guide

Start cloning the repository:

```sh
 git clone https://github.com/Jairo852016/MarkeyPlace-React-NodeJS.git

```



Run the Docker-compose command and validate that the containers are up 

```sh
    docker-compose up -d 
    docker ps

```


the application is deployed at the following URL
```sh
    http://localhost:8000

```
* the API's that the Backend deploys are the following
    API USER
    *   /api/user
        * router.get('/', list)
        * router.get('/:id', get);
        * router.post('/', upsert);
        * router.put('/', secure('update'),upsert);
    API AUTHENTICATION
    * /api/auth
        * router.post('/login)
    API DOCUMENTATION
    * app.use('/api-docs)
    API MYSQL
    * /mysql
        * router.get('/:table',list);
        * router.get('/:table/:id',get);
        * router.post('/:table',insert);
        * router.put('/:table',upsert);
    API PRODUCTO
    * /api/product
        * router.get('/', list);
        * router.get('/:id', get);
        * router.get('/user/:user', getUser);
        * router.get('/', get);
        * router.post('/:id', upsert);

## Contact

Jairo Pérez – [@TuTwitter](https://twitter.com/jairo85cd1) 

[https://github.com/Jairo852016/MarkeyPlace-React-NodeJS.git](https://github.com/Jairo852016/MarkeyPlace-React-NodeJS.git)

[https://www.linkedin.com/in/jairo-perez-502211102/](https://www.linkedin.com/in/jairo-perez-502211102/)
