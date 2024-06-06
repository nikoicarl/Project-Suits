
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
                    <div class="form-group row">
                        <div class="col-md-12 ps_voucher_photo_action">
                            <input type="file" class="ps_dropzone_input" name="file[]" id="ps_dropzone_input" multiple="multiple"
                                accept="image/*">
                            <label class="ps_dropzone" id="ps_dropzone" for="ps_dropzone_input">
                                <div class="ps_dropzone_inner p-5" id="ps_dropzone_inner">
                                    <span class="ps_dropzone_title">
                                        Click to upload project images here.
                                    </span> <br>
                                    <span class="ps_dropzone_subtitle">
                                        You can select up to 10 images
                                    </span>
                                </div>
                            </label>
                        </div>
                        <div class="col-12">
                            <label>Give names to selected files (Use comma separated Values). eg. new name one, new name two</label>
                            <input type="text" class="form-control ps_document_upload_dropzone_rename" placeholder="Give names to selected files (Use comma separated Values)">
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

    addPageScript('documentAjax');
})();