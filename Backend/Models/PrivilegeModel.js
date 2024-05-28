const CreateUpdateModel = require('./CreateUpdateModel');

//Intialize Class
class Privilege {

    //Constructor 
    constructor (Database) {
        this.Database = Database;

        //Table columns
        this.columnsList = ['privilegeID', 'userID', 'add_user', 'edit_user', 'deactivate_user','add_role', 'edit_role', 'deactivate_role', 'add_department','edit_department', 'deactivate_role', 'add_document', 'edit_document', 'deactivate_document'];

        //Call to create table if not exist
        this.createTable();
    }

    //Insert method
    async insertTable (columns) {
        let result = await this.createTable();
        try {
            if (result) {
                let sql = `
                    INSERT IGNORE INTO privilege (${this.columnsList.toString()}) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);
                `;
                result = await this.Database.setupConnection({sql: sql, columns: columns}, 'object');
                return result;
            } else {
                return result;
            }
        } catch (error) {
            return error;
        }
    }

    //Update method
    async updateTable (object) {
        try {
            let sql = 'UPDATE privilege SET '+object.sql;
            let result = await this.Database.setupConnection({sql: sql, columns: object.columns}, 'object');
            return result;
        } catch (error) {
            return error;
        }
    }

    //Fetch for prepared statement
    async preparedFetch (object) {
        try {
            let sql = 'SELECT * FROM privilege WHERE '+object.sql;
            let result = await this.Database.setupConnection({sql: sql, columns: object.columns}, 'object');
            return result;
        } catch (error) {
            return error;
        }
    }

    //Create table method
    async createTable() {
        const CreateUpdateTable = new CreateUpdateModel(this.Database, {
            tableName: 'privilege',

            createTableStatement: (`
                privilegeID BIGINT(100) PRIMARY KEY,
                userID BIGINT(100),
                add_user varchar(5),
                edit_user varchar(5),
                deactivate_user varchar(5),
                add_role varchar(5),
                edit_role varchar(5),
                deactivate_role varchar(5),
                add_department varchar(5),
                edit_department varchar(5),
                add_document varchar(5),
                edit_document varchar(5),
                deactivate_document varchar(5)
            `),

            foreignKeyStatement: (`
            `),

            alterTableStatement: []
        });
        let result = await CreateUpdateTable.checkTableExistence();
        return result;
    }

}

module.exports = Privilge;