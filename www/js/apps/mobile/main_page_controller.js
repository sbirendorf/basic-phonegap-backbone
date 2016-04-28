define(["app",
    "apps/mobile/main_page_view",
    "common/common_view"],

function (SpartaMain, View,Common) {
    SpartaMain.module("MobileHome.Main", function (Main, SpartaMain, Backbone, Marionette, $, _) {
        Main.Controller = {
            mobileMainPage: function () {
                var menu = new Main.LeftMenu({});
                    SpartaMain.MenuRegion.show(menu);	
                    
                var mobileTest = new Main.LandingPage({});
                    SpartaMain.MainRegion.show(mobileTest);      
            },
            mobileChartPage: function () {  
                var page = new Main.ChartsPage({});
                    SpartaMain.MainRegion.show(page);   
            }
        };
    });
    return SpartaMain.MobileHome.Main.Controller;
});
