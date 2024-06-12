$(document).ready(function () {

    // Dropzone
    let dropZoneIcons = {
        pdf: '<div class="fa fa-file-pdf fa-5x text-danger d-block w-100 h-70"></div>',
        doc: '<div class="fa fa-file-word fa-5x text-danger-400 d-block w-100 h-70"></div>',
        spreadsheet: '<div class="fa fa-file-excel fa-5x text-danger-400 d-block w-100 h-70"></div>',
        other: '<div class="fa fa-file-archive fa-5x text-danger-400 d-block w-100 h-70"></div> '
    }

    pageDropZone();
    function pageDropZone() {
        setTimeout(function () {
            FileNamesHolder = []
            UploadChecker = 0;
            DropZone('ps_dropzone_input', 'black', dropZoneIcons, {
                requestType: 'socket',
                socketObject: socket,
                socketEvent: 'ovasyte_general_file_upload'
            }, 'image/*', 1)
            $('.ps_dropzone_title').text('Click to upload image here');
            $('.ps_dropzone_subtitle').text(``);
            // $('.ps_cake_drop_zone_label').css('height', '150px');
            $('.ps_dropzone_inner').addClass('mt-4');
        }, 200);
    }

});

