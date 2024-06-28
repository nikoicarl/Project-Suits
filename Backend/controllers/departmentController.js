const Department = require('../Models/DepartmentModel');
// const Privilege = require('../Models/PrivilegeModel');
const Session = require('../Models/SessionModel');
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


        if (browserblob.melody2) {
            //Initiate connection
            const DepartmentModel = new Department(Database);
            // const PrivilegeModel = new Privilege(Database, userid);

            //Check for empty
            let result = await gf.ifEmpty([name]);
            if (result.includes('empty')) {
                socket.emit(melody1+'_insertNewDepartment', {
                    type: 'caution',
                    message: 'Enter department name!'
                });
            } else {
                // let privilegeData = (await PrivilegeModel.getPrivileges()).privilegeData;
                
                let privilege;
                if (hiddenid == "" || hiddenid == undefined) {
                    privilege = "yes";
                } else {
                    privilege = "yes";
                }
                if (privilege == "yes") {
                    let departmentID = hiddenid == "" || hiddenid == undefined ? 0 : hiddenid;
                    result = await DepartmentModel.preparedFetch({
                        sql: 'department = ? AND departmentID != ? AND status =?',
                        columns: [name, departmentID, 'a']
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
                                result = await DepartmentModel.insertTable([departmentID,userID, name, description, gf.getDateTime(), 'a']);
                            } else {
                                result = await DepartmentModel.updateTable({
                                    sql: 'userID = ?, department = ?, description = ? WHERE departmentID = ? AND status = ?',
                                    columns: [userID, name, description, departmentID, 'a']
                                });
                            }
                            if (result.affectedRows !== undefined) {
                                const SessionModel = new Session(Database);
                                let activityid = gf.getTimeStamp();
                                result = await SessionModel.insertTable([activityid, userid, gf.getDateTime(), (hiddenid == "" || hiddenid == undefined) ? 'added a new department' : 'updated a department record']);
                                let message = hiddenid == "" || hiddenid == undefined ? 'Department has been created successfully' : 'Department has been updated successfully';
                                if (result.affectedRows) {
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