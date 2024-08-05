const Session = require('./SessionModel');
const CreateUpdateModel = require('./CreateUpdateModel');


class Document {

    //Constructor 
    constructor (Database) {
        //Create foreign key tables
        this.SessionModel = new Session(Database);

        this.Database = Database;

        //Table columns
        this.columnsList = ['documentID', 'userID', 'fileName', 'dateTime', 'status'];

        //Call to create table if not exist
        this.createTable();
    }

    //Insert method
    async insertTable (columns) {
        let result = await this.createTable();
        try {
            if (result) {
                let sql = `
                    INSERT INTO document (${this.columnsList.toString()}) VALUES (?,?,?,?,?);
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
            let sql = 'UPDATE document SET '+object.sql;
            let result = await this.Database.setupConnection({sql: sql, columns: object.columns}, 'object');
            return result;
        } catch (error) {
            return error;
        }
    }

    //Fetch for prepared statement
    async preparedFetch (object) {
        try {
            let sql = 'SELECT * FROM document WHERE '+object.sql;
            let result = await this.Database.setupConnection({sql: sql, columns: object.columns}, 'object');
            return result;
        } catch (error) {
            return error;
        }
    }

     //Fetch for prepared statement left join user
    async preparedLeftJoinFetch (object) {
        try {
            let sql = `
                SELECT document.documentID AS documentID, 
                document.userID AS userID, 
                document.fileName AS fileName, 
                document.dateTime AS dateTime,
                document.status AS status,  
                user.firstName AS firstName,
                user.lastName AS lastName
                FROM document 
                LEFT JOIN user ON user.userID = document.userID  
                WHERE ${object.sql}
            `;
            let result = await this.Database.setupConnection({sql: sql, columns: object.columns}, 'object');
            return result;
        } catch (error) {
            return error;
        }
    }
    
    //Create table method
    async createTable() {
        const CreateUpdateTable = new CreateUpdateModel(this.Database, {
            tableName: 'document',

            createTableStatement: (`
                documentID BIGINT(100) PRIMARY KEY,
                userID BIGINT(100),
                fileName varchar(255),
                dateTime text,
                status varchar(1)
            `),

            foreignKeyStatement: (``),

            alterTableStatement: []
        });
        let result = await CreateUpdateTable.checkTableExistence();
        return result;
    }


    //Fetch for prepared statement
    async countFetch (object) {
        try {
            let sql = 'SELECT COUNT(documentID) FROM document WHERE '+object.sql;
            let result = await this.Database.setupConnection({sql: sql, columns: object.columns}, 'object');
            return result;
        } catch (error) {
            return error;
        }
    }

}

module.exports = Document;