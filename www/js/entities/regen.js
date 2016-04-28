define(["app"], function(SpartaMain){
SpartaMain.module("Regen_Entities", function(Regen_Entities, SpartaMain, Backbone, Marionette, $, _) {
     Regen_Entities.Item = Backbone.Model.extend({
    });
    var API = {
            getContactEntities: function(uid) {  
        if(uid ===null || typeof uid === 'undefined' ){
                uid='';
          }
        var defer = $.Deferred();
        var ajax = $.ajax({
            url: '/get_athlete_regen_values/'+uid
        });
        ajax.done(function (regen) {
          var dataRegen =new Regen_Entities.Item();
           dataRegen.set(regen.data);
           defer.resolve(dataRegen);
        });
        return defer.promise();
        }
    };

    SpartaMain.reqres.setHandler("regen:data", function(id) {
        return API.getContactEntities(id);
    });
});
return ;
});