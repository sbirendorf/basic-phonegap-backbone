define(["app"], function (SpartaMain) {
    SpartaMain.module("Mobile", function (Mobile, SpartaMain, Backbone, Marionette, $, _) {
        Mobile.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "home": 'mobilePage',
                "charts": 'chartPage'
            }
        });

        var API = {
            mobilePage: function () {
                 require(["apps/mobile/main_page_controller"], function (Controller) {
                    Controller.mobileMainPage();
                });
            },
            chartPage: function () {
                 require(["apps/mobile/main_page_controller"], function (Controller) {
                    Controller.mobileChartPage();
                });
            }
        };
         Mobile.on("mobile:start", function () {
            require(["apps/mobile/main_page_controller"], function (Controller) {
                    Controller.mobileMainPage();
                });
        });
        Mobile.on("start", function () {
            SpartaMain.navigate('home');
            new Mobile.Router({
                controller: API
            });
        });
    });
    return SpartaMain.Mobile;
});
 
