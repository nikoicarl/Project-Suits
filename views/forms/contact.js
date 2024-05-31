AddDashboardCss();
function AddDashboardCss() {
    // let stylesheet = document.getElementById('ps_external_stylesheet');
    // stylesheet.href = 'assets/light_css/apexcharts.css';
}


function Dashboard() {
    $('.ps_main_page_breadcrumb').html(`Contact IT Department`);
    $('.ps_main_page_breadcrumb_navigation').html(`  
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Contact IT Department</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item active">Contact IT Department</li>
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


function ContactForm() {
    return `
        <div class="card">
            <div class="card-body">
                <form action="" class="ps_contact_form">
                    <div class="row">
                        <div class="col-md-6">
                            
                        </div>
                        <div class="col-md-6">
                            
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `;
}

(()=>{
    let html = ejs.render(Dashboard(), {});
    $('#ps_main_content_display').html(html);

    //Add page ajax file(s)
    addExternalScript('');
    addPageScript('administration/dashboardAjax');
})();