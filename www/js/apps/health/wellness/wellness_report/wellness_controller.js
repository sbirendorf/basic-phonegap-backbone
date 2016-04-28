define(["app",
    "apps/health/wellness/wellness_report/wellness_view",
    "common/common_view", "entities/dashboard"],
        function (SpartaMain, View, Common, Model) {
            SpartaMain.module("Wellness.DashboardPage", function (DashboardPage, SpartaMain, Backbone, Marionette, $, _) {
                DashboardPage.Controller = {
                    wellnessReport: function (grName,date) {
                       var load = new Common.Loading();
                        SpartaMain.MainRegion.show(load);
                        var fetchingData = SpartaMain.request("dashboard:requestItem", "api/wellness_report/"+grName+"/"+date);
                        fetchingData.done(function (Data) {
                            if(Data.attributes.hasOwnProperty('error')){
                                   var page = new DashboardPage.DashboardError({ 
                                        model: Data
                                     });
                                    SpartaMain.MainRegion.show(page);
                            }else{
                                var page = new DashboardPage.DashboardView({ 
                                model: Data
                                 });
                                SpartaMain.MainRegion.show(page);
                            }
                        });

                    }
                };

            });
            return SpartaMain.Wellness.DashboardPage.Controller;
        });