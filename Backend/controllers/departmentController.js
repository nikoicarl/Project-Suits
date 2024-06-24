const Department = require('../Models/DepartmentModel');
// const Privilege = require('../Models/PrivilegeModel');
const SessionActivity = require('../Models/SessionModel');
const GeneralFunction = require('../Models/GeneralFunctionModel');
const getSessionIDs = require('./getSessionIDs');
const gf = new GeneralFunction();
const md5 = require('md5');

module.exports = (socket, Database)=>{
    socket.on('insertNewDepartment', async (browserblob)=>{
        let hiddenid = browserblob.ps_manage_department_hiddenid;
        let userID = browserblob.ps_manage_department_user;
        let name = browserblob.ps_manage_department_name;
        let description = browserblob.ps_department_description;

        let melody1 = browserblob.melody1;

        let session = getSessionIDs(melody1);
        let userid = session.userid;
        let sessionid = session.sessionid;

        if (md5(userid) == browserblob.melody2) {
            //Initiate connection
            const DepartmentModel = new Department(Database);
            const PrivilegeModel = new Privilege(Database, userid);

            //Check for empty
            let result = await gf.ifEmpty([name]);
            if (result.includes('empty')) {
                socket.emit(melody1+'_insertNewDepartment', {
                    type: 'caution',
                    message: 'Enter department name!'
                });
            } else {
                let privilegeData = (await PrivilegeModel.getPrivileges()).privilegeData;
                
                let privilege;
                if (hiddenid == "" || hiddenid == undefined) {
                    privilege = privilegeData.add_department;
                } else {
                    privilege = privilegeData.update_department;
                }
                if (privilege == "yes") {
                    let departmentID = hiddenid == "" || hiddenid == undefined ? 0 : hiddenid;
                    result = await DepartmentModel.preparedFetch({
                        sql: 'name = ? AND departmentID != ? AND status =?',
                        columns: [name, departmentID, 'active']
                    });
                    if (Array.isArray(result)) {
                        if (result.length > 0) {
                            socket.emit(melody1+'_insertNewDepartment', {
                                type: 'caution',
                                message: 'Sorry, same department name exist'
                            });
                        } else {
                            if (hiddenid == "" || hiddenid == undefined) {
                                departmentID = gf.getTimeStamp();
                                result = await DepartmentModel.insertTable([departmentID, name, description, color, 'active', gf.getDateTime(), sessionid]);
                            } else {
                                result = await DepartmentModel.updateTable({
                                    sql: 'name = ?, description = ?, color = ? WHERE departmentID = ? AND status = ?',
                                    columns: [name, description, color, departmentID, 'active']
                                });
                            }
                            if (result.affectedRows !== undefined) {
                                const SessionActivityModel = new SessionActivity(Database);
                                let activityid = gf.getTimeStamp();
                                result = await SessionActivityModel.insertTable([activityid, sessionid, (hiddenid == "" || hiddenid == undefined) ? 'added a new department' : 'updated a department record', 'active', gf.getDateTime()]);
                                let message = hiddenid == "" || hiddenid == undefined ? 'Department has been created successfully' : 'Department has been updated successfully';
                                if (result.affectedRows) {
                                    socket.broadcast.emit('departmentBroadcast', 'success broadcast');
                                    socket.emit(melody1+'_insertNewDepartment', {
                                        type: 'success',
                                        message: message
                                    });
                                } else {
                                    socket.emit(melody1+'_insertNewDepartment', {
                                        type: 'error',
                                        message: 'Oops, something went wrong4: Error => '+result.toString()
                                    });
                                }
                            } else {
                                socket.emit(melody1+'_insertNewDepartment', {
                                    type: 'error',
                                    message: 'Oops, something went wrong3: Error => '+result.toString()
                                });
                            }
                        }
                    } else {
                        socket.emit(melody1+'_insertNewDepartment', {
                            type: 'error',
                            message: 'Oops, something went wrong2: Error => '+result.toString()
                        });
                    }
                } else {
                    socket.emit(melody1+'_insertNewDepartment', {
                        type: 'caution',
                        message: 'You have no privilege to add new department'
                    });
                }
            }
        } else {
            socket.emit(melody1+'_insertNewDepartment', {
                'type': 'caution',
                'message': 'Sorry your session has expired, wait for about 18 secconds and try again...',
                'timeout': 'no'
            });
        }
    });
}