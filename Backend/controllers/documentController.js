const Document = require('../Models/DocumentModel');
const Session = require('../Models/SessionModel');
const Privilege = require('../Models/PrivilegeFeaturesModel');
const GeneralFunction = require('../Models/GeneralFunctionModel');
const getsessionIDs = require('../controllers/getSessionIDs');
const gf = new GeneralFunction();
const md5 = require('md5');
const UploadFile = require('../../models/upload/UploadFileModel')


module.exports = (socket, Database)=>{
    socket.on('insertNewDocument', async (browserblob)=>{
        let ps_manage_document_hiddenid = browserblob.ps_manage_document_hiddenid;
        

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
                let result = await gf.ifEmpty([logig_manage_product_name]);
                if (result.includes('empty')) {
                    socket.emit(melody1+'_insertNewDocument', {
                        type: 'caution',
                        message: 'Product Name field is required !'
                    });
                } else {
                    let privilegeData = (await PrivilegeModel.getPrivileges()).privilegeData;
    
                    let privilege = (ps_manage_document_hiddenid == "" || ps_manage_document_hiddenid == undefined) ? privilegeData.pearson_specter.add_document : privilegeData.pearson_specter.update_document;
                    if (privilege == "yes") {
                        let documentID = ps_manage_document_hiddenid == "" || ps_manage_document_hiddenid == undefined ? 0 : ps_manage_document_hiddenid;
                        result = await DocumentModel.preparedFetch({
                            sql: 'product_name = ? AND documentID != ? AND status =?',
                            columns: [logig_manage_product_name, documentID, 'active']
                        });
                        if (Array.isArray(result)) {
                            if (result.length > 0) {
                                socket.emit(melody1+'_insertNewDocument', {
                                    type: 'caution',
                                    message: 'Sorry, product with the same name exist'
                                });
                            } else {
                                const UploadFileHandler = new UploadFile(DocumentsForUpdate, '')
                                let documentNames = UploadFileHandler._getFileNames().toString()
    
                                if (ps_manage_document_hiddenid == "" || ps_manage_document_hiddenid == undefined) {
                                    documentID = gf.getTimeStamp();
                                    result = await DocumentModel.insertTable([documentID, logig_manage_product_name, logig_manage_product_prod_type, logig_manage_product_prod_category, null, logig_manage_product_brand, logig_manage_product_batch_number, logig_manage_product_description, documentNames, 'active', gf.getDateTime(), sessionID]);
                                } else {
                                    let sql = '', columns = []
                                    if (DocumentsForUpdate.length > 0) {
                                        sql = 'product_name = ?, product_type = ?, product_categoryid = ?, brand = ?, batch_number = ?, description = ?, documents = ? WHERE documentID = ? AND status = ?'
                                        columns = [logig_manage_product_name, logig_manage_product_prod_type, logig_manage_product_prod_category,  logig_manage_product_brand, logig_manage_product_batch_number, logig_manage_product_description, documentNames, documentID, 'active']
                                    } else {
                                        sql = 'product_name = ?, product_type = ?, product_categoryid = ?, brand = ?, batch_number = ?, description = ? WHERE documentID = ? AND status = ?'
                                        columns = [logig_manage_product_name, logig_manage_product_prod_type, logig_manage_product_prod_category,  logig_manage_product_brand, logig_manage_product_batch_number, logig_manage_product_description, documentID, 'active']
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
                                    let message = ps_manage_document_hiddenid == "" || ps_manage_document_hiddenid == undefined ? 'Product has been created successfully' : 'Product has been updated successfully';
                                    if (result.affectedRows) {
                                        socket.emit(melody1+'_insertNewDocument', {
                                            type: 'success',
                                            message: message
                                        });
                                    } else {
                                        socket.emit(melody1+'_insertNewDocument', {
                                            type: 'error',
                                            message: 'Oops, something went wrong5: Error => '+result
                                        });
                                    }
                                } else {
                                    console.log('Oops result: ', result)
                                    socket.emit(melody1+'_insertNewDocument', {
                                        type: 'error',
                                        message: 'Oops, something went wrong4: Error => '+result
                                    });
                                }
                            }
                        } else {
                            socket.emit(melody1+'_insertNewDocument', {
                                type: 'error',
                                message: 'Oops, something went wrong2: Error => '+result
                            });
                        }
                    } else {
                        socket.emit(melody1+'_insertNewDocument', {
                            type: 'caution',
                            message: 'You have no privilege to add new product'
                        });
                    }
                }
            } else {
                socket.emit(melody1+'_insertNewDocument', {
                    'type': 'caution',
                    'message': 'Sorry your session has expired, wait for about 15 seconds and try again...',
                    'timeout': 'no'
                });
            }
        } catch (error) {
            console.log('Error: ', error)
        }
    });
}