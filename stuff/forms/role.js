
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
    `;
}

(()=>{
    let html = ejs.render(Role(), {});
    $('#ps_main_content_display').html(html);

    html = ejs.render(RoleForm(), {});
    $('#ps_role_page_form_display').html(html);

    addPageScript('roleAjax.js');
})();