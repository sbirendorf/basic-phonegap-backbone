define(["app"], function(SpartaMain){
    SpartaMain.module("Ath_info_Entities", function(Ath_info_Entities, SpartaMain, Backbone, Marionette, $, _) {
        Ath_info_Entities.Goal = Backbone.Model.extend({
        });
        Ath_info_Entities.Items = Backbone.Collection.extend({
            model: Ath_info_Entities.Goal
    });
        Ath_info_Entities.Contact = Backbone.Model.extend({
            defaults: {
                nid:'',
                name : '',
                image: '',
                position: '',
                level_up:0,
                level_low:'',
                need1:'',
                need2:'',
                need3:'',
                need4:'',
                id: 0
            },
            initialize: function() {}
        });
        var API = {
            getContactEntities: function(uid) {
            if(uid==='null'|| uid===null|| typeof uid === "undefined"){
                uid='';
            }
            var defer = $.Deferred();
            var ajax = $.ajax({
                url: '/get_all_athlete_information/'+uid
            });
            ajax.done(function (user) {
              var the_user =new Ath_info_Entities.Contact();
               var img=user.data.img;
                if(img===''){
                    img='/sites/all/themes/open_framework-6/backbone/images/anon_user.png';
                  }
              the_user.set({ id: uid,nid:user.data.nid, name: user.data.name, image: img, position: user.data.position,level_up: user.data.level_up, level_low:user.data.level_low
              ,need1:user.data.need1,need2:user.data.need2,need3:user.data.need3,need4:user.data.need4,inj:user.data.inj.status,inj_c:user.data.inj.the_color,inj_status:user.data.inj.status });
              //console.log(JSON.stringify(the_user.toJSON())); 
              defer.resolve(the_user);
            });
            return defer.promise();
            },
            getAthleteGoal: function(uid) {
                if(uid ===null || typeof uid === 'undefined' ){
                    uid='';
                }
                var defer = $.Deferred();
                var ajax = $.ajax({
                    url: '/get_athlete_goal/'+uid
                });
                ajax.done(function (goals) {
                  var rtnGoals =new Ath_info_Entities.Goal();
                  rtnGoals.set({ id:  goals.data});
                 // console.log(JSON.stringify(rtnGoals.toJSON())); 
                  defer.resolve(rtnGoals);
            });
            return defer.promise();
            },
            saveUserImage: function(fd,url) {
            $.ajax({
              url: url,
              data: fd,
              processData: false,
              contentType: false,
              type: 'POST',
              success: function(data){
                alert(data);
                SpartaMain.DialogRegion.reset(); // close the dialog box
                Backbone.history.loadUrl();
              },
              error: function(data){
                  alert(data);
                  SpartaMain.DialogRegion.reset(); // close the dialog box
              } 
            }); 
            },
            getContentAthleteGoal: function(url) {   
                var defer = $.Deferred();
                var url = url;
                var ajax = $.ajax({
                    url: url,
                    type: 'GET'
                });
                ajax.done(function (Data) {
                    var rtnData = new Ath_info_Entities.Items();
                    if (Data.hasOwnProperty('data')) {
                        for (var i = 0; i < Data.data.length; i++) {
                            rtnData.add([Data.data[i]]);
                        }
                    }
                    // console.log(JSON.stringify(rtnData.toJSON()));
                    defer.resolve(rtnData);
                });
                ajax.fail(function (jqXHR, textStatus, errorThrown) {
                    console.log('Error getting data' + errorThrown);
                    defer.reject(errorThrown);
                });
               return defer.promise();
            },
            getContentAthleteGoalItem: function(url) {   
                var defer = $.Deferred();
                var url = url;
                var ajax = $.ajax({
                    url: url,
                    type: 'GET'
                });
                ajax.done(function (Data) {
                    var rtnData = new Ath_info_Entities.Goal();
                    rtnData.set(Data.data);
                    defer.resolve(rtnData);
                    // console.log(JSON.stringify(rtnData.toJSON()));
                    defer.resolve(rtnData);
                });
                ajax.fail(function (jqXHR, textStatus, errorThrown) {
                    console.log('Error getting data' + errorThrown);
                    defer.reject("Opps the page is not available, contact site admin");
                });
               return defer.promise();
            },
            setAthleteGoalForm: function(url,data) {   
                var defer = $.Deferred();
                var newData = new Ath_info_Entities.Goal();
                
                var json = JSON.stringify(data);
                var ajax = $.ajax({
                    url: url,
                    data: {"data": json},
                    type: 'POST'
                });
                ajax.done(function (Data) {
                    var rtnData = new Ath_info_Entities.Goal();
                    rtnData.set(Data);
                    defer.resolve(rtnData);
                });
                ajax.fail(function (jqXHR, textStatus, errorThrown) {
                    console.log('Error getting data' + errorThrown);
                    defer.reject("Opps the page is not available, contact site admin");
                });
                

                return defer.promise();
            }
        };

        SpartaMain.reqres.setHandler("athlete:data", function(id) {
            return API.getContactEntities(id);
        });
        SpartaMain.reqres.setHandler("athleteGoal:data", function(id) {
            return API.getAthleteGoal(id);
        });
         SpartaMain.reqres.setHandler("athleteImg:save", function(fd,url) {
            return API.saveUserImage(fd,url);
        });
        SpartaMain.reqres.setHandler("contentAthleteGoal:data", function(url) {
            return API.getContentAthleteGoal(url);
        });
        SpartaMain.reqres.setHandler("contentAthleteGoal:data", function(url) {
            return API.getContentAthleteGoal(url);
        });
        SpartaMain.reqres.setHandler("contentAthleteGoal:item", function(url) {
            return API.getContentAthleteGoalItem(url);
        });
         SpartaMain.reqres.setHandler("contentAthleteGoal:saveForm", function(url,data) {
            return API.setAthleteGoalForm(url,data);
        });
        
    });
return ;
});

