
const getSessionIDs = require('./getSessionIDs');
const md5 = require('md5');

const User = require('../Models/UserModel');
const Session = require('../Models/SessionModel');
const GeneralFunction = require('../Models/GeneralFunctionModel');

const gf = new GeneralFunction();


module.exports = (socket, Database) => {
    socket.on('table', async (browserblob) => {
        let param = browserblob.param;
        let melody1 = (browserblob.melody1) ? browserblob.melody1 : '';

        let session = getSessionIDs(melody1);
        let userid = session.userid;
        let sessionid = session.sessionid;

        try {
            const PrivilegeModel = new Privilege(Database, userid);
            let privilegeData = (await PrivilegeModel.getPrivileges()).privilegeData;
            if (param === "") {
                socket.emit(melody1 + '_' + param, {
                    type: 'error',
                    message: 'Oops, something went wrong'
                });
            } else if (param === "department_table") {
                if (privilegeData !== undefined && privilegeData.administration.add_department == "yes" || privilegeData.administration.update_department == "yes" || privilegeData.administration.deactivate_department == "yes") {
                    const DepartmentModel = new Department(Database);
                    result = await DepartmentModel.preparedFetch({
                        sql: 'status != ? ORDER BY date_time DESC',
                        columns: ['inactive']
                    });
                    if (Array.isArray(result)) {
                        socket.emit(melody1 + '_' + param, result);
                    } else {
                        socket.emit(melody1 + '_' + param, {
                            type: 'error',
                            message: 'Oops, something went wrong: Error => ' + result.sqlMessage
                        });
                    }
                } else {
                    socket.emit(melody1 + '_' + param, []);
                }
            } else if (param === "dashboard_activities_table") {
                const SessionModel = new Session(Database);

                result = await SessionModel.preparedFetch({
                    sql: 'userID =? ORDER BY `DateTime`',
                    columns: [userid]
                });
                if (Array.isArray(result)) {
                    if (result.length > 0) {
                        let sessionData = [];
                        for (let i = 0; i < result.length; i++) {
                            let item = result[i];

                            for (let i = 0; i < item.length; i++) {
                                sessionData.push({
                                    sessionid: item[i].sessionID,
                                    activity: item[i].activity,
                                    date_time: item[i].date_time,
                                });

                            }
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
            } 
        } catch (error) {
            socket.emit(melody1 + '_' + param, {
                type: 'error',
                message: error
            });
        }
    });
}