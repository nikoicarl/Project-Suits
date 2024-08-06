const Document = require('../Models/DocumentModel');
const Session = require('../Models/SessionModel');
const Privilege = require('../Models/PrivilegeFeaturesModel');
const GeneralFunction = require('../Models/GeneralFunctionModel');
const getsessionIDs = require('../controllers/getSessionIDs');
const gf = new GeneralFunction();
const md5 = require('md5');
const UploadFile = require('../Models/UploadFileModel');


module.exports = (socket, Database)=>{
    socket.on('insertNewDocument', async (browserblob, cb)=>{
        let ps_manage_document_hiddenid = browserblob.ps_manage_document_hiddenid;
        let ps_document_upload_dropzone_rename = browserblob.ps_document_upload_dropzone_rename;
        const DocumentsForUpdate = browserblob.DocumentsForUpdate
        let melody1 = browserblob.melody1;
        let session = getsessionIDs(melody1);
        let userID = session.userID;
        let sessionID = session.sessionID;

        try {
            if (md5(userID) == browserblob.melody2) {
                //Initiate connection
                const DocumentModel = new Document(Database);
                const PrivilegeModel = new Privilege(Database, userID);
    
                //Check for empty
                let result = await gf.ifEmpty([ps_document_upload_dropzone_rename, DocumentsForUpdate]);
                if (result.includes('empty')) {
                    cb({
                        type: 'caution',
                        message: 'All fields are required!'
                    });
                } else {
                    let privilegeData = (await PrivilegeModel.getPrivileges()).privilegeData;
    
                    let privilege = (ps_manage_document_hiddenid == "" || ps_manage_document_hiddenid == undefined) ? privilegeData.pearson_specter.add_document : privilegeData.pearson_specter.update_document;
                    if (privilege == "yes") {
                        let documentID = ps_manage_document_hiddenid == "" || ps_manage_document_hiddenid == undefined ? 0 : ps_manage_document_hiddenid;
                        result = await DocumentModel.preparedFetch({
                            sql: 'fileName = ? AND documentID != ? AND status =?',
                            columns: [ps_document_upload_dropzone_rename, documentID, 'a']
                        });
                        if (Array.isArray(result)) {
                            if (result.length > 0) {
                                cb({
                                    type: 'caution',
                                    message: 'Sorry, document with the same name exist'
                                });
                            } else {
                                const UploadFileHandler = new UploadFile(DocumentsForUpdate, ps_document_upload_dropzone_rename)
                                let documentNames = UploadFileHandler._getFileNames().toString();
    
                                if (ps_manage_document_hiddenid == "" || ps_manage_document_hiddenid == undefined) {
                                    for (let i = 0; i < documentNames.split(',').length; i++) {
                                        const documents = documentNames.split(',')[i];
                                        documentID = gf.getTimeStamp();
                                        result = await DocumentModel.insertTable([documentID, userID, documents, gf.getDateTime(), 'a']);
                                    }
                                } else {
                                    let sql = '', columns = []
                                    if (DocumentsForUpdate.length > 0) {
                                        sql = 'documents = ? WHERE documentID = ? AND status = ?'
                                        columns = [documentNames, documentID, 'a']
                                    } else {
                                        sql = 'documents = ?  WHERE documentID = ? AND status = ?'
                                        columns = [documentNames, documentID, 'a']
                                    }
                                    result = await DocumentModel.updateTable({
                                        sql: sql,
                                        columns: columns
                                    })
                                }
                                if (result && result.affectedRows !== undefined) {
                                    if (Array.isArray(DocumentsForUpdate) && DocumentsForUpdate.length > 0) {
                                        UploadFileHandler._uploadFiles()
                                    }
    
                                    const SessionModel = new Session(Database);
                                    let sessionID = gf.getTimeStamp();
                                    result = await SessionModel.insertTable([sessionID, userID, gf.getDateTime(), (ps_manage_document_hiddenid == "" || ps_manage_document_hiddenid == undefined) ? 'added a new document' : 'updated a document record']);
                                    let message = ps_manage_document_hiddenid == "" || ps_manage_document_hiddenid == undefined ? 'Document has been created successfully' : 'Document has been updated successfully';
                                    if (result.affectedRows) {
                                        cb({
                                            type: 'success',
                                            message: message
                                        });
                                    } else {
                                        cb({
                                            type: 'error',
                                            message: 'Oops, something went wrong4: Error => ' + result
                                        });
                                    }
                                } else {
                                    console.log('Oops result: ', result)
                                    cb({
                                        type: 'error',
                                        message: 'Oops, something went wrong3: Error => ' + result
                                    });
                                }
                            }
                        } else {
                            cb({
                                type: 'error',
                                message: 'Oops, something went wrong2: Error => ' + result
                            });
                        }
                    } else {
                        cb({
                            type: 'caution',
                            message: 'You have no privilege to perform this task'
                        });
                    }
                }
            } else {
                cb({
                    'type': 'caution',
                    'message': 'Sorry your session has expired, wait for about 18 secconds and try again...',
                    'timeout': 'no'
                });
            }
        } catch (error) {
            console.log('Error: ', error)
        }
    });
}