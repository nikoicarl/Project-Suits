function Report() {
$('.ps_main_page_breadcrumb').html(`Reports`);
$('.ps_main_page_breadcrumb_navigation').html(`Reports`);

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
                        <select class="form-control select_search ps_report_user"></select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group mb-4">
                        <label>Date Range </label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="far fa-calendar-alt"></i>
                                </span>
                            </div>
                            <input type="text" class="form-control float-right" id="ps_report_date_range">
                        </div>
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