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

<div class="card">
    <div class="card-header">
        <h3 class="card-title">Documents</h3>

        <div class="card-tools">
            <div class="input-group input-group-sm" style="width: 150px;">
                <input type="text" name="table_search" class="form-control float-right" placeholder="Search">

                <div class="input-group-append">
                    <button type="submit" class="btn btn-default">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="card-body table-responsive p-0" >
        <table class="table table-head-fixed text-nowrap">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Document</th>
                    <th>Size</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Law & Ethics Report</td>
                    <td>15MB</td>
                    <td>
                        <a href="" class="badge badge-success p-2"><span class="fa fa-eye mr-1"></span>  View</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- /.card-body -->
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