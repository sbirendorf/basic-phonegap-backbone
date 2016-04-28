define(["app",
    "tpl!apps/health/regen/templates/regen_form.tpl",
    "backbone.syphon"
],
        function (SpartaMain, WellnessFormTpl) {
            SpartaMain.module("Regen.NewPage", function (NewPage, SpartaMain, Backbone, Marionette, $, _) {

                NewPage.New = Marionette.ItemView.extend({
                    template: WellnessFormTpl,
                    className: 'container',
                    templateHelpers: function () {
                        //find the date today in Y-m-d format
                        Date.prototype.yyyymmdd = function() {         
                        var yyyy = this.getFullYear().toString();                                    
                        var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based         
                        var dd  = this.getDate().toString();                             
                         return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);
                        };  

                        d = new Date();
                        return {uid: this.options.uid,
                               callback: this.options.callback,
                               today: d.yyyymmdd()};
                    },
                    events: {
                        "submit": "saveClicked",
                        "mouseover .js-datepicker": "createDatePicker"
                    },
                     createDatePicker: function (e) {
                        $(e.currentTarget).datepicker({
                            dateFormat: "yy-mm-dd",
                            showOtherMonths: true,
                            selectOtherMonths: true
                        });
                    },
                    saveClicked: function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        var data = Backbone.Syphon.serialize(this);
                        var callBack = "health:list";
                        if(data.uid == 0){
                             callBack = "athlete:home";
                        }  
                        require(["apps/health/health_router"], function (Controller) {
                            Controller.trigger("form:submit", data, callBack,'regen');
                        });
                    }
                });

            });
            return SpartaMain.Regen.NewPage;
        });

