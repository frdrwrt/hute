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

[**HUTE**](https://hute.info) is a project to track weather data. It provides a graphql api. It is possible to send data recorded by a device of your choice. A progressive web app lets you comfortable check your records from anywhere. Further this project will collect informations from the commuinty about how to build your own device and connect it with the application.
<p align="center">
<img src="/assets/screenshot.png?sanitize=true" height="400">  
</p>

Have a look on https://hute.info. </br>
It is also possible to access the graphql api under https://hute.info/graphql.

## Contributions are welcome!
If you have an idea about what feature would make hute even better, feel free to create an issue or even help to make your feature become reality. 

### Local development

To get this project up and running on your local machine, you need the following requirements:
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
    ./hute start app        # start app
    ./hute start server     # start server
```
The same way you can stop the stack or parts of it with `./hute stop`.

#### Dev mode
First you need to install the dependencies with a simple 
```
    yarn
```
Next you need to start the DB.
```
    ./hute start db
```
You can than excess either app or server directory and start it in development mode. Which includes a livereload on code changes.
```
    cd app && yarn dev    
    cd server && yarn dev 
```
</br>
To run tests you need to start the test db first
```
    ./hute start db-test
```
We use jest test framework which can be started like this:
```
    cd server && yarn test
```
Stack can be accessed on the following ports/urls

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



