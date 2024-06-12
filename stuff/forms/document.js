
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
                    <div class="row mb-4">
                        <div class="col-md-12 mt-3 ps_dropzone_action">
                            <label for=""> Upload Document</label>
                            <div class="w-100 ps_dropzone_input" id="ps_dropzone_input"></div>
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