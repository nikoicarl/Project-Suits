$(document).ready(function () {

    // Dashboard fetch method
    DashboardFetch();

    // General Dashboard Fetches
    //================================================================================//
    function DashboardFetch() {
        socket.off('dashboardFetches');
        socket.off(melody.melody1 + '_dashboard_data');

        socket.emit('dashboardFetches', {
            melody1: melody.melody1,
            melody2: melody.melody2,
            param: "dashboard_data"
        });

        // Response
        socket.on(melody.melody1 + '_dashboard_data', data => {

            $('.ps_user_count').text(Number(data.totalUsers))
            $('.ps_document_count').text(Number(data.totalDocuments))
            $('.ps_department_count').text(Number(data.totalDepartments))
        });
    }

    // fetch session activity table
    activitiesTableFetch();

    function activitiesTableFetch() {
        socket.off('table');
        socket.off(melody.melody1 + '_dashboard_activities_table');

        socket.emit('table', {
            melody1: melody.melody1,
            melody2: melody.melody2,
            param: 'dashboard_activities_table'
        });


        socket.on(melody.melody1 + '_dashboard_activities_table', (data) => {
            if (data.type == 'error') {
            } else {
                if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        let color, icon;
                        const dateTimeParts = data[i].date_time.split(' ');
                        const time = dateTimeParts[1];

                        if (data[i].activity.toLocaleLowerCase().indexOf("deactivated") != -1) {
                            color = "bg-warning";
                            icon = "icon-close";
                        } else if (data[i].activity.toLocaleLowerCase().indexOf("logged out") != -1) {
                            color = "bg-danger";
                            icon = "fa fa-ban";
                        } else if (data[i].activity.toLocaleLowerCase().indexOf("logged in") != -1) {
                            color = "bg-success";
                            icon = "fa fa-check";
                        } else if (data[i].activity.toLocaleLowerCase().indexOf("uploaded") != -1) {
                            color = "bg-info";
                            icon = "fa fa-folder";
                        } else {
                            color = "bg-success";
                            icon = "fa fa-check";
                        }
                        $('.ps_dashboard_session_activity').append(
                            `<div class="timeline timeline-inverse">
                            <div class="time-label">
                                <span class="${color}">
                                    ${data[i].date_time.fullDate()}
                                </span>
                            </div>
                            <div>
                                <i class="${icon} text-white  mt-2" style="font-size:19px;"></i>
                                <div class="timeline-item">
                                    <span class="time"><i class="far fa-clock"></i> ${time}</span>
                                    <h3 class="timeline-header"><a href="#"></a> ${data[i].activity.toUcwords()}</h3>
                                    <div class="timeline-body"></div>
                                </div>
                            </div>
                        </div>`
                        )
                        ;
                    }
                } else {
                    $('.ps_dashboard_session_activity').html(`<h5 class="text-muted">No Session Activities</h5>`);
                }
            }
        });
    }
    

    //================================================================================//

});