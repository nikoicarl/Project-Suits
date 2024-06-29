
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
   <div class="container mt-5">
        <div class="card">
            <div class="card-body">
                <!-- Personal Information -->
                <h5>Personal Information</h5>
                <form action="" class="ps_profile_form">
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label>First Name <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" placeholder="First Name" required>
                        </div>
                        <div class="form-group col-md-8">
                            <label>Last Name <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" placeholder="Last Name" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label>Phone <span class="text-danger">*</span></label>
                            <input type="tel" class="form-control" placeholder="Phone" required>
                        </div>
                        <div class="form-group col-md-8">
                            <label>Address</label>
                            <input type="text" id="autocomplete" class="form-control" placeholder="Address">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label>Email Address</label>
                            <input type="email" class="form-control" placeholder="Email Address">
                        </div>
                    </div>
                    <!-- Account Changes -->
                    <h5>Account Changes</h5>
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label>Current Password <span class="text-danger">*</span></label>
                            <input type="password" class="form-control" placeholder="Current Password" required>
                        </div>
                        <div class="form-group col-md-4">
                            <label>New Password <span class="text-danger">*</span></label>
                            <input type="password" class="form-control" placeholder="New Password" required>
                        </div>
                        <div class="form-group col-md-4">
                            <label>Confirm Password <span class="text-danger">*</span></label>
                            <input type="password" class="form-control" placeholder="Confirm Password" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-12 text-right">
                            <button type="submit" class="btn btn-primary ps_profile_submit">Save Changes</button>
                        </div>
                    </div>
                </form>
            </div>
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