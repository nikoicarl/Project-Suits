
const getSessionIDs = require('./getSessionIDs');
const md5 = require('md5');

const Privilege = require('../Models/PrivilegeFeaturesModel');
const Role = require('../Models/RoleModel');
const GeneralFunction = require('../Models/GeneralFunctionModel');



const gf = new GeneralFunction();

module.exports = (socket, Database) => {
    socket.on('specific', async (browserblob) => {
        let param = browserblob.param;
        let melody1 = (browserblob.melody1) ? browserblob.melody1 : '';

        let session = getSessionIDs(melody1);
        let userid = session.userid;
        let sessionid = session.sessionid;

        try {
            if (param === "") {
                socket.emit(melody1 + '_' + param, {
                    type: 'error',
                    message: 'Oops, something went wrong'
                });
            } else if (param === "specific_privilege") {
                let dataId = browserblob.dataId;
                const PrivilegeModel = new Privilege(Database, dataId);
                result = (await PrivilegeModel.getPrivileges()).privilegeColumns;
                socket.emit(melody1 + '_' + param, result);
            } else if (param === "get_user_privileges") {
                let user = browserblob.user;
                const PrivilegeModel = new Privilege(Database, user);
                let privilegeData = (await PrivilegeModel.getPrivileges()).privilegeData;
                socket.emit(md5(Number(user)) + '_' + param, privilegeData);
                socket.broadcast.emit(md5(Number(user)) + '_' + param, privilegeData);
            } else if (param === "specific_role") {
                const RoleModel = new Role(Database);
                let dataId = browserblob.dataId;
                result = await RoleModel.preparedFetch({
                    sql: 'roleID=?',
                    columns: [dataId]
                });
                if (Array.isArray(result)) {
                    socket.emit(melody1 + '_' + param, result[0]);
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
                message: 'mmmmmmmmmm: ' + error
            });
        }
    });
}
