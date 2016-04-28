define(["app", "apps/health/screen/create/screen_create_view","common/common_view"], function (SpartaMain, View,LoadView) {
    SpartaMain.module("Screen.NewPage", function (NewPage, SpartaMain, Backbone, Marionette, $, _) {
        NewPage.Controller = {
            CreateScreenPage: function (uid) {
                var load = new LoadView.Loading();
                 SpartaMain.MainRegion.show(load);
                    require(["entities/common"], function () {
                        var fetchingData = SpartaMain.request("common:getModalExact", "api/get_screen");
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
            }
        };

    });
    return SpartaMain.Screen.NewPage.Controller;
});