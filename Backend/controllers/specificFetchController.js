
const getSessionIDs = require('./getSessionIDs');
const md5 = require('md5');

const Privilege = require('../Models/PrivilegeFeaturesModel');
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
            }else if (param === "specific_privilege") {
                let dataId = browserblob.dataId;
                const PrivilegeModel = new Privilege(Database, dataId);
                result = (await PrivilegeModel.getPrivileges()).privilegeColumns;
                socket.emit(melody1 + '_' + param, result);
            }
            
        } catch (error) {
            socket.emit(melody1 + '_' + param, {
                type: 'error',
                message: 'mmmmmmmmmm: ' + error
            });
        }
    });
}
