
function DataCount() {
    return `
        <section class="content ">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-4 col-4">
                        <div class="small-box bg-info">
                            <div class="inner">
                                <h3 class ="ps_document_count">0</h3>
                                <p>Documents</p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-folder"></i>
                            </div>
                            <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <div class="col-lg-4 col-4">
                        <div class="small-box bg-success">
                            <div class="inner">
                                <h3 class ="ps_department_count">0</h3>
                                <p>Departments</p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-stats-bars"></i>
                            </div>
                            <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <div class="col-lg-4 col-4">
                        <div class="small-box bg-danger">
                            <div class="inner">
                                <h3 class ="ps_user_count">0</h3>
                                <p>Users</p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-person-add"></i>
                            </div>
                            <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;

}
function Document() {
    $('.ps_main_page_breadcrumb').html(`Document`);
    $('.ps_main_page_breadcrumb_navigation').html(`Document`);

    return `
        <div class="layout-px-spacing mb-5">
            <div class="row layout-top-spacing">
                <div class="col-md-12" id="ps_dashboard_page_form_display"></div>
            </div>
        </div>
    `;
}


function Activities() {
    return `
        <div class="card">
            <div class="card-header p-2">
                <h3>Recent Activity</h3>
            </div>
            <div class="card-body">
                <div class="" id="timeline" style="height: 250px;overflow-y: auto;">
                    <div class="ps_dashboard_session_activity"></div>
                </div>
            </div>
        </div>
    `;
}

(()=>{
    let html = ejs.render(Document(), {});
    console.log(html);
    $('#ps_main_content_display').html(html);

    //Add page ajax file(s)
    addPageScript('dashboardAjax');
})();