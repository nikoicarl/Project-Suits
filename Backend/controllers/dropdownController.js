
const getSessionIDs = require('./getSessionIDs');
const md5 = require('md5');


const Role = require('../Models/RoleModel');
const User = require('../Models/UserModel');
const GeneralFunction = require('../Models/GeneralFunctionModel');

const gf = new GeneralFunction();


module.exports = (socket, Database) => {
    socket.on('dropdown', async (browserblob) => {
        let param = browserblob.param;
        let melody1 = (browserblob.melody1) ? browserblob.melody1 : '';

        let session = getSessionIDs(melody1);
        let userID = session.userID;
        let sessionID = session.sessionID;

        try {
            if (param === "") {
                socket.emit(melody1 + '_' + param, {
                    type: 'error',
                    message: 'Oops, something went wrong'
                });
            } else if (param === "user_dropdown") {
                const UserModel = new User(Database);

                result = await UserModel.preparedFetch({
                    sql: 'status = ?',
                    columns: ['active']
                });
                if (Array.isArray(result)) {
                    socket.emit(melody1 + '_' + param, result);
                } else {
                    socket.emit(melody1 + '_' + param, {
                        type: 'error',
                        message: 'Oops, something went wrong: Error => ' + result.sqlMessage
                    });
                }
            } 
        } catch (error) {
            socket.emit(melody1 + '_' + param, {
                type: 'error',
                message: error
            });
        }
    });
}