define(["app"], function(SpartaMain){
SpartaMain.module("Facts_Entities", function(Facts_Entities, SpartaMain, Backbone, Marionette, $, _) {
    Facts_Entities.Contact = Backbone.Model.extend({
        defaults: { },
        initialize: function() {
        }
    });
    Facts_Entities.FullFact = Backbone.Model.extend({
        //model: Facts_Entities.Contact,
        initialize: function() {
        }
    });
     Facts_Entities.FullFacts = Backbone.Collection.extend({
        model: Facts_Entities.FullFact,
    });
    var API = {
            getContactEntities: function(uid) {   
            if(uid ===null || typeof uid === 'undefined' ){
                    uid='';
                }
            var defer = $.Deferred();
            var ajax = $.ajax({
                url: '/get_all_fact_athlete_home/'+uid
            });
            ajax.done(function (fact) {
              var all_facts= new Facts_Entities.FullFacts();
                if(fact.data!==undefined){
                  for(var i=0; i<fact.data.length; i++){
                      var factName=fact.data[i].name;
                       all_facts.add([{id:i, name:factName,meta_nid:fact.data[i].meta_nid,data:fact.data[i]}]);
                    }
                }
              defer.resolve(all_facts);
            });
            return defer.promise();
        }
    };

    SpartaMain.reqres.setHandler("fact:data", function(id) {
        return API.getContactEntities(id);
    });
});
return ;
});