
$(document).ready(function () {

    let holdUser;
    userDropdown();
    //User Dropdown
    function userDropdown() {
        socket.off('dropdown');
        socket.off(melody.melody1 + '_user_dropdown');

        socket.emit('dropdown', {
            melody1: melody.melody1,
            melody2: melody.melody2,
            param: "user_dropdown"
        });

        //Get dropdown data
        socket.on(melody.melody1 + '_user_dropdown', function (data) {
            //Get json content from login code
            if (data.type == "error") {
                console.log(data.message);
            } else {
                $('select.ps_manage_department_user').html(`<option value="" ${holdUser !== undefined ? '' : 'selected'}> Select User </option>`);
                data.forEach(function (item, index) {

                    $('select.ps_manage_department_user').append(`<option value="${item.userID}"> ${item.userID}</option>`);
                });
            }
        });
    }

});

