define(["app",
    "tpl!apps/health/rpe/templates/rpe_form.tpl",
    "backbone.syphon"
],
        function (SpartaMain, WellnessFormTpl) {
            SpartaMain.module("RPE.NewPage", function (NewPage, SpartaMain, Backbone, Marionette, $, _) {

                NewPage.New = Marionette.ItemView.extend({
                    template: WellnessFormTpl,
                    className: 'container',
                    templateHelpers: function () {
                        var d = new Date();
                         var year = d.getFullYear();
                         var month = d.getMonth()+1;
                         var day = ("0" + d.getDate()).slice(-2);
                         var mins = ("0" + d.getMinutes()).substr(-2);
                         var hours = ("0" + d.getHours()).substr(-2);
                        return {uid: this.options.uid,
                               callback: this.options.callback,
                               now:year+"-"+month+"-"+day+" "+hours+":"+mins+":00"
                           };
                    },
                    events: {
                        "submit": "saveClicked",
                        "mouseover .js-datepicker": "createDatePicker",
                        "click .js-datepicker": "createClassMobile"
                    },
                     createDatePicker: function (e) { 
                         $(e.currentTarget).datepicker({
                            dateFormat: 'yy-mm-dd',
                            onSelect: function(datetext){
                                var d = new Date(); // for now
                                var mins = ("0" + d.getMinutes()).substr(-2);
                                var hours = ("0" + d.getHours()).substr(-2);
                                datetext=datetext+" "+hours+":"+mins+":00";
                                 $(e.currentTarget).val(datetext);
                            }
                        });
                        if(this.options.callback == 'mobile'){
                             $("div#ui-datepicker-div").css("background-color", 'rgb(171, 171, 171)');
                             $("div#ui-datepicker-div").css("padding", '13px');
                             $("div#ui-datepicker-div").css("top", '56px');
                             $("a.ui-state-default").css("color", 'white');
                        }
                    },
                    createClassMobile: function (e) {
                        $("div#ui-datepicker-div").css("top", '56px');
                        $("a.ui-state-default").css("color", 'white');
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
                        //after clicking submit I disable the button so it doesn't get clicked a bunch more times
                        $("input[type=submit]").attr('disabled','true');
                        console.log('here');
                        require(["apps/health/health_router"], function (Controller) {
                            Controller.trigger("form:submit", data, callBack,'rpe');
                        });
                    },
                    onShow:function (e) {
                         $('#main-region').trigger("create");
                         $('#main-region').collapsibleset("refresh"); //This did the trick
                    }
                });

            });
            return SpartaMain.RPE.NewPage;
        });

