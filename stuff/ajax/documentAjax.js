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
            UploadChecker = 0
            DropZone('ps_dropzone_input', '#dcdcdc', dropZoneIcons, {
                requestType: 'socket',
                socketObject: socket,
                socketEvent: 'ovasyte_general_file_upload'
            }, 'pdf/*', 1)
            $('.ps_dropzone_title').text('Click to upload pdf here');
            $('.ps_dropzone_subtitle').text(``);
            // $('.ps_cake_drop_zone_label').css('height', '150px');
            $('.ps_dropzone_inner').addClass('mt-4');
        }, 200);
    }


     //Document Table Fetch
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
                field: 'name',
                title: "Document",
                type: 'text',
                template: function (row) {
                    return (row.document).toUcwords();
                }
                },
                {
                    field: 'description',
                    title: "Description",
                    type: 'text'
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
            
                    if (row.status == "d") {
                        activateOrDeactivate = `<a href="#" class="dropdown-item ps_document_table_edit_btn" data-getid="${row.documentID}" data-getname="deactivate_document" data-getdata="${row.document.toUcwords()}" data-activate="activate"><i class="icon-checkmark3 mr-2"></i> Reactivate</a>`;
                    } else {
                        activateOrDeactivate = `<a href="#" class="dropdown-item ps_document_table_edit_btn" data-getid="${row.documentID}" data-getname="deactivate_document" data-getdata="${row.document.toUcwords()}" data-activate="deactivate"><i class="icon-blocked mr-2"></i> Deactivate</a>`;
                    }
            
                    if ($('.hidden_delete_for_admin').val() == 'admin') {
                        validate_delete = `<a href="#" class="dropdown-item ps_document_table_edit_btn" data-getid="${row.documentID}" data-getname="delete_document" data-getdata="${row.document.toUcwords()}"><i class="icon-close2 mr-2"></i> Delete</a>`;
                    } else {
                        validate_delete = '';
                    }
                    return `
                        <div class="dropdown" > 
                            <a href="#" class="  m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown">
                                <i class="icon-menu7" style="font-size:20px"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right">
                                <a class="ps_document_table_edit_btn dropdown-item" href="#" data-getid="`+ row.documentID + `" data-getname="specific_document"><i class="icon-add mr-2"></i></i>Assign User</a> 
                                <a class="ps_document_table_edit_btn dropdown-item" href="#" data-getid="`+ row.documentID + `" data-getname="specific_document"><i class="icon-pencil mr-2"></i></i>Edit Details</a> 
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
                type: 'warning',
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
                            'success'
                        )
                    }
                }
            }
            });
            
        } else {
            //Update data method
            updateDocument(getname, dataId);
        }
    });

    //Update function
    function updateDocument(getname, dataId) {
        socket.off('table');
        socket.off(melody.melody1+'_'+getname); 

        socket.emit('specific', {
            "melody1": melody.melody1,
            "melody2": melody.melody2,
            "melody3": melody.melody3,
            "param": getname,
            "dataId": dataId
        });

        socket.on(melody.melody1+'_'+getname, (data)=>{
            if (data.type == 'error') {
                toast.fire(
                    'Error',
                    data.message,
                    'warning'
                )
            } else {
                $('.ps_manage_document_submit_btn').html('Update');

                if (data) {
                    $('.ps_manage_document_hiddenid').val(data.documentid);
                    $('.ps_manage_document_name').val(data.name.toUcwords());
                    $('.ps_manage_document_description').val(data.description);
                    $('.ps_manage_document_color').val(data.color);
                } else {
                    $('.ps_manage_document_name').val('');
                    $('.ps_manage_document_description').val('');
                    $('.ps_manage_document_hiddenid').val('');
                    $('.ps_manage_document_color').val('');
                    toast.fire(
                        'Oops!!',
                        'Fetching to edit ended up empty',
                        'warning'
                    )
                }
            }
        });
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
                    type: 'warning',
                    padding: '1em'
                })
                return false;
            } else {
                DocumentTableFetch();
                return true;
            } 
        });
    }

    //Delete function
    function deleteDocument(getname, dataId, getdata) {
        socket.off('delete');
        socket.off(melody.melody1+'_'+getname); 

        socket.emit('delete', {
            "melody1": melody.melody1,
            "melody2": melody.melody2,
            "param": getname,
            "dataId": dataId
        });

        //Response from delete
        socket.on(melody.melody1+'_'+getname, function(data){
            if (data.type == "error") {
                console.log(data.message);
            } else if (data.type == "caution") {
                toast.fire({
                    text: data.message,
                    type: 'warning',
                    padding: '1em'
                })
                return false;
            } else{
                Toast.fire(
                    'Deletion successful',
                    getdata.toUcwords() + ' has been deleted',
                    'success'
                )
                DocumentTableFetch();
            }
        });
    }
    

});

