module.exports = function (app, dataBase) {
    var dataBase = dataBase;
    var app = app;

    // Get user
    app.post('/login', function(request, response) {
        let userID = request.body.userID;
        let password = request.body.password;

        if (!userID) {
            jsonData = {
                'type': 'error',
                'message': 'Please enter your UserID to login'
            };
            response.json(jsonData);
        } else if (!password) {
            jsonData = {
                'type': 'error',
                'message': 'Please enter your Password to login.'
            };
            response.json(jsonData);
        } else {
            // Check if the userID exists
            var sql = "SELECT * FROM user WHERE userID = ?";
            dataBase.query(sql, [userID], function(error, result){
                if (error) {
                    console.error("Database error:", error);
                    jsonData = {
                        'type': 'error',
                        'message': 'An error occurred while processing your request.'
                    };
                    response.json(jsonData);
                } else {
                    if (result.length > 0) {
                        var user = result[0];
                        // Check the password
                        if (user.password === password) {
                            return response.json(user);
                        } else {
                            jsonData = {
                                'type': 'error',
                                'message': 'Incorrect Password.'
                            };
                            response.json(jsonData);
                        }
                    } else {
                        jsonData = {
                            'type': 'error',
                            'message': 'Invalid UserID.'
                        };
                        response.json(jsonData);
                    }
                }
            });
        }
    });
}
