define(["app",
    "tpl!apps/health/screen/templates/screen_form.tpl",
    "backbone.syphon"
],
        function (SpartaMain, WellnessFormTpl) {
            SpartaMain.module("Screen.NewPage", function (NewPage, SpartaMain, Backbone, Marionette, $, _) {

                NewPage.New = Marionette.ItemView.extend({
                    template: WellnessFormTpl,
                    className: 'container',
                    templateHelpers: function () {
                        return {uid: this.options.uid,
                                callback: this.options.callback};
                    },
                    events: {
                        "submit": "saveClicked"
                    },
                    saveClicked: function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        var data = Backbone.Syphon.serialize(this);
                        var callBack = "health:list";
                        if(data.uid == 0){
                             callBack = "athlete:home";
                        }  
                        if(SpartaMain.getCurrentRoute()==''){
                             callBack = "mobile:start";
                        }
                        require(["apps/health/health_router"], function (Controller) {
                            Controller.trigger("form:submit", data, callBack,'screen');
                        });
                    },onShow:function (e) {
                         $('#main-region').trigger("create");
                         $('#main-region').collapsibleset("refresh"); //This did the trick
                    }
                });

            });
            return SpartaMain.Screen.NewPage;
        });

