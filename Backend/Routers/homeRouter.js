
const path = require('path')
const dotenv = require('dotenv')
dotenv.config({path: path.join(__dirname, `../../system.env`)})

module.exports = function (start, Database) {

    start.get('/', function (request, response) {
        queryStr = request.query;
        response.render('index', { pageNavigate: queryStr });
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