function Document() {
$('.ps_main_page_breadcrumb').html(`Manage Document`);
$('.ps_main_page_breadcrumb_navigation').html(`Manage Document`);

    return `
        <div class="layout-px-spacing mb-5">
            <div class="row layout-top-spacing">
                <div class="col-md-12" id="ps_document_page_form_display"></div>
            </div>
        </div>
    `;
}


function DocumentForm() {
return `
        <div class="card">
            <div class="card-body">
                <form action="" class="ps_document_form">
                    <input type="hidden" name="" class="ps_manage_document_hiddenid">
                    <div class="row mb-4">
                        <div class="col-md-12 mt-3 ps_dropzone_action">
                            <label for=""> Upload Document</label>
                            <div class="w-100 ps_dropzone_input" id="ps_dropzone_input"></div>
                        </div>

                        <div class="col-md-12 mt-3">
                            <label>Give names to selected files (Use comma separated Values). eg. new name one, new name
                                two</label>
                            <input type="text" class="form-control ps_document_upload_dropzone_rename"
                                placeholder="Give names to selected files (Use comma separated Values)">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <button type="submit" class="btn btn-primary ps_document_submit float-right">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="card component-card_1 mb-5 mt-3">
            <div class="card-body ps_document_data_table_div">
                <div class="row mb-4">
                    <div class="col-md-12">
                        <label for="">Search By Document name</label>
                        <div class="form-inline">
                            <div class="input-group" >
                                <input class="form-control form-control-sidebar ps_document_general_search"  placeholder="Search"  id ="ps_document_general_search">
                                <div class="input-group-append">
                                    <button class="btn btn-sidebar">
                                        <i class="fas fa-fw fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <table class="ps_document_data_table" style="text-align:left"></table>
            </div>
        </div>
    `;
}

(()=>{
let html = ejs.render(Document(), {});
$('#ps_main_content_display').html(html);

html = ejs.render(DocumentForm(), {});
$('#ps_document_page_form_display').html(html);


addExternalScript('assets/js/DropZone.js');

addPageScript('documentAjax');
})();