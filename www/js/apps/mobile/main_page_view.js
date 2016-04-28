define(["app",
    "tpl!apps/mobile/templates/landing_page.tpl",
    "tpl!apps/mobile/templates/left_menu.tpl",
    "tpl!apps/mobile/templates/charts.tpl"],
        function (SpartaMain, LandingPageTpl, LeftMenuTpl,ChartsTpl) {
            SpartaMain.module("MobileHome.Main", function (Main, SpartaMain, Backbone, Marionette, $, _) {
                
                Main.LandingPage = Marionette.ItemView.extend({
                    template: LandingPageTpl
                });
                Main.LeftMenu = Marionette.ItemView.extend({
                    template: LeftMenuTpl
                });
                Main.ChartsPage = Marionette.ItemView.extend({
                    template: ChartsTpl,
                    onRender: function () {

                    }
                });
            });
            return SpartaMain.MobileHome.Main;
        });
