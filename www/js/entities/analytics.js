define(["app"], function(SpartaMain){
SpartaMain.module("AnalyticsEntities", function(AnalyticsEntities, SpartaMain, Backbone, Marionette, $, _) {

    AnalyticsEntities.Item = Backbone.Model.extend({  
    });
    
    var API = {
             getData: function(url) {
               var defer = $.Deferred();
               var ajax = $.ajax({
                   url: url,
                   type: 'GET'
               });
               ajax.done(function (Data) {
                    var sourceProfile= new AnalyticsEntities.Item();
                    sourceProfile.set(Data);
                    defer.resolve(sourceProfile);
               });
               ajax.fail(function(jqXHR, textStatus, errorThrown) {
                  defer.reject(errorThrown);
              });
               return defer.promise();
            },
            useData: function(Data){
                var sourceProfile= new AnalyticsEntities.Item();
                sourceProfile.set(Data);
                return sourceProfile;
            }
    };
    SpartaMain.reqres.setHandler("getChart:data", function(url) {
        return API.getData(url);
    });
    SpartaMain.reqres.setHandler("useChart:data", function(Data) {
        return API.useData(Data);
    });
});
return ;
});
