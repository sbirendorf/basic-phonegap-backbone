define(["app"], function(SpartaMain){
SpartaMain.module("GroupsEntities", function(GroupsEntities, SpartaMain, Backbone, Marionette, $, _) {
     GroupsEntities.returnGroup = Backbone.Model.extend({
        defaults: {
            error:""
        },
        initialize: function() {
        }
    });
    GroupsEntities.GroupForm = Backbone.Model.extend({
        defaults: {
            nid: "",
            name: "",
            active_coach: "",
            not_active_coach:"",
            active_ath:"",
            not_active_ath:"",
            type:""
        },
        validate: function(attribs){
            var errors = {};
            if(attribs.name===''){
                errors.name= "Name is required field.";
            }
//            if(!attribs.team_managers){
//                errors.team_managers= "Group Managers is required field.";
//            }
            if(!attribs.athletes){
                errors.athletes= "Athletes is required field.";
            }
            if( ! _.isEmpty(errors)){
            return errors;
            }
        }
    });
     GroupsEntities.Item = Backbone.Model.extend({
        defaults: {
            nid: "",
            title: "",
            coach_uids: "",
            athlete_uids: ""
        }
    });
    GroupsEntities.Groups = Backbone.Collection.extend({
        model: GroupsEntities.Item
    });
    
    var API = {
            getGroup: function(id,teamId) {  
                // check if we coming from edit or create new 
                if(id >0){
                         var url ="api/edit_group/"+id;
                }else{
                         var url ="api/new_group"+"/"+teamId;; 
                }
               var defer = $.Deferred();
               var ajax = $.ajax({
                   url: url,
                   type: 'GET'
               });
               ajax.done(function (grData) {
                    var theTeam= new GroupsEntities.GroupForm();
                    if(grData.data!==undefined){
                      theTeam.set(grData.data);
                    }
                 defer.resolve(theTeam);
               });
               ajax.fail(function(jqXHR, textStatus, errorThrown) {
                console.log('Error getting data' + errorThrown);
                defer.reject("Opps the page is not available, contact site admin");
              });
               return defer.promise();
            },
            getAllGroups: function (){
                var defer = $.Deferred();
                var url = "api/get_group/0";
                var ajax = $.ajax({
                  url: url,
                  type: 'GET'
              });
              ajax.done(function (Data) {
               var rtnData = new GroupsEntities.Groups();
               if(Data.hasOwnProperty('data')){        
                  for(var i=0; i<Data.data.length; i++){
                      rtnData.add([Data.data[i]]);
                    }
               }
               // console.log(JSON.stringify(rtnData.toJSON()));
                defer.resolve(rtnData);
              });
              ajax.fail(function(jqXHR, textStatus, errorThrown) {
                console.log('Error getting data' + errorThrown);
                defer.reject("Opps the page is not available, contact site admin");
              });
              return defer.promise();
            },
            saveGroup: function(data) {
                var defer = $.Deferred();
                var newData= new GroupsEntities.GroupForm(data,{validate: true});
                if(newData.validationError){
                     var rtnData = new GroupsEntities.returnGroup();
                     rtnData.set({'data':{'msg':newData.validationError,'class':'alert-danger'},'error':true});
                     defer.resolve(rtnData);
                }
                else{
                    var json=JSON.stringify(data);
                    var ajax = $.ajax({
                    url: 'api/save_group',
                    data: {"data" : json },
                    type: 'POST'
                    });
                    ajax.done(function (Data) {
                      var rtnData = new GroupsEntities.returnGroup();
                      rtnData.set(Data);
                      defer.resolve(rtnData);
                    });
                    ajax.fail(function(jqXHR, textStatus, errorThrown) {
                        console.log('Error getting data' + errorThrown);
                        defer.reject("Opps the page is not available, contact site admin");
                    });
                }
                
                return defer.promise();
            },
            deleteGroup: function(id) {
                var defer = $.Deferred();
                var ajax = $.ajax({
                    url: 'api/delete_group/'+id,
                    type: 'POST'
                });
                ajax.done(function (Data) {
                  var rtnData = new GroupsEntities.returnGroup();
                  rtnData.set(Data);
                  defer.resolve(rtnData);
                });
                return defer.promise();
            }
    };
    SpartaMain.reqres.setHandler("oneGroup:data", function(id,teamId) {
        return API.getGroup(id,teamId);
    });
    SpartaMain.reqres.setHandler("allGroups:data", function() {
        return API.getAllGroups();
    });
    SpartaMain.reqres.setHandler("group:saveForm", function(data) {
        return API.saveGroup(data);
    });
    SpartaMain.reqres.setHandler("group:delete", function(id) {
        return API.deleteGroup(id);
    });
});
return ;
});