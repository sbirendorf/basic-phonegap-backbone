define(["app"], function(SpartaMain){
SpartaMain.module("TeamsEntities", function(TeamsEntities, SpartaMain, Backbone, Marionette, $, _) {
     TeamsEntities.returnTeam = Backbone.Model.extend({
        defaults: {
        }
    });
    TeamsEntities.TeamForm = Backbone.Model.extend({
        defaults: {
            nid: 0,
            name: "",
            active_coach: "",
            not_active_coach:"",
            active_gr:"",
            training_gr:"",
            not_active_gr:"",
            pre_season_str_date:"",
            pre_season_end_date:"",
            season_str_date:"",
            season_end_date:"",
            post_season_str_date:"",
            post_season_end_date:"",
            type:""
        },
        validate: function(attribs){
            var errors = {};
            if(attribs.name===''){
                errors.name= "Name is required field.";
            }
            if(!attribs.team_managers){
                errors.active_coach= "Team Managers is required field.";
            }
            if(!attribs.team_pre_date_str){
                errors.active_coach= "Pre season is required field.";
            }
            if(!attribs.team_post_date_end){
                errors.athletes= "Post season is required field.";
            }
            if(attribs.team_pre_date_str !='' && attribs.team_pre_date_end!='' && attribs.team_pre_date_str > attribs.team_pre_date_end){
                errors.preData= "Pre season start date has to be before the Pre season end date.";
            }
            if(attribs.team_sea_date_str !='' && attribs.team_sea_date_end!='' && attribs.team_sea_date_str > attribs.team_sea_date_end){
                errors.seaDate= "Season start date has to be before the Season start end date.";
            }
            if(attribs.team_post_date_str !='' && attribs.team_post_date_end!='' && attribs.team_post_date_str > attribs.team_post_date_end){
                errors.postDate= "Post Season start date has to be before the Post Season end date.";
            }
            if( ! _.isEmpty(errors)){
            return errors;
            }
        }
    });
     TeamsEntities.TeamItem = Backbone.Model.extend({
        defaults: {
            nid: "",
            title: "",
            field_team_post_date_value: "",
            field_team_post_date_value2: "",
            field_team_pr_date_value: "",
            field_team_pr_date_value2: "",
            field_team_sea_date_value: "",
            field_team_sea_date_value2: "",
            groups: "",
            managers: ""
        },
        initialize: function() {
        }
    });
    TeamsEntities.Teams = Backbone.Collection.extend({
        model: TeamsEntities.TeamItem
    });
    TeamsEntities.TeamSchedule = Backbone.Collection.extend({
        model: TeamsEntities.returnTeam
    });
    
    var API = {
            getAllTeams: function (active){//1 for active teams , or "" for all
                if(active===true){
                    var url = "api/get_team_list/"+1;
                }else{
                    var url = "api/get_team_list";
                }
                var defer = $.Deferred();
                var ajax = $.ajax({
                  url: url,
                  type:'GET'
              });
              ajax.done(function (Data) {
               var rtnData = new TeamsEntities.Teams();
               if(Data.hasOwnProperty('data')){        
                  for(var i=0; i<Data.data.length; i++){
                      rtnData.add([Data.data[i]]);
                    }
               }
               // console.log(JSON.stringify(rtnData.toJSON()));
                defer.resolve(rtnData);
              });
              ajax.fail(function(jqXHR, textStatus, errorThrown) {
                defer.reject(errorThrown);
              });
              return defer.promise();
            },
            saveTeam: function(data) {
                var defer = $.Deferred();
                 var newData= new TeamsEntities.TeamForm(data,{validate: true});
                 if(newData.validationError){
                     var rtnData = new TeamsEntities.returnTeam();
                     rtnData.set({'data':{'msg':newData.validationError,'class':'alert-danger'},'error':true});
                     defer.resolve(rtnData);
                }
               else{
                    var json=JSON.stringify(data);
                    var ajax = $.ajax({
                        url: 'api/save_team',
                        data: {"data" : json },
                        type: 'POST'
                    });
                    ajax.done(function (Data) {
                      var rtnData = new TeamsEntities.returnTeam();
                      rtnData.set(Data);
                      defer.resolve(rtnData);
                    });
                    ajax.fail(function(jqXHR, textStatus, errorThrown) {
                        defer.reject(errorThrown);
                    });
                }
                return defer.promise();
            },
             cloneThisTeam: function(id,data) {
                 var defer = $.Deferred();
                 var newData= new TeamsEntities.TeamForm(data,{validate: true});
                 if(newData.validationError){
                     var rtnData = new TeamsEntities.returnTeam();
                     rtnData.set({'data':{'msg':newData.validationError,'class':'alert-danger'},'error':true});
                     defer.resolve(rtnData);
                 }
                 else{
                    var json=JSON.stringify(data);
                    var ajax = $.ajax({
                        url: 'api/clone_team/'+id,
                        data: {"data" : json },
                        type: 'POST'
                    });
                     ajax.done(function (Data) {
                        var rtnData = new TeamsEntities.returnTeam();
                        rtnData.set(Data);
                        localStorage.setItem("team_nid", JSON.stringify(Data.data.team));
                       //console.log(JSON.stringify(rtnData.toJSON()));
                        defer.resolve(rtnData);
                    });
                    ajax.fail(function(jqXHR, textStatus, errorThrown) {
                        defer.reject(errorThrown);
                    });
                }
                return defer.promise();
                
            }
    };
    SpartaMain.reqres.setHandler("team:saveForm", function(data) {
        return API.saveTeam(data);
    });
    SpartaMain.reqres.setHandler("team:clone", function(id,data) {
        return API.cloneThisTeam(id,data);
    });
});
return ;
});