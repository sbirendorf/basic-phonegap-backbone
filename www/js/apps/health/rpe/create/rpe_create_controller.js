define(["app", "apps/health/rpe/create/rpe_create_view","common/common_view"], function (SpartaMain, View,LoadView) {
    SpartaMain.module("RPE.NewPage", function (NewPage, SpartaMain, Backbone, Marionette, $, _) {
        NewPage.Controller = {
            CreateRpePage: function (uid,callback) {
                var load = new LoadView.Loading();
                 SpartaMain.MainRegion.show(load);
                 
                var form = new NewPage.New({
                    uid: uid,
                    callback:callback
                });
                SpartaMain.MainRegion.show(form);
                require(["jquery", "jquery-ui"], function () {});

            }
        };

    });
    return SpartaMain.RPE.NewPage.Controller;
});