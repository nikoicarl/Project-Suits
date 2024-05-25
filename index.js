try {
    // Dependencies
    const express = require("express");
    const cors = require("cors");
    const start = express()
    const socketIo = require('socket.io')

    // Connections
    const DatabaseModel = require('./Backend/Models/DatabaseModel.js');

    // Controllers
    const loginController = require('./Backend/controllers/loginController.js');
    const dashboardController = require('./Backend/controllers/dashboardController.js');
    const userFetchController = require('./Backend/controllers/userFetchController.js');

    // Routers
    homeRouter = require('./Backend/routers/homeRouter.js');

    // Use Cors
    start.use(express.json());
    const corsOptions = {
        origin: '*',
        optionSuccessStatus: 200,
    }
    start.use(cors(corsOptions))

    //set template engine
    start.set('view engine', 'ejs')

    //set static files folder
    start.use(express.static('Frontend/dist'))

    // use models here
    const Database = new DatabaseModel()
    Database.createConnection()
    homeRouter(start, Database)

    // use routers here

    // include controller


    //Create port server
    const server = start.listen(5010, function () {
        console.log('You are listening to port 5010')
    })

    const mainSocket = socketIo(server)


    mainSocket.on('connection', function (socket) {
        console.log('A user is connected')

        try {
            loginController(socket, Database);

        } catch (error) {
            console.log(error)
        }

        socket.on('disconnect', function () {
            console.log('A user has disconnected')
        });
    });

} catch (error) {
    console.log(error)
}