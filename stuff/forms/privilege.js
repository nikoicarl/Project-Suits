
function Privilege() {
  $('.ps_main_page_breadcrumb').html(`Manage Privilege`);
  $('.ps_main_page_breadcrumb_navigation').html(`Manage Privilege`);

  return `
      <div class="layout-px-spacing mb-5">
          <div class="row layout-top-spacing">
              <div class="col-md-12" id="ps_privilege_page_form_display"></div>
          </div>
      </div>
  `;
}


function PrivilegeForm() {
  return `
      <div class="card">
          <div class="card-body">
              <form action="" class="ps_privilege_form">
                  <div class="row">
                      <div class="col-md-12">
                          <p class="text-danger">Select the user or role you want to change privilges for</p>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-md-6">
                          <div class="form-group mb-4">
                              <label>User</label>
                              <select class="form-control select_search ps_privilege_user"></select>
                          </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-group mb-4">
                            <label>Role</label>
                            <select class="form-control select_search ps_privilege_role"></select>
                        </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12">
                      
                    </div>
                  </div>
              </form>
          </div>
      </div>

      
  `;
}

(()=>{
  let html = ejs.render(Privilege(), {});
  $('#ps_main_content_display').html(html);

  html = ejs.render(PrivilegeForm(), {});
  $('#ps_privilege_page_form_display').html(html);

  addPageScript('privilegeAjax');
})();