$(document).ready(function () {

    // Dropzone
    let dropZoneIcons = {
        pdf: '<div class="fa fa-file-pdf fa-5x text-danger d-block w-100 h-70"></div>',
        doc: '<div class="fa fa-file-word fa-5x text-danger-400 d-block w-100 h-70"></div>',
        spreadsheet: '<div class="fa fa-file-excel fa-5x text-danger-400 d-block w-100 h-70"></div>',
        other: '<div class="fa fa-file-archive fa-5x text-danger-400 d-block w-100 h-70"></div> '
    }

    let holdUser;

    //Submit form
    $(document).on('submit', 'form.ps_document_form', function (e) {
        e.preventDefault();
    
        let ps_document_upload_dropzone_rename = $('.ps_document_upload_dropzone_rename', this).val();
        let ps_manage_document_hiddenid = $('.ps_manage_document_hiddenid', this).val();
    
        //Setting submit button to loader
        $('.ps_document_submit').html('<div class="mr-2 spinner-border align-self-center loader-sm"></div>');
        //Disable submit button
        $('.ps_document_submit').attr('disabled', 'disabled');
    
        socket.off('insertNewDocument');
        socket.off(melody.melody1 + '_insertNewDocument');

        if (ps_manage_document_hiddenid != undefined || ps_manage_document_hiddenid != null) {
            FileNamesHolder.push.ps_document_upload_dropzone_rename;
        }
    
        setTimeout(function () {
            socket.emit('insertNewDocument', {
                "melody1": melody.melody1,
                "melody2": melody.melody2,
                "ps_document_upload_dropzone_rename": ps_document_upload_dropzone_rename,
                "ps_manage_document_hiddenid": ps_manage_document_hiddenid,
                "DocumentsForUpdate": FilterFileNames(FileNamesHolder)
            }, (data) => {
                if (data.type == 'success') {
                    $('.ps_document_form').trigger('reset');
                    socket.off(melody.melody1 + '_insertNewDocument');
                    pageDropZone();
                }
                Toast.fire({
                    title: data.type == 'success' ? 'Success' : (data.type == 'error' ? 'Error' : 'Caution'),
                    text: data.message,
                    icon: data.type == 'success' ? 'success' : (data.type == 'error' ? 'error' : 'warning'),
                    padding: '0.5em'
                });
                DocumentTableFetch();
                // Set submit button back to its original text
                $('.ps_document_submit').html('Submit');
                //Empty the form 
                $('.ps_document_form').trigger('reset');
                $('.ps_manage_document_hiddenid').val('');
                FileNamesHolder = [];
                // Enable submit button
                $('.ps_document_submit').removeAttr('disabled');
            });
        }, 500);
    });

    // Form submit for assign user
    $(document).on('submit', 'form.ps_document_assign_user_form', function (e) {

        e.preventDefault();
        let ps_document_assign_user_hiddenid = $('.ps_document_assign_user_hiddenid', this).val();
        let ps_document_assign_user_dropdown = $('.ps_document_assign_user_dropdown', this).val();

        //Setting submit button to loader
        $('.ps_document_assign_user_submit_btn').html('<div class="mr-2 spinner-border align-self-center loader-sm"></div>');
        //Diable submit button
        $('.ps_document_assign_user_submit_btn').attr('disabled', 'disabled');

        socket.off('specific'); 
        socket.off(melody.melody1+'_specific'); 

        socket.emit('specific', {
            "melody1": melody.melody1,
            "melody2": melody.melody2,
            "melody3": melody.melody3,
            "param": 'assign_user',
            "hiddenID": ps_document_assign_user_hiddenid,
            "userID": ps_document_assign_user_dropdown
        });

        socket.on(melody.melody1 + '_assign_user', function (data) {   
            if (data.type == "success") {
                //trigger alert using the alert function down there
                Toast.fire({
                    title: 'Success',
                    text: data.message,
                    icon: 'success',
                    padding: '1em'
                })

                //Empty the form 
                $('.ps_document_assign_user_form').trigger('reset');
                socket.off(melody.melody1+'_assign_user'); 
                DocumentTableFetch();
            } else if (data.type == "caution") {
                Toast.fire({
                    title: 'Caution',
                    text: data.message,
                    icon: 'warning',
                    padding: '1em'
                })
            } else {
                //trigger alert 
                Toast.fire({
                    title: 'Error',
                    text: data.message,
                    icon: 'error',
                    padding: '1em'
                })
            }
            //Set submit button back to its original text
            $('.ps_document_assign_user_submit_btn').html('Submit');
            //Enable submit button
            $('.ps_document_assign_user_submit_btn').removeAttr('disabled');
        }
        );
    }
    );

    //Document Table Fetch
    DocumentTableFetch();
    function DocumentTableFetch(){
        socket.off('table');
        socket.off(melody.melody1+'_document_table'); 

        socket.emit('table', {
            melody1: melody.melody1,
            melody2: melody.melody2,
            param: 'document_table'
        });

        // User Table Emit Response
        socket.on(melody.melody1 + '_document_table', (data) => {
            if (data.type == 'error') {
                console.log(data.message);
            } else {
                documentDataTable(data);
            }
        });
    }

    //Data table creation function
    function documentDataTable(dataJSONArray) {
        reCreateMdataTable('ps_document_data_table', 'ps_document_data_table_div');
        const datatable = $('.ps_document_data_table').mDatatable({
            data: {
                type: 'local',
                source: dataJSONArray,
                pageSize: 10
            },
            search: {
                input: $('#ps_document_general_search'),
            },
            columns: [
                {
                field: 'fileName',
                title: "Document",
                type: 'text',
                template: function (row){
                    let docsHtml = `<div class=" w-100"> 
                                        <a  href="uploads/${row.fileName}" download="${row.fileName}"> 
                                            <span class="icon-file-pdf icon-2x">
                                            </span>
                                            <br> <p class="mt-1">${row.fileName.toUcwords() }<p>
                                        </a> 
                                    </div>`;
                    return docsHtml;
                }
                },
                {
                    field: 'dateTime',
                    title: "Date Uploaded",
                    type: 'text',
                template: function (row) {
                    return (row.dateTime).fullDate();
                }
                },
                {
                    field: 'status',
                    title: "Status",
                    type: 'text',
                    template: function (row) {
                        if (row.status == 'a') {
                            return `<span class="badge badge-success"> Active </span>`;
                        } else if (row.status == 'd') {
                            return `<span class="badge badge-danger"> Deactivated </span>`;
                        } else if (row.status == 'ad') {
                            return `<span class="badge badge-info"> Sys Admin </span>`;
                        } else {
                            return `<span class="badge badge-danger"> ${row.status.toUpperCase()} </span>`;
                        }
                    }
                },
                {
                    field: 'action',
                    title: 'Action',
                    template: function (row) {
                    let activateOrDeactivate, validate_delete;
                    const maindata = JSON.stringify(row).replace(/'/g, ":::");
            
                    if (row.status == "d") {
                        activateOrDeactivate = `<a href="#" class="dropdown-item ps_document_table_edit_btn" data-getid="${row.documentID}" data-getname="deactivate_document" data-getdata="${row.fileName.toUcwords()}" data-activate="activate"><i class="icon-checkmark3 mr-2"></i> Reactivate</a>`;
                    } else {
                        activateOrDeactivate = `<a href="#" class="dropdown-item ps_document_table_edit_btn" data-getid="${row.documentID}" data-getname="deactivate_document" data-getdata="${row.fileName.toUcwords()}" data-activate="deactivate"><i class="icon-blocked mr-2"></i> Deactivate</a>`;
                    }
            
                    if ($('.hidden_delete_for_admin').val() == 'admin') {
                        validate_delete = `<a href="#" class="dropdown-item ps_document_table_edit_btn" data-getid="${row.documentID}" data-getname="delete_document" data-getdata="${row.fileName.toUcwords()}"><i class="icon-close2 mr-2"></i> Delete</a>`;
                    } else {
                        validate_delete = '';
                    }
                    return `
                        <div class="dropdown" > 
                            <a href="#" class="  m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown">
                                <i class="icon-menu7" style="font-size:20px"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right">
                                <a class="ps_document_table_edit_btn dropdown-item" href="#" data-getid="`+ row.documentID + `" data-maindata='${maindata}' data-getname="assign_user"><i class="icon-add mr-2"></i></i>Assign User</a> 
                                <a class="ps_document_table_edit_btn dropdown-item" href="#" data-getid="`+ row.documentID + `" data-getname="specific_document" data-maindata='${maindata}'><i class="icon-pencil mr-2"></i></i>Edit Details</a> 
                                ${activateOrDeactivate}
                                ${validate_delete}
                            </div>
                        </div>
                    `;
                    }
                },
            ],
        });
    }

    // Action Button Click Event
    $(document).on("click.tablebtnclicks", "a.ps_document_table_edit_btn", function(){

        if ($(this).data('activate')) {
            deactivate_activate = $(this).data('activate');
        }

        var dataId = $(this).data('getid');
        var getname = $(this).data('getname');
        let getdata = $(this).data('getdata');
        var thisElement = $(this);
        //Check if button clicked is the delete or edit
        if (getname === "delete_document") {
            //Delete warning alert
            Toast.fire({
                title: 'Are you sure?',
                text: 'You want to delete '+(getdata)+ '?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!'
            }).then(function(result) {
                //Check if yes is clicked
                if (result.value) {
                    //Delete Item
                    if (deleteDocument(getname, dataId, getdata)) {
                        //Result alert
                        Toast.fire(
                            'Deleted!',
                            'Item has been deleted.',
                            'success'
                        )
                    }
                }
            });
        } else if (getname === "deactivate_document") {
            //Deactivate warning alert
            let mssg;
            if (deactivate_activate == "activate") {
                mssg = 'Are you sure you want to reactivate '+getdata+ '?';
            } else {
                mssg = 'Are you sure you want to deactivate '+getdata+ '?';
            }
            Toast.fire({
                text: mssg,
                icon: "warning",
                showConfirmButton : true,
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, do it !",
            }).then((result) => {
            if (result.isConfirmed) {
                //Check if yes is clicked
                if (result.value) {
                    //Delete Item
                    if (deactivateDocument(getname, dataId, deactivate_activate)) {
                        let title; 
                        if (deactivate_activate == "activate") {
                            title = 'Reactivate successful';
                            mssg = 'is reactivated.';
                        } else {
                            title = 'Deactivate successful';
                            mssg = 'is deactivated.';
                        }
                        //Result alert
                        Toast.fire(
                            title,
                            getdata + ' ' + mssg,
                            'success',
                        )
                        
                    }
                }
            }
            });
            
        } else if(getname == 'assign_user') {
            let maindata = JSON.stringify(thisElement.data("maindata")).replace(/:::/g, "'");
            maindata = JSON.parse(maindata);
            //assign user method
            assignUser(maindata);

        } else {
            let maindata = JSON.stringify(thisElement.data("maindata")).replace(/:::/g, "'");
            maindata = JSON.parse(maindata);
            //Update data method
            updateDocument(maindata);
        }
    });

    function updateDocument(maindata) {
        // pageDropZone();
        if (maindata) {
            if (maindata.fileName) {
                let list = [maindata.fileName];
                for (let i = 0; i < list.length; i++) {
                    FileNamesHolder.push(list[i]+'*^*^any_div');
                }
            }
            $('.ps_manage_document_hiddenid').val(maindata.documentID);
            $('.ps_document_upload_dropzone_rename').val(maindata.fileName);
        } else {
            $('.ps_manage_document_hiddenid').val('');
            $('.ps_document_upload_dropzone_rename').val('');
        }
        $('html, body').animate({scrollTop: 0}, "slow");
    }

    // Deactivate function
    function deactivateDocument(getname, dataId, deactivate_activate) {
        socket.off('deactivate');
        socket.off(melody.melody1+'_'+getname); 

        socket.emit('deactivate', {
            melody1: melody.melody1,
            melody2: melody.melody2,
            param: getname,
            dataId: dataId,
            checker: deactivate_activate
        });

        //Response from deactivate
        socket.on(melody.melody1+'_'+getname, (data)=>{
            if (data['type'] == 'error') {
                console.log(data['message']);
                return false;
            } else if (data.type == "caution") {
                Toast.fire({
                    text: data.message,
                    icon: 'warning',
                    padding: '1em'
                })
                return false;
            } else {
                DocumentTableFetch();
                return true;
            } 
        });
    }

    // Assign User function
    function assignUser(maindata) {
        if (maindata) {
            $('.ps_document_assign_user_hiddenid').val(maindata.documentID);
        } else {
            $('.ps_document_assign_user_hiddenid').val('');
        }
        $('.ps_document_assign_user_modal_btn').trigger('click');
        userDropdown();
    }

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
            //Get json content from deactivation code
            if (data.type == "error") {
                console.log(data.message);
            } else {
                $('select.ps_document_assign_user_dropdown').html(`<option value="" ${holdUser !== undefined ? '' : 'selected'}> Select User </option>`);
                data.forEach(function (item, index) {
                    $('select.ps_document_assign_user_dropdown').append(`<option value="${item.userID}"> ${item.userID}</option>`);
                });
            }
        });
    }

    // DropZone Function
    pageDropZone();
    function pageDropZone() {
        setTimeout(function () {
            FileNamesHolder = [];
            UploadChecker = 0;
            DropZone('ps_dropzone_input', '#dcdcdc', dropZoneIcons, {
                requestType: 'socket',
                socketObject: socket,
                socketEvent: 'ps_general_file_upload'
            }, 'application/pdf', 0);

            $('.ps_dropzone_title').text('Click to upload pdf here');
            $('.ps_dropzone_subtitle').text(``);
            $('.ps_dropzone_inner').addClass('mt-4');
        }, 200);
    }


    
    //Dropzone filenames holder
    let FileNamesHolder = []

    let UploadChecker = 0

    //Dropzone file data holder
    const FileDataHolder = {}

    function DropZone(DivIdName, color, icons, streamOptions, accept, numberOfFiles) {
        const _element = document.getElementById(DivIdName)
        let _dropZonePreview = ''
        const byte = 600 * 600

        const _init = () => {
            _setDropZone()
        }

        const _setDropZone = () => {
            FileDataHolder[DivIdName] = 
            _element.innerHTML = `
                <input type="file" class="${DivIdName}_input" name="${DivIdName}_input[]" id="${DivIdName}_input" data-divname="${DivIdName}" ${numberOfFiles && numberOfFiles == 1 ? '' : 'multiple="multiple"'} accept="${accept && accept != undefined ? accept : '*'}">
                <label class="${DivIdName}_label" id="${DivIdName}_label" data-divname="${DivIdName}" for="${DivIdName}_input">
                    <div class="${DivIdName}_inner p-3" id="${DivIdName}_inner" data-divname="${DivIdName}">
                        ${_setInitialTitle()}
                    </div>
                </label>
            `
            _setStyles()

            _dropZonePreview = document.getElementById(DivIdName+'_inner')

            _onDropEvent(DivIdName+'_label')
            _onFileInputChange(DivIdName+'_input')
        }

        const _setInitialTitle = () => {
            return (`
                <span class="${DivIdName}_title">
                    Click to upload files here.
                </span> <br>
                <span class="${DivIdName}_subtitle">
                    Or, drag and drop pdf here.
                </span>
            `)
        }

        const _setStyles = () => {
            //Style input element
            document.getElementById(DivIdName+'_input').style.width = "0.1px"
            document.getElementById(DivIdName+'_input').style.height = "0.1px"
            document.getElementById(DivIdName+'_input').style.opacity = "0"
            document.getElementById(DivIdName+'_input').style.overflow = "hidden"
            document.getElementById(DivIdName+'_input').style.position = "absolute"
            document.getElementById(DivIdName+'_input').style.zIndex = "-1"

            //Style label element
            document.getElementById(DivIdName+'_label').style.width = "100%"
            document.getElementById(DivIdName+'_label').style.border = "2px dashed " + color
            document.getElementById(DivIdName+'_label').style.textAlign = "center"
            document.getElementById(DivIdName+'_label').style.color = color
            document.getElementById(DivIdName+'_label').style.fontSize = "14px"
            document.getElementById(DivIdName+'_label').style.cursor = "pointer"
            document.getElementById(DivIdName+'_label').style.display = "inline-block"
            document.getElementById(DivIdName+'_label').style.padding = "5%"

            //Style inner div element
            document.getElementById(DivIdName+'_inner').style.width = "100%"
        }

        const _onDropEvent = (element) => {
            if (accept == 'image/*' || accept == 'image/png' || accept == 'image/jpg' || accept == 'image/gif' || accept == 'image/jpeg' || accept == 'image/webp') { } else {
                const _dropZone = document.getElementById(element)
                _dropZone.ondrop = function(e) {
                    e.preventDefault();
                    if (FileDataHolder[e.target.dataset.divname]) {
                        FileDataHolder[e.target.dataset.divname] = e.dataTransfer.files
                        _sendFileServer(e.target.dataset.divname, 0, streamOptions.requestType)
                    }
                    _displayFiles(e, e.dataTransfer.files, 'ondrop')
                    UploadChecker += e.dataTransfer.files.length
                }

                _dropZone.ondragover = function () {
                    _dropZone.style.borderColor = "#000"
                    _dropZone.style.color = "#000"
                    return false
                }
            
                _dropZone.ondragleave = function () {
                    _dropZone.style.border = "2px dashed " + color
                    _dropZone.style.color = color
                    return false
                }
            
                _dropZone.ondragenter = function () {
                    _dropZone.style.border = "2px dashed " + color
                    _dropZone.style.color = color
                    return false
                }
            }
        }

        const _onFileInputChange = (element) => {
            const _dropZoneInput = document.getElementById(element)
            _dropZoneInput.onchange = function(e) {
                e.preventDefault()
                if (FileDataHolder[e.target.dataset.divname]) {
                    FileDataHolder[e.target.dataset.divname] = e.target.files
                    _sendFileServer(e.target.dataset.divname, 0, streamOptions.requestType)
                }
                _displayFiles(e, e.target.files, 'onselect')
                UploadChecker += e.target.files.length
            }
        }

        const _displayFiles = (event, files, eventType) => {
            if (files) {
                _dropZonePreview.innerHTML = `<div class="row ${DivIdName}_inner_display_div" id="${DivIdName}_inner_display_div"> </div>`
                let iconsHtml = ''
                for (i = 0; i < files.length; i++) {
                    let imageIdName = DivIdName+'_image_'+i
                    let imageProgressName = DivIdName+'_progress_'+i
                    let ext = files[i].type.split('/')

                    if (ext[1] == "png" || ext[1] == "jpg" || ext[1] == "jpeg" || ext[1] == "heic" || ext[1] == "webp") {
                        iconsHtml += (`
                            <div class="col-md-${numberOfFiles && numberOfFiles == 1 ? '12' : '3'} mb-2"> 
                                <img id="${imageIdName}" class="" style="width=auto; height:80px"/> 
                                <span class="text-dark d-block mb-1" style="cursor:text;"> ${files[i].name} </span>
                                <div class="progress br-30">
                                    <div class="progress-bar bg-primary progress-bar-striped progress-bar-animated" role="progressbar" id="${imageProgressName}" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
                                </div>
                            </div>
                        `)
                        _readAndDisplay(event, imageIdName, i, files, eventType)

                    } else if (ext[1] == "pdf" || ext[1] == "pdf-x") {
                        iconsHtml += (`
                            <div class="col-md-${numberOfFiles && numberOfFiles == 1 ? '12' : '3'} mb-2"> 
                                ${icons.pdf} 
                                <span class="text-dark d-block mb-1" style="cursor:text; font-size:12px;"> ${files[i].name} </span> 
                                <div class="progress br-30">
                                    <div class="progress-bar bg-primary progress-bar-striped progress-bar-animated" role="progressbar" id="${imageProgressName}" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
                                </div>
                            </div>
                        `)

                    } else if (ext[1] == "pptx" || ext[1] == "ppt" || ext[1] == "txt" || ext[1] == "docs" || ext[1] == "doc" || ext[1] == "docx" || ext[1] == "vnd.openxmlformats-officedocument.wordprocessingml.document") {
                        iconsHtml += (`
                            <div class="col-md-${numberOfFiles && numberOfFiles == 1 ? '12' : '3'} mb-2"> 
                                ${icons.doc} 
                                <span class="text-dark d-block mb-1" style="cursor:text; font-size:12px;"> ${files[i].name} </span> 
                                <div class="progress br-30">
                                    <div class="progress-bar bg-primary progress-bar-striped progress-bar-animated" role="progressbar" id="${imageProgressName}" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
                                </div>
                            </div>
                        `)

                    } else if (ext[1] == "csv" || ext[1] == "vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                        iconsHtml += (`
                            <div class="col-md-${numberOfFiles && numberOfFiles == 1 ? '12' : '3'} mb-2"> 
                                ${icons.spreadsheet} 
                                <span class="text-dark d-block mb-1" style="cursor:text; font-size:12px;"> ${files[i].name} </span> 
                                <div class="progress br-30">
                                    <div class="progress-bar bg-primary progress-bar-striped progress-bar-animated" role="progressbar" id="${imageProgressName}" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
                                </div>
                            </div>
                        `)

                    } else {
                        iconsHtml += (`
                            <div class="col-md-${numberOfFiles && numberOfFiles == 1 ? '12' : '3'} mb-2"> 
                                ${icons.other}
                                <span class="text-dark d-block mb-1" style="cursor:text; font-size:12px;"> ${files[i].name} </span> 
                                <div class="progress br-30">
                                    <div class="progress-bar bg-primary progress-bar-striped progress-bar-animated" role="progressbar" id="${imageProgressName}" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
                                </div>
                            </div>
                        `)
                    }
                }
                document.getElementById(DivIdName+'_inner_display_div').innerHTML = iconsHtml
            } else {
                _dropZonePreview.innerHTML = '<div></div>'
            }
        }

        const _readAndDisplay = (event, imageIdName, index, mainFiles, eventType) => {
            let reader = new FileReader()
            reader.onload = function () {
                let output = document.getElementById(imageIdName)
                output.src = reader.result
            }

            if (eventType == "onselect") {
                reader.readAsDataURL(event.target.files[index])
            } else {
                reader.readAsDataURL(mainFiles[index])
            }
        }

        const _sendFileServer = (divname, index, requestType) => {
            const fileName = _generateFileName(FileDataHolder[divname][index].name)
            _readToSend(index, fileName, 0, byte, requestType, divname)
        }

        const _readToSend = (index, fileName, start, unit, requestType, divname) => {
            const file = FileDataHolder[divname][index]
            let reader = new FileReader()
            let slice =  file.slice(start, start + unit)
            reader.readAsDataURL(slice)
            reader.onload = function () {
                let result = reader.result
                if (requestType == 'socket') {
                    _socketRequest({
                        divname: divname,
                        index: index,
                        name: fileName,
                        type: file.type,
                        size: file.size,
                        start: start,
                        unit: unit,
                        data: result.toString()
                    })
                } else {

                }
            }
        }

        const _socketRequest = (fileData) => {
            streamOptions.socketObject.emit(streamOptions.socketEvent, fileData, (response) => {
                const percentage = Math.floor((Number(response.start) / Number(response.size)) * 100)

                const progressIdName = response.divname+'_progress_'+response.index
                const progressBar = document.getElementById(progressIdName)

                if (response.status == 'more') {
                    progressBar.setAttribute("style", "width: "+percentage+"%")
                    progressBar.setAttribute("aria-valuenow", percentage)
                    progressBar.innerHTML = percentage+"%"

                    _readToSend(response.index, response.name, response.start, response.unit, 'socket', response.divname)
                } else {
                    // console.log(response.name, ' has finished uploading!, at => start:', response.start, ' unit:', response.unit, ' size:', fileData.size)
                    progressBar.setAttribute("style", "width: 100%")
                    progressBar.setAttribute("aria-valuenow", 100)
                    progressBar.innerHTML = "100%"
                    progressBar.classList = 'progress-bar bg-primary'

                    FileNamesHolder.push(response.name+'*^*^'+response.divname)

                    let index = (Number(response.index) + 1)
                    if (FileDataHolder[response.divname].length > index) {
                        _sendFileServer(response.divname, index, 'socket')
                    } else {
                        delete FileDataHolder[response.divname]
                    }
                }
            })
        }

        const _httpRequest = () => {

        }

        const _generateFileName = (fileName) => {
            let ext = fileName.split(/\.(?=[^\.]+$)/)
            fileName = fileName.toString().split('.'+ext[ext.length - 1]).join("")
            fileName = fileName.toString().split(',').join("_")
            ext = ext[ext.length - 1].toLowerCase()
            return fileName.toString().split(' ').join("_") + '_' + _shuffle('aqwertyuioasdfghjklzxcvbnm123456789').substr(10, 10)+'.'+ext
        }

        const _shuffle = (value) => {
            let a = value.toString().split(""), n = a.length
            for (let i = n - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1))
                let tmp = a[i]
                a[i] = a[j]
                a[j] = tmp
            }
            return a.join("")
        }

        _init()
    }

    function FilterFileNames(FileNamesHolder) {
        let fileNames = []
        if (Array.isArray(FileNamesHolder) && FileNamesHolder.length > 0) {
            for (let i = 0; i < FileNamesHolder.length; i++) {
                const fileName = FileNamesHolder[i];
                fileNames.push(fileName.split('*^*^')[0])
            }
        }
        return fileNames
    }
    

});

