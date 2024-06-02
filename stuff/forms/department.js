
function Department() {
    $('.ps_main_page_breadcrumb').html(`Manage Department`);
    $('.ps_main_page_breadcrumb_navigation').html(`Manage Department`);

    return `
        <div class="layout-px-spacing mb-5">
            <div class="row layout-top-spacing">
                <div class="col-md-12" id="ps_department_page_form_display"></div>
            </div>
        </div>
    `;
}

function DepartmentForm() {
    return `
        <div class="card component-card_1 mb-5 mt-3">
            <div class="card-body">
                <div class="ps_department_div">
                    <form class="ps_manage_department_form" action="" method="POST">
                        <div class="row">
                            <input type="hidden" class="ps_manage_department_hiddenid">
                            <div class="col-md-4 mt-2">
                                <div class="form-group mb-2">
                                    <label>Department Type <span class="text-danger">*</span></label>
                                    <select class="form-control select_search ps_manage_department_type" required>
                                        <option value="" selected> Department Type </option>
                                        <option value="Individual"> Individual </option>
                                        <option value="Corporate"> Corporate </option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4 mt-2">
                                <div class="form-group mb-2">
                                    <label>Category </label>
                                    <select class="form-control select_search ps_manage_department_category">
                                        <option value="" selected> Category </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group mb-4">
                                    <label>Department Name <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control ps_manage_department_name" placeholder="Department Name" required>
                                </div>
                            </div>
                        </div>
                        <div class="row ps_manage_department_type_change">
                            <div class="col-md-4 mt-2">
                                <div class="form-group mb-4">
                                    <label>Gender </label>
                                    <select class="form-control select_search ps_manage_department_gender">
                                        <option value="" selected> Gender </option>
                                        <option value="Male"> Male </option>
                                        <option value="Female"> Female </option>
                                        <option value="Other"> Other </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 mt-3 text-right">
                                <button class="btn ovasyte-bg-primary ps_manage_department_submit_btn" type="submit"> Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
}

function DepartmentTable() {
    return `
        <div class="row">
            <div class="col-md-12 mt-3">
                <div class="card">
                    <div class="card-body ps_department_data_table_div">
                        <div class="row">
                            <div class="col-md col-sm-12">
                                <select class="form-control ps_manage_department_clienttype">
                                    <option value="" selected> Department Type</option>
                                    <option value="individual"> Individual</option>
                                    <option value="corporate"> Corporate</option>
                                </select>
                            </div>
                            <div class="col-md col-sm-12">
                                <select class="form-control ps_manage_department_category">
                                    <option value="" selected>Category</option>
                                </select>
                            </div>
                            <div class="col-md col-sm-12">
                                <select class="form-control ps_manage_department_subcategory">
                                    <option value="" selected>Sub Category</option>
                                </select>
                            </div>
                            <div class="col-md-2 text-right">
                                <button type="button" class="btn ovasyte-bg-primary ps_manage_department_search_btn"> 
                                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                    Departments
                                </button>
                            </div>
                        </div>
                        <div class="row mt-2 mb-4">
                            <div class="col-md-12">
                                <div class="d-inline-flex w-100">
                                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" class="mt-2" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                    <input type="text" class="ml-3 form-control form-control-sm" id="ps_department_general_search" placeholder="Search table...">
                                </div>
                            </div>
                        </div>
                        <table class="ps_department_data_table" style="text-align:left"></table>
                    </div>
                </div>
            </div>
        </div>
    `;
}




(()=>{
    let html = ejs.render(Department(), {});
    $('#ps_main_content_display').html(html);

    html = ejs.render(DepartmentForm(), {});
    $('#ps_department_page_form_display').html(html);


    //Add page ajax file(s)
    addPageScript('departmentAjax');
})();