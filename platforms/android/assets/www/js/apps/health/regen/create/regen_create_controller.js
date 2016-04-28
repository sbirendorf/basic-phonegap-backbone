define(["app", "apps/health/regen/create/regen_create_view","common/common_view"], function (SpartaMain, View,LoadView) {
    SpartaMain.module("Regen.NewPage", function (NewPage, SpartaMain, Backbone, Marionette, $, _) {
        NewPage.Controller = {
            CreateRegenPage: function (uid) {
                var load = new LoadView.Loading();
                 SpartaMain.MainRegion.show(load);

                var form = new NewPage.New({
                    uid: uid
                });
                SpartaMain.MainRegion.show(form);
                require(["jquery", "jquery-ui"], function () {});

            }
        };

    });
    return SpartaMain.Regen.NewPage.Controller;
});