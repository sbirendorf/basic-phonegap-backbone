define(["app",
    "tpl!apps/dashboard/dashboard/templates/dashboard_page_layout.tpl",
    "tpl!apps/dashboard/dashboard/templates/dashboard_error.tpl",
    "backbone.syphon"
],
        function (SpartaMain, DashboardViewTPL,DashboardErrorTPL) {
            SpartaMain.module("Wellness.DashboardPage", function (DashboardPage, SpartaMain, Backbone, Marionette, $, _) {
                DashboardPage.DashboardView = Marionette.ItemView.extend({
                    template: DashboardViewTPL,
                    templateHelpers: function () {
                        return {name: 'Wellness Report'};
                    },
                    onShow: function () {
                        var body = this.model.attributes.body;
                        var head = this.model.attributes.head;
                        var threshold = this.model.attributes.threshold;
                            require(['datatables','wellness','tableFloat'], function () { 
                                wellness_start(head,body,threshold);
                              });
                    }
                });
                DashboardPage.DashboardError = Marionette.ItemView.extend({
                    template: DashboardErrorTPL
                });
            });
            return SpartaMain.Wellness.DashboardPage;
        });

