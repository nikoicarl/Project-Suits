function Report() {
    $('.ps_main_page_breadcrumb').html(`Login Report`);
    $('.ps_main_page_breadcrumb_navigation').html(`Login Report`);
    
    return `
    <div class="layout-px-spacing mb-5">
        <div class="row layout-top-spacing">
            <div class="col-md-12" id="ps_login_report_page_form_display"></div>
        </div>
    </div>
    `;
    }
    
    
    function LoginReportForm() {
    return `
        <div class="card">
            <div class="card-body">
                <form action="" class="ps_login_report_form">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group mb-4">
                                <label>Date Range </label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="far fa-calendar-alt"></i>
                                        </span>
                                    </div>
                                    <input type="text" class="form-control float-right" id="ps_login_report_date_range">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <button type="submit" class="btn btn-primary ps_login_report_submit float-right">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" >Login Report</h3>
        
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
                            <th>User </th>
                            <th>Activity </th>
                            <th>Login Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>System Administrator</td>
                            <td>Logged in successfully</td>
                            <td>4th March , 2024</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jessica Pearson</td>
                            <td>Logged in successfully</td>
                            <td>7th June , 2024</td>
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
    
    html = ejs.render(LoginReportForm(), {});
    $('#ps_login_report_page_form_display').html(html);
    
    addPageScript('loginReportAjax');
    })();