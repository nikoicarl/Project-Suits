AddDashboardCss();
function AddDashboardCss() {
    let stylesheet = document.getElementById('ps_external_stylesheet');
    stylesheet.href = 'assets/light_css/apexcharts.css';
    // let stylesheet1 = document.getElementById('ps_external_stylesheet1');
    // stylesheet1.href = 'assets/light_css/dash_1.css';
    let stylesheet2 = document.getElementById('ps_external_stylesheet2');
    stylesheet2.href = 'assets/light_css/dash_2.css';
}


function Dashboard() {
    $('.ps_main_page_breadcrumb').html(`DASHBOARD`);
    $('.ps_main_page_breadcrumb_navigation').html(`  
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Dashboard</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item active">Dashboard</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    `);

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
    let html = ejs.render(Dashboard(), {});
    $('#ps_main_content_display').html(html);

    //Add page ajax file(s)
    addExternalScript('assets/js/apexcharts.min.js');
    addPageScript('administration/dashboardAjax');
})();