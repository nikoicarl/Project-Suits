
function Privileges() {
    $('.ps_main_page_breadcrumb').html(`Manage Privileges`);
    $('.ps_main_page_breadcrumb_navigation').html(`Manage Privileges`);

    return `
        <div class="layout-px-spacing mb-5">
            <div class="row layout-top-spacing">
                <div class="col-md-12" id="ps_document_page_form_display"></div>
            </div>
        </div>
    `;
}


function PrivilegesForm() {
    return `
       <!--Privilege table-->
          <div id="jsGrid1" class="jsgrid" style="position: relative; height: 100%; width: 100%;">
            <div class="jsgrid-grid-header jsgrid-header-scrollbar">
              <table class="jsgrid-table">
                <tr class="jsgrid-header-row">
                  <th class="jsgrid-header-cell jsgrid-header-sortable" style="width: 150px;">Name</th>
                  <th class="jsgrid-header-cell jsgrid-align-right jsgrid-header-sortable" style="width: 50px;">Age</th>
                  <th class="jsgrid-header-cell jsgrid-header-sortable" style="width: 200px;">Address</th>
                  <th class="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style="width: 100px;">
                    Country</th>
                  <th class="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style="width: 100px;">Is
                    Married</th>
                </tr>
                <tr class="jsgrid-filter-row" style="display: none;">
                  <td class="jsgrid-cell" style="width: 150px;"><input type="text"></td>
                  <td class="jsgrid-cell jsgrid-align-right" style="width: 50px;"><input type="number"></td>
                  <td class="jsgrid-cell" style="width: 200px;">
                    <input type="text">
                  </td>
                  <td class="jsgrid-cell jsgrid-align-center" style="width: 100px;">
                    <select>
                      <option value="0"></option>
                      <option value="1">United States</option>
                      <option value="2">Canada</option>
                      <option value="3">United Kingdom</option>
                      <option value="4">France</option>
                      <option value="5">Brazil</option>
                      <option value="6">China</option>
                      <option value="7">Russia</option>
                    </select>
                  </td>
                  <td class="jsgrid-cell jsgrid-align-center" style="width: 100px;">
                    <input type="checkbox" readonly="">
                  </td>
                </tr>
                <tr class="jsgrid-insert-row" style="display: none;">
                  <td class="jsgrid-cell" style="width: 150px;">
                    <input type="text">
                  </td>
                  <td class="jsgrid-cell jsgrid-align-right" style="width: 50px;">
                    <input type="number">
                  </td>
                  <td class="jsgrid-cell" style="width: 200px;">
                    <input type="text">
                  </td>
                  <td class="jsgrid-cell jsgrid-align-center" style="width: 100px;">
                    <select>
                      <option value="0"></option>
                      <option value="1">United States</option>
                      <option value="2">Canada</option>
                      <option value="3">United Kingdom</option>
                      <option value="4">France</option>
                      <option value="5">Brazil</option>
                      <option value="6">China</option>
                      <option value="7">Russia</option>
                    </select>
                  </td>
                  <td class="jsgrid-cell jsgrid-align-center" style="width: 100px;">
                    <input type="checkbox">
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <!-- /.container-fluid -->
      </section>
      <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->

                    

                    <div class="row">
                        <div class="col-md-12">
                            <button type="submit" class="btn btn-primary ps_document_submit float-right">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `;
}

(()=>{
    let html = ejs.render(Document(), {});
    $('#ps_main_content_display').html(html);

    html = ejs.render(DocumentForm(), {});
    $('#ps_document_page_form_display').html(html);


    addExternalScript('assets/js/DropZone.js');

    addPageScript('documentAjax');
})();