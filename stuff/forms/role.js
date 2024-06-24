
function Role() {
    $('.ps_main_page_breadcrumb').html(`Manage Role`);
    $('.ps_main_page_breadcrumb_navigation').html(`Manage Role`);

    return `
        <div class="layout-px-spacing mb-5">
            <div class="row layout-top-spacing">
                <div class="col-md-12" id="ps_role_page_form_display"></div>
            </div>
        </div>
    `;
}


function RoleForm() {
    return `
        <div class="card">
            <div class="card-body">
                <form action="" class="ps_role_form">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group mb-4">
                                <label>Name <span class="text-danger">*</span></label>
                                <input type="text" class="form-control ps_role_name" placeholder="Name" required>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group mb-4">
                                <label>Description </label>
                                <textarea name=""  placeholder="Description" class="form-control ps_role_description" rows="2"></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <button type="submit" class="btn btn-primary ps_role_submit float-right">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Roles</h3>
        
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
                            <th>Role</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Head Of Department</td>
                            <td>This is a description</td>
                            <td>
                                <span class="badge badge-success p-2">Active</span>
                            </td>
                            <td>
                                <a href="" class="p-2"><span class="fa fa-pen mr-1"></span>  Edit</a>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Paralegal</td>
                            <td>This is a description</td>
                            <td>
                                <span class="badge badge-success p-2">Active</span>
                            </td>
                            <td>
                                <a href="" class="p-2"><span class="fa fa-pen mr-1"></span>  Edit</a>
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
    let html = ejs.render(Role(), {});
    $('#ps_main_content_display').html(html);

    html = ejs.render(RoleForm(), {});
    $('#ps_role_page_form_display').html(html);

    addPageScript('roleAjax');
})();