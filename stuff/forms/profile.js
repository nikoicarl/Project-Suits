
function Profile() {
    $('.ps_main_page_breadcrumb').html(`Manage Profile`);
    $('.ps_main_page_breadcrumb_navigation').html(`Manage Profile`);

    return `
        <div class="layout-px-spacing mb-5">
            <div class="row layout-top-spacing">
                <div class="col-md-12" id="ps_profile_page_form_display"></div>
            </div>
        </div>
    `;
}


function ProfileForm() {
    return `
        <div class="card">
            <div class="card-body">
                <form action="" class="ps_profile_form">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group mb-4">
                                <label>Name <span class="text-danger">*</span></label>
                                <input type="text" class="form-control ps_profile_name" placeholder="Name" required>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group mb-4">
                                <label>Description </label>
                                <textarea name=""  placeholder="Description" class="form-control ps_profile_description" rows="2"></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <button type="submit" class="btn btn-primary ps_profile_submit float-right">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    `;
}

(()=>{
    let html = ejs.render(Profile(), {});
    $('#ps_main_content_display').html(html);

    html = ejs.render(ProfileForm(), {});
    $('#ps_profile_page_form_display').html(html);

    addPageScript('profileAjax');
})();