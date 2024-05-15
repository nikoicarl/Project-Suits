// Database connect function
module.exports = function dataBase(mysql) {
    const dbcon = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'project_suits_db'
    });

    //Checking for database connection
    dbcon.connect(function(err) {
        if (err) {
        console.error('Database is not connected..');
        return;
        }   
        console.log('Database connected...');
    });

    return dbcon;
}