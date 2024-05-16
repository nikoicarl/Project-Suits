module.exports = function (app, dataBase) {
    var dataBase = dataBase;
    var app = app;

    // Fetch User Data
    app.get('/privilege', function(request, response) {
        let userID = request.query.userID;
        var sql = "SELECT * FROM `privilege WHERE userID = ` ;";
        dataBase.query(sql, [userID] ,function(error, data){
            if (error) {
                console.log(error);
            } else {
                if (ressult.length > 0) {
                    j
                } else {
                    
                }
            }
        });
    });
}