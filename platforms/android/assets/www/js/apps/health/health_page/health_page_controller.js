define(["app", "apps/health/health_page/health_page_view", "common/common_view"], function (SpartaMain, View,LoadView) {
    SpartaMain.module("Health.HealthPage", function (HealthPage, SpartaMain, Backbone, Marionette, $, _) {
        HealthPage.Controller = {
            HealthGridPage: function (teamId, modal) {
                 var load = new LoadView.Loading();
                 SpartaMain.MainRegion.show(load);
                require(["entities/common"], function () {
                    var rosterData = SpartaMain.request("common:getModal", "api/get_ath_health_grid");
                    rosterData.done(function (Data) {
                        var form = new HealthPage.AthleteGrid({
                            model: Data
                        });
                            SpartaMain.MainRegion.show(form);
                        
                    });
                    rosterData.fail(function (err) {
                    var error = new LoadView.ServerError({
                        error:err
                    });
                    SpartaMain.MainRegion.show(error);
                    });
                });// end require 
            }
        };

    });
    return SpartaMain.Health.HealthPage.Controller;
});