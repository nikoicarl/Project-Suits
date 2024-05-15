$(document).ready(function () {
    
    // Toast Function
    var Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        heightAuto:true
    });

    //Submit form
    $('.ps_loginForm').submit(function (e) {
        e.preventDefault();
        //Get data from html
        let userID = $('.ps_userID', this).val();
        let password = $('.ps_password', this).val();

        $('.ps_loginBtn').attr('disabled');

        setTimeout(function () {

            //send data to login controller
            $.ajax({
                type: "POST",
                url: 'http://localhost:5010/login',
                headers: {
                    "accept": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                data: {
                    "userID": userID,
                    "password": password,
                },
                success: function (data) {
                    if (data.type == "error") {
                        Toast.fire({
                            icon: 'error',
                            title: " "+data.message+""
                        })
                    } else {
                        Toast.fire({
                            icon: 'success',
                            title: "Login successful.........redirecting to dashboard"
                        })
                        // redirect to dashboard
                        window.location.href = "dashboard.html";
                    }
                    // clear form data
                    $('.ps_loginForm').trigger('reset');
                }
            });
        }, 500);
    });
});
