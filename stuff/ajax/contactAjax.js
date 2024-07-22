$(document).ready(function () {

    let userData = JSON.parse($('.hidden_userdata').val());

    let department = JSON.parse($('.hidden_department_data').val());

    // UserID in text Box
    $('.ps_contact_userID').val(userData.userID);
    $('.ps_contact_department').val(department.toUcwords());



    //================================================================================//

});