<p align="center">
    <img src="https://raw.githubusercontent.com/frdrwrt/hute/master/app/static/logo-512.png?sanitize=true"
        height="130">
</p>
<h1 align="center">HUTE</h1>

<p align="center">
<img src="https://github.com/frdrwrt/hute/workflows/Codestyle/badge.svg">  
<img src="https://github.com/frdrwrt/hute/workflows/Tests/badge.svg">  
<img src="https://github.com/frdrwrt/hute/workflows/Build%20and%20deploy/badge.svg">  
</p>

**HUTE** is a project for use

## Contributions are welcome!

To get this project up and running on your local machine, you need to following requirements:
 - [node 14](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-debian-10)
 - [yarn2](https://yarnpkg.com/getting-started/install)
 - [docker](https://docs.docker.com/engine/install/)
 - [ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html#installing-ansible-with-pip)
 - [docker sdk for python](https://pypi.org/project/docker/)

After cloning the repository you can start app and server either by 
#### Docker mode
```
    ./hute start            # start complete stack
    ./hute start db         # start db 
    ./hute start db-test    # start db-test
    ./hute start app        # start db-test
    ./hute start server     # start db-test
```
The same way you can stop the stack or parts of it with `./hute stop`.

#### Dev mode
First you need to install the dependencies with a simple 
```
    yarn
```
After you 
```
    ./hute start db
```
```
    cd app && yarn dev    
    cd server && yarn dev 
```
To run tests you need to start the test db first
```
    ./hute start db-test
```
After db-test is running you can run tests
```
    cd server && yarn test
```
after stack is running you can access 
- App: http://localhost:3000/
- Graphql Playground: http://localhost:4000/graphql
- DB: PORT 25432
- DBTest: PORT 25433 

#### DB seed
Sometimes it is helpful to have some dummy data in the database for development. You can seed the db with some simple data:
```
    ./hute seed
```
To create your own seed files, checkout http://knexjs.org/#Seeds-API for more information

#### Migrations
To create and run migrations use the following commands:
```
    ./hute migration            # run migrations on db and db-test
    ./hute migration dev        # run migrations on db
    ./hute migration test       # run migrations on db-test
    ./hute migration create     # create a new migration file
```



