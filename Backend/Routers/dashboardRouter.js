
const User = require('../Models/UserModel');
const Session = require('../Models/SessionModel');
const Role = require('../Models/RoleModel');
const path = require('path')
const dotenv = require('dotenv')
dotenv.config({path: path.join(__dirname, `../../system.env`)})

module.exports = function (start, Database) {

    start.get('/dashboard', function (request, response) {
        
        queryStr = request.query;
        const confiq = process.env

        if (confiq && confiq.DB_NAME && confiq.DB_NAME != '' || confiq.DB_NAME != undefined) {
            
            new User(Database);
            new Session(Database);
            new Role(Database);
            response.render('dashboard', { pageNavigate: queryStr });
        } else {
            console.log('First error run');
        }
    });
}


String.prototype.shuffle = function () {
    var a = this.split(""), n = a.length;
    for (var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}