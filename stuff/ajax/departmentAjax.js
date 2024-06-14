
$(document).ready(function () {

    let holdUser;

    //User Dropdown
    userDropdown();
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

    $(document).on('submit', 'form.ps_manage_department_form', function (e) {
        e.preventDefault();

        //Get form data from htl
        let ps_manage_department_hiddenid = $('.ps_manage_department_hiddenid', this).val();
        let ps_manage_department_user = $('.ps_manage_department_user', this).val();
        let ps_manage_department_name = $('.ps_manage_department_name', this).val();
        let ps_department_description = $('.ps_department_description', this).val();

        //Setting submit button to loader
        $('.ps_manage_department_submit_btn').html('<div class="mr-2 spinner-border align-self-center loader-sm"></div>');
        //Diable submit button
        $('.ps_manage_department_submit_btn').attr('disabled', 'disabled');
        
        socket.off('insertNewDepartment');
        socket.off(melody.melody1+'_insertNewDepartment'); 

        setTimeout(function () {
            socket.emit('insertNewDepartment', {
                "melody1": melody.melody1,
                "melody2": melody.melody2,
                "ps_manage_department_hiddenid": ps_manage_department_hiddenid,
                "ps_manage_department_user": ps_manage_department_user,
                "ps_manage_department_name": ps_manage_department_name,
                "ps_department_description": ps_department_description
            });
        }, 500);

        //Get response from submit
        socket.on(melody.melody1 + '_insertNewDepartment', function (data) {
            //Get json content from login code
            if (data.type == "success") {
                //trigger alert using the alert function down there
                Toast.fire({
                    title: 'Success',
                    text: data.message,
                    icon: 'success',
                    padding: '1em'
                })

                //Empty the form 
                $('.ps_manage_department_form').trigger('reset');
                socket.off(melody.melody1+'_insertNewDepartment'); 
                // DepartmentTableFetch();
            } else if (data.type == "caution") {
                Toast.fire({
                    text: data.message,
                    type: 'warning',
                    padding: '1em'
                })
            } else {
                //trigger alert using the alert function down there
                Toast.fire({
                    title: 'Error',
                    text: data.message,
                    type: 'error',
                    padding: '1em'
                })
            }
            //Set submit button back to its original text
            $('.ps_manage_department_submit_btn').html('Submit');
            //Enable submit button
            $('.ps_manage_department_submit_btn').removeAttr('disabled');
        });

    });

});

