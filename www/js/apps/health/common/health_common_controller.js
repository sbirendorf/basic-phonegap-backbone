define(["app",
    "entities/common",
    "apps/health/health_router",
    "common/common_view"],
        function (SpartaMain, Model, Router, CommonView) {
            SpartaMain.module("Health.Common", function (Health, SpartaMain, Backbone, Marionette, $, _) {
                Health.Controller = {
                    saveForm: function (data, callBack,type) {
                         var load = new CommonView.LoadingModal();
                        SpartaMain.DialogRegion.show(load);
                        var fetchingData = SpartaMain.request("common:postData",'api/set_'+type, data);
                        fetchingData.done(function (Data) {
                            // check for form validation
                            if (!Data.attributes.error) {
                                SpartaMain.DialogRegion.empty();
                                var msg = new CommonView.Messages({model: Data});
                                // check if the server return an error
                                if (Data.attributes.data.error) {
                                    //display the error from the server 
                                    SpartaMain.MessageRegion.show(msg);
                                } else {
                                    //no error go to callback function
                                   
                                    Router.trigger("" + callBack + "");
                                    var load = new CommonView.Loading();
                                    SpartaMain.MainRegion.show(load);
                                    
                                    SpartaMain.MessageRegion.show(msg);
                                    SpartaMain.DialogRegion.empty();
                                }
                            } else {
                                //form is not valid , render error
                                var msg = new CommonView.FormError({model: Data});
                            }
                        });
                        fetchingData.fail(function (err) {
                            var error = new CommonView.ServerError({
                                error: err
                            });
                            SpartaMain.MainRegion.show(error);
                        });
                    }
                };

            });
            return SpartaMain.Health.Common.Controller;
        });
