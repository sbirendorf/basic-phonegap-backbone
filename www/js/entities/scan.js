define(["app"], function(SpartaMain){
SpartaMain.module("Scans", function(Scans, SpartaMain, Backbone, Marionette, $, _) {
    Scans.Contact = Backbone.Model.extend({
        defaults: {
            load : 0,
            explode: 0,
            drive: 0,
            date: '0',
            weight:'0',
            id: 0,
            show_scan:0
        },
        initialize: function() {
        }
    });
     Scans.AthleteNeed = Backbone.Model.extend({
        defaults: {
            need1 :'',
            need2: '',
            need3: '',
            need4: '',
            signature:''
        },
        initialize: function() {}
    });
     Scans.AthleteTitle = Backbone.Model.extend({
        defaults: {
            title:'',
            uid:''
        },
        initialize: function() {}
    });
    Scans.ContactCollection = Backbone.Collection.extend({
        model: Scans.Contact
    });
    var API = {
            getContactScans: function(uid) {
            if(uid ===null || typeof uid === 'undefined' ){
                uid='';
            }
        var defer = $.Deferred();
        var ajax = $.ajax({
            url: '/get_all_scan_for_user/'+uid
        });

        ajax.done(function (scans) {
          // initialize the collection
          var allScans= new Scans.ContactCollection();
           // loop through the contacts, create models, add to the collection if we have data
          if(scans.data.load!=='' ||scans.data.drive!==''){
              for(var i=0; i<scans.data.load.length; i++){
                allScans.add([{ id: i, load: scans.data.load[i], explode: scans.data.explode[i], drive: scans.data.drive[i],date: scans.data.date[i],weight:scans.data.weight[i],signature:scans.data.signature[i] }]);
                }
          }else{ 
            allScans.add([{ id: 0, load: 0, explode: 0, drive: 0,date: '0',weight:0,signature:'0' }]);
            allScans.add([{ id: 1, load: 0, explode: 0, drive: 0,date: '0',weight:0,signature:'0' }]);
          }
              athleteTitle = new Scans.AthleteTitle({title:scans.data.title});
          defer.resolve(allScans);
        });
        return defer.promise();
        },
        getAthleteNeed: function(load,explode,drive,signature,uid){
        if(uid ===null || typeof uid === 'undefined' ){
                uid='';
        }
        var defer = $.Deferred();
        var ajax = $.ajax({
            url: '/get_athlete_body_need/'+load+'/'+explode+'/'+drive+'/'+signature+'/'+uid
        });
        ajax.done(function (needs) {
          var needData =new Scans.AthleteNeed({id:0,need1:needs.data.need1,need2:needs.data.need2,need3:needs.data.need3,need4:needs.data.need4,signature:needs.data.signature});
          defer.resolve(needData);
        });
        return defer.promise();
        }
    };

    SpartaMain.reqres.setHandler("scan:data", function(id) {
        return API.getContactScans(id);
    });
    SpartaMain.reqres.setHandler("athleteNeed:data", function(load,explode,drive,signature,uid) {
        return API.getAthleteNeed(load,explode,drive,signature,uid);
    });
});
return ;
});
