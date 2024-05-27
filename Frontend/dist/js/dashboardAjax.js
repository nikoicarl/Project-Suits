$(document).ready(function () {


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
                console.log(data.message);
            } else {
                if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        let color, icon;

                        if (data[i].activity.toLocaleLowerCase().indexOf("deactivated") != -1) {
                            color = "t-warning";
                            icon = "icon-blocked";
                        } else if (data[i].activity.toLocaleLowerCase().indexOf("logged out") != -1) {
                            color = "t-danger";
                            icon = "icon-exit3";
                        } else if (data[i].activity.toLocaleLowerCase().indexOf("logged in") != -1) {
                            color = "t-info";
                            icon = "icon-check2";
                        } else if (data[i].activity.toLocaleLowerCase().indexOf("sent") != -1) {
                            color = "t-success";
                            icon = "icon-mail5";
                        } else {
                            color = "t-success";
                            icon = "icon-check2";
                        }

                        $('.logig_dashboard_session_activity').append(`
                            <div class="item-timeline timeline-new">
                                <div class="t-dot">
                                    <div class="${color}">
                                        <i class="${icon} text-white  mt-2" style="font-size:19px;"></i>
                                    </div>
                                </div>
                                <div class="t-content">
                                    <div class="t-uppercontent">
                                        <h5 class="mt-2">${data[i].activity.toUcwords()}</h5>
                                        <span class="">${data[i].date_time.fullDateTime()}</span>
                                    </div>
                                </div>
                            </div>`)
                        ;
                    }
                } else {
                    $('.logig_dashboard_session_activity').html(`<h5 class="text-muted">No Session Activities</h5>`);
                }
            }
        });
    }
    

    //================================================================================//

});