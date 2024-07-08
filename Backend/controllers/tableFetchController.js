
const getSessionIDs = require('./getSessionIDs');
const md5 = require('md5');


const Role = require('../Models/RoleModel');
const Session = require('../Models/SessionModel');
const GeneralFunction = require('../Models/GeneralFunctionModel');
const Department = require('../Models/DepartmentModel');

const gf = new GeneralFunction();


module.exports = (socket, Database) => {
    socket.on('table', async (browserblob) => {
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
            } else if (param === "dashboard_activities_table") {
                const SessionModel = new Session(Database);

                result = await SessionModel.preparedFetch({
                    sql: 'userID =? ORDER BY `DateTime` DESC',
                    columns: [userID]
                });
                if (Array.isArray(result)) {
                    if (result.length > 0) {
                        let sessionData = [];
                        for (let i = 0; i < result.length; i++) {
                            sessionData.push({
                                sessionid: result[i].sessionID,
                                activity: result[i].activity,
                                date_time: result[i].DateTime,
                            });
                        }
                        socket.emit(melody1 + '_' + param, sessionData);
                    } else {
                        socket.emit(melody1 + '_' + param, result);
                    }
                } else {
                    socket.emit(melody1 + '_' + param, {
                        type: 'error',
                        message: 'Oops, something went wrong: Error => ' + result.sqlMessage
                    });
                }
            } else if (param === "department_table") {
                const DepartmentModel = new Department(Database);

                result = await DepartmentModel.preparedFetch({
                    sql: 'status =?',
                    columns: ['a']
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