$(document).ready(function () {

    let userData = JSON.parse($('.hidden_userdata').val());
    console.log(userData);

    // UserID in text Box
    $('.ps_contact_userID').val(userData.userID);



    //================================================================================//

});