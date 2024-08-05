$(document).ready(function () {

    startDateRangePicker('.ps_department_state_report_date_range', '.ps_department_state_report_date');

    //Close opened report
    $(document).on('click.otherclicks', 'button.ps_report_close_btn', function(e){
        e.preventDefault();
        $('.ps_department_state_report_display_page').html(``);
        $('.ps_department_state_report_form').trigger('reset');
    });

    // Submit
    $(document).on('submit', 'form.ps_department_state_report_form', function (e) {
        e.preventDefault();

        //Get form data from html
        let user = $('.ps_department_state_report_user', this).val().split("*")[0];
        let date_range = $('.ps_department_state_report_date', this).val();

        //Setting submit button to loader
        $('.ps_department_state_report_submit').html('<div class="mr-2 spinner-border align-self-center loader-sm"></div>');
        //Diable submit button
        $('.ps_department_state_report_submit').attr('disabled', 'disabled');
        
        socket.off('runPSReport');
        socket.off(melody.melody1+'_login_report');

        setTimeout(function () {
            socket.emit('runPSReport', {
                "melody1": melody.melody1,
                "melody2": melody.melody2,
                "param": 'login_report',
                "user": user == "" || user == undefined || user == null || user == ' ' ? '' : user,
                "date_range": date_range
            });
        }, 500);

        //Get response from submit
        socket.on(melody.melody1 + '_login_report', function (data) {
            if (data.type == "error") {
                Toast.fire({
                    text: data.message,
                    type: 'error',
                    padding: '1em'
                })
            } else if(data.type == "caution") {
                Toast.fire({
                    text: data.message,
                    type: 'warning',
                    padding: '1em'
                })
            } else { 
                let html;
                if (data.reportType == 'user') {
                    html = DepartmentStateReportPageUser({
                        data: data.data,  
                        dateRange: date_range.split("**"),
                        user: $('.ps_department_state_report_user').val().split("*")[1] + " " + $('.ps_department_state_report_user').val().split("*")[2]
                    });
                    $('.ps_department_state_report_display_page').html(html);
                } else {
                    html = DepartmentStateReportPage({
                        data: data.data, 
                        dateRange: date_range.split("**"), 
                        user: $('.ps_department_state_report_user').val().split("*")[1] + " " + $('.ps_department_state_report_user').val().split("*")[2]
                    });
                    $('.ps_department_state_report_display_page').html(html);
                }
                // reset form
                $('.ps_department_state_report_form').trigger('reset');
                socket.off(melody.melody1+'_login_report');
            }
            //Set submit button back to its original text
            $('.ps_department_state_report_submit').html('<i class="icon-stats-dots mr-2"></i> Run Report');
            //Enable submit button
            $('.ps_department_state_report_submit').removeAttr('disabled');
        });
    });


    // User Dropdown
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
                $('select.ps_department_state_report_user').html(`<option value="" ${holdUser !== undefined ? '' : 'selected'}> Select User </option>`);
                data.forEach(function (item, index) {
                    $('select.ps_department_state_report_user').append(`<option value="${item.userID}*${item.firstName}*${item.lastName}*"> ${item.userID}</option>`);
                });
            }
        });
    }

});

