define(["app",
    "tpl!apps/health/wellness/templates/wellnes_form.tpl",
    "tpl!apps/health/wellness/templates/wellnes_form_temp.tpl",
    "backbone.syphon"
],
        function (SpartaMain, WellnessFormTpl,TempTpl) {
            SpartaMain.module("Wellness.NewPage", function (NewPage, SpartaMain, Backbone, Marionette, $, _) {

                NewPage.New = Marionette.ItemView.extend({
                    template: WellnessFormTpl,
                    className: 'container',
                    templateHelpers: function () {
                        var size =screen.width;
                        if(screen.width>600){
                            size=600;
                        }
                        return {uid: this.options.uid,
                                callback: this.options.callback,
                                screen: size};
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
                                Controller.trigger("form:submit", data, callBack,'wellness');
                        });
                    },
                    onShow: function () {
                        require(["imageMapLib"], function () {
                            $('#shape1').mapster({
                                    singleSelect : false,
                                    mapKey: 'color',
                                    fill : true,
                                    fillColor : 'FF0000',
                                    fillOpacity : 0.8
                            });
                            call_slider("field_wn_alterness",'slider-range-min',0,6,1);
                            call_slider("field_wn_mood",'slider-range-min1',0,6,1);
                            call_slider("field_wn_physical",'slider-range-min2',0,6,1);
                            call_slider("field_wn_sleep_restful",'slider-range-min3',0,6,1);
                            call_slider("field_wn_soreness",'slider-range-min4',0,6,1);
                            $('#widget').draggable();
                       });
                       
                    }
                });
             NewPage.Temp = Marionette.ItemView.extend({
                  template: TempTpl,
                  onShow: function () {
                        require(["imageMapLib"], function () {
                            $('#shape1').mapster({
                                    singleSelect : false,
                                    mapKey: 'color',
                                    fill : true,
                                    fillColor : 'FF0000',
                                    fillOpacity : 0.8
                            });      
                            $('#widget').draggable();
                       });
                       
                    }
             });     
            });
            return SpartaMain.Wellness.NewPage;
        });

