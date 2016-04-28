define(["app", "apps/health/wellness/create/wellness_create_view","common/common_view"], function (SpartaMain, View,LoadView) {
    SpartaMain.module("Wellness.NewPage", function (NewPage, SpartaMain, Backbone, Marionette, $, _) {
        NewPage.Controller = {
            CreateWellnessPage: function (uid) {
                var load = new LoadView.Loading();
                 SpartaMain.MainRegion.show(load);
                require(["entities/common"], function () {
                    var fetchingData = SpartaMain.request("common:getModalExact", "api/get_wellness");
                    fetchingData.done(function (Data) {
                        var form = new NewPage.New({
                            model: Data,
                            uid: uid
                        });
                        SpartaMain.MainRegion.show(form);

                    });
                    fetchingData.fail(function (err) {
                        var error = new LoadView.ServerError({
                            error: err
                        });
                        SpartaMain.MainRegion.show(error);
                    });
                });// end require 
            },
             tempWellnessPage: function () {
                        var form = new NewPage.Temp({});
                        SpartaMain.MainRegion.show(form);

            }
        };

    });
    return SpartaMain.Wellness.NewPage.Controller;
});