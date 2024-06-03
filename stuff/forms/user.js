
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
    `;
}

(()=>{
    let html = ejs.render(User(), {});
    $('#ps_main_content_display').html(html);

    html = ejs.render(UserForm(), {});
    $('#ps_user_page_form_display').html(html);

    addPageScript('userAjax.js');
})();