define(["app"], function(SpartaMain){
SpartaMain.module("Landing_Entities", function(Landing_Entities, SpartaMain, Backbone, Marionette, $, _) {
    Landing_Entities.Contact = Backbone.Model.extend({
        defaults: {
            left : 0,
            right: 0,
            date: '0',
            weight:'0',
            id: 0
        },
        initialize: function() {}
    });
    var API = {
        getContactEntities: function(uid) {
                if(uid ===null || typeof uid === 'undefined' ){
                    uid='';
                }
            var defer = $.Deferred();
            var ajax = $.ajax({
                url: '/get_last_landing/'+uid
            });

            ajax.done(function (land) {
              var landing_low =new Landing_Entities.Contact();
              if(land.data!=undefined){
               landing_low.set({ id: 0, left: land.data.left, right: land.data.right, date: land.data.date,extremity: 'Lower' ,weight:land.data.weight});
            }
            // then, return the collection 
              defer.resolve(landing_low);
            });
            ajax.fail(function(jqXHR, textStatus, errorThrown) {
              // build user-friendly error message here
              console.log('Error loading loading data');
              defer.reject("Did not find landing");
            });

            return defer.promise();
        },
        getAllLandings: function(uid) {
                if(uid ===null || typeof uid === 'undefined' ){
                    uid='';
                }
            var defer = $.Deferred();
            var ajax = $.ajax({
                url: 'api/get_all_landing_for_user/'+uid
            });

            ajax.done(function (land) {
              var landing_low =new Landing_Entities.Contact();
              if(land.data!=undefined){
               landing_low.set({ id: 0, left: land.data.left, right: land.data.right, date: land.data.date,extremity: 'Lower' ,weight:land.data.weight});
            }
            // then, return the collection 
              defer.resolve(landing_low);
            });
            ajax.fail(function(jqXHR, textStatus, errorThrown) {
              // build user-friendly error message here
              console.log('Error loading loading data');
              defer.reject("Did not find landing");
            });

            return defer.promise();
        }
    };

    SpartaMain.reqres.setHandler("landing:data", function(id) {
        return API.getContactEntities(id);
    });
    SpartaMain.reqres.setHandler("allLanding:data", function(id) {
        return API.getAllLandings(id);
    });
});
return ;
});