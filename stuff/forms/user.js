
function User() {
    $('.ps_main_page_breadcrumb').html(`Manage User`);
    $('.ps_main_page_breadcrumb_navigation').html(`Manage User`);

    return `
        <div class="layout-px-spacing mb-5">
            <div class="row layout-top-spacing">
                <div class="col-md-12" id="ps_user_page_form_display"></div>
            </div>
        </div>
    `;
}


function UserForm() {
    return `
        <div class="card">
            <div class="card-body">
                <form action="" class="ps_user_form">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group mb-4">
                                <label>Username <span class="text-danger">*</span></label>
                                <input type="text" class="form-control ps_user_username" placeholder="Username" required>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group mb-4">
                                <label>Password <span class="text-danger">*</span></label>
                                <input type="password" class="form-control ps_user_password" placeholder="Password" required>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="form-group mb-4">
                                <label>Confirm Password </label>
                                <input type="password" class="form-control ps_user_confirm_password" placeholder="Confirm Password" >
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <button type="submit" class="btn btn-primary ps_user_submit float-right">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Users</h3>
        
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
                <table class="table table-head-fixed text-nowrap table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>1001</td>
                            <td>
                                <span class="badge badge-success p-2">Active</span>
                            </td>
                            <td>
                                <a href="" class="p-2"><span class="fa fa-pen mr-1"></span>  Edit</a>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>1002</td>
                            <td>
                                <a href="" class="badge badge-success p-2">Active</a>
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
    let html = ejs.render(User(), {});
    $('#ps_main_content_display').html(html);

    html = ejs.render(UserForm(), {});
    $('#ps_user_page_form_display').html(html);

    addPageScript('userAjax');
})();