
const getSessionIDs = require('./getSessionIDs');
const md5 = require('md5');

const Role = require('../Models/RoleModel');
const Session = require('../Models/SessionModel');
const GeneralFunction = require('../Models/GeneralFunctionModel');
const Department = require('../Models/DepartmentModel');


const gf = new GeneralFunction();

module.exports = (socket, Database) => {
    socket.on('deactivate', async (browserblob) => {
        let param = browserblob.param;
        let melody1 = browserblob.melody1;

        let session = getSessionIDs(melody1);
        let userid = session.userid;
        let sessionid = session.sessionid;

        try {
            const PrivilegeModel = new Privilege(Database, userid);
            let privilegeData = (await PrivilegeModel.getPrivileges()).privilegeData;

            let message;

            if (param === "") {
                socket.emit(melody1 + '_' + param, {
                    type: 'error',
                    message: 'Oops, something went wrong'
                });
            } else {
                let result;
                if (param === "deactivate_department") {
                    const DepartmentModel = new Department(Database);
                    if (privilegeData !== undefined && privilegeData.administration.deactivate_department == "yes") {
                        let dataId = browserblob.dataId;
                        let checker = browserblob.checker == "deactivate" ? 'deactivated' : 'active';
                        result = await DepartmentModel.updateTable({
                            sql: 'status=? WHERE departmentID=?',
                            columns: [checker, dataId]
                        });
                    } else {
                        message = 'You have no privilege to perform this task!';
                    }
                } else if (param === "deactivate_role") {

                }
                if (message == undefined) {
                    message = result.affectedRows ? 'deactivate successful' : 'deactivate unsuccessful';
                }
                socket.emit(melody1 + '_' + param, {
                    type: (result.affectedRows) ? 'success' : 'caution',
                    message: message
                });
            }
        } catch (error) {
            // console.log(error);
            socket.emit(melody1 + '_' + param, {
                type: 'error',
                message: error
            });
        }
    });
}