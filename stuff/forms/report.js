
function Report() {
    $('.ps_main_page_breadcrumb').html(`Report IT Department`);
    $('.ps_main_page_breadcrumb_navigation').html(`Report IT Department`);

    return `
        <div class="layout-px-spacing mb-5">
            <div class="row layout-top-spacing">
                <div class="col-md-12" id="ps_report_page_form_display"></div>
            </div>
        </div>
    `;
}


function ReportForm() {
    return `
        <div class="card">
            <div class="card-body">
                <form action="" class="ps_report_form">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group mb-4">
                                <label>Name <span class="text-danger">*</span></label>
                                <input type="text" class="form-control ps_report_name" placeholder="Name" required>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-4">
                                <label>Email <span class="text-danger">*</span></label>
                                <input type="email" class="form-control ps_report_email" placeholder="example@mail.com" required>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group mb-4">
                                <label>User ID</label>
                                <input type="text" class="form-control ps_report_userID" placeholder="User ID" disabled>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-4">
                                <label>Department </label>
                                <input type="text" class="form-control ps_report_department" placeholder="Department" disabled>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group mb-4">
                                <label>Issue </label>
                                <textarea name=""  placeholder="Issue" class="form-control ps_report_issue" rows="2"></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <button type="submit" class="btn btn-primary ps_report_submit float-right">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `;
}

(()=>{
    let html = ejs.render(Report(), {});
    $('#ps_main_content_display').html(html);

    html = ejs.render(ReportForm(), {});
    $('#ps_report_page_form_display').html(html);

    addPageScript('reportAjax');
})();