function Report() {
$('.ps_main_page_breadcrumb').html(`Document Report`);
$('.ps_main_page_breadcrumb_navigation').html(`Document Report`);

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

    <div class="card">
        <div class="card-header">
            <h3 class="card-title" >Document Report</h3>
    
            <div class="card-tools">
                <div class="input-group input-group-sm" style="width: 150px;">
                    <div class="float-right"><a href="#" class="fa fa-print float-right mt-1 mr-3 text-muted" style="font-size: 1.3rem;"></a></div>
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
                        <th>Document</th>
                        <th>Uploaded By</th>
                        <th>Date Uploaded</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Q4 Finance Report</td>
                        <td>1001</td>
                        <td>4th March , 2024</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Law & Ethics Handout</td>
                        <td>1004</td>
                        <td>2nd July , 2024</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Dispute case 204</td>
                        <td>1002</td>
                        <td>4th February , 2024</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Case 762</td>
                        <td>1001</td>
                        <td>19th August , 2024</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- /.card-body -->
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