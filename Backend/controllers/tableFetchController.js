
const getSessionIDs = require('./getSessionIDs');
const md5 = require('md5');


const Role = require('../Models/RoleModel');
const Session = require('../Models/SessionModel');
const GeneralFunction = require('../Models/GeneralFunctionModel');
const Department = require('../Models/DepartmentModel');
const Privilege = require('../Models/PrivilegeFeaturesModel');
const Document = require('../Models/DocumentModel');
const User = require('../Models/UserModel');

const gf = new GeneralFunction();


module.exports = (socket, Database) => {
    socket.on('table', async (browserblob) => {
        let param = browserblob.param;
        let melody1 = (browserblob.melody1) ? browserblob.melody1 : '';

        let session = getSessionIDs(melody1);
        let userID = session.userID;
        let sessionID = session.sessionID;

        try {
            const PrivilegeModel = new Privilege(Database, userID);
            let privilegeData = (await PrivilegeModel.getPrivileges()).privilegeData;
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
                                dateTime: result[i].DateTime,
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
                if (privilegeData !== undefined && privilegeData.pearson_specter.add_department == "yes" || privilegeData.pearson_specter.edit_department == "yes" || privilegeData.pearson_specter.deactivate_department == "yes") {
                    const DepartmentModel = new Department(Database);
                    result = await DepartmentModel.preparedFetch({
                        sql: 'status != ?  ORDER BY dateTime DESC',
                        columns: ['i']
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
            } else if (param === "role_table") {
                const RoleModel = new Role(Database);

                result = await RoleModel.preparedFetch({
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
            } else if (param === "document_table") {
                const DocumentModel = new Document(Database);

                result = await DocumentModel.preparedFetch({
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
            } else if (param === "user_table") {
                const UserModel = new User(Database);

                result = await UserModel.preparedFetch({
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