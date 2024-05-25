const Session = require('./SessionModel');
const CreateUpdateModel = require('./CreateUpdateModel');

//Intialize Class
class User {

    //Constructor 
    constructor (Database) {
        //Create forign key tables
        this.SessionModel = new Session(Database);

        this.Database = Database;

        //Table columns
        this.columnsList = ['userID', 'username', 'password', 'roleID', 'sessionID', 'status'];

        //Call to create table if not exist
        this.createTable();
    }

    //Insert method
    async insertTable (columns) {
        let result = await this.createTable();
        try {
            if (result) {
                let sql = `
                    INSERT INTO user (${this.columnsList.toString()}) VALUES (?,?,?,?,?,?);
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
            let sql = 'UPDATE user SET '+object.sql;
            let result = await this.Database.setupConnection({sql: sql, columns: object.columns}, 'object');
            return result;
        } catch (error) {
            return error;
        }
    }

    //Fetch for prepared statement
    async preparedFetch (object) {
        try {
            let sql = 'SELECT * FROM user WHERE '+object.sql;
            let result = await this.Database.setupConnection({sql: sql, columns: object.columns}, 'object');
            return result;
        } catch (error) {
            return error;
        }
    }

    //Create table method
    async createTable() {
        const CreateUpdateTable = new CreateUpdateModel(this.Database, {
            tableName: 'user',

            createTableStatement: (`
                userid BIGINT(100) PRIMARY KEY,
                username varchar(255),
                password text,
                roleID BIGINT(100),
                sessionID BIGINT(100),
                status varchar(50),
            `),

            foreignKeyStatement: (`
                ALTER TABLE user 
                ADD FOREIGN KEY(roleID) REFERENCES role(roleID),
                ADD FOREIGN KEY(sessionID) REFERENCES session(sessionID); 
            `),

            alterTableStatement: []
        });
        let result = await CreateUpdateTable.checkTableExistence();
        return result;
    }

}

module.exports = User;