define(["app"], function(SpartaMain){
SpartaMain.module("UsersEntities", function(UsersEntities, SpartaMain, Backbone, Marionette, $, _) {
     UsersEntities.returnUser = Backbone.Model.extend({
        defaults: {
                    "nid":"",
                    "name":"",
                    "gender":"",
                    "bodyWeight":"",
                    "level":"",
                    "cellPhone":"",
                    "dateOfBirth":"",
                    "homePage":"",
                    "lowerPhaseLevel":"",
                    "lowerPhaseLevelDate":"",
                    "lowerPhaseLevelDateMinusDate":"",
                    "upperPhaseLevel":"",
                    "upperPhaseLevelDate":"",
                    "upperPhaseLevelDateMinusDate":"",
                    "status":"",
                    "privacy":"",
                    "personalBests":"",
                    "externalID":"",
                    "applicationIDs":"",
                    "internalApplicationName":"",
                    "unloggedWorkouts":"",
                    "regenAverage":"",
                    "mail": "",
                    "uid":"",
                    "username":"",
                    "password":"",
                    "filePicture":"",
                    "roles": "",
                    "profileStatus":"",
                    "sport":"",
                    "position":"",
                    "subPosition":""
        }
    });
    UsersEntities.UserForm = Backbone.Model.extend({
        defaults: {
                    "nid":"",
                    "name":"",
                    "gender":"",
                    "bodyWeight":"",
                    "level":"",
                    "cellPhone":"",
                    "dateOfBirth":"",
                    "homePage":"",
                    "lowerPhaseLevel":"",
                    "lowerPhaseLevelDate":"",
                    "lowerPhaseLevelDateMinusDate":"",
                    "upperPhaseLevel":"",
                    "upperPhaseLevelDate":"",
                    "upperPhaseLevelDateMinusDate":"",
                    "status":"",
                    "privacy":"",
                    "personalBests":"",
                    "externalID":"",
                    "applicationIDs":"",
                    "internalApplicationName":"",
                    "unloggedWorkouts":"",
                    "regenAverage":"",
                    "mail": "",
                    "uid":"",
                    "username":"",
                    "password":"",
                    "filePicture":"",
                    "roles": "",
                    "profileStatus":"",
                    "sport":"",
                    "position":"",
                    "subPosition":""
        },
        validate: function(attribs){
            console.log(attribs);
            var errors = {};
            if(!attribs.name){
                console.log('here');
                errors.name= "Name is required field.";
            }
            if(!attribs.email){
                console.log('here');
                errors.email= "Email is required field.";
            }
            if(attribs.gender!="Male" && attribs.gender != "Female"){
                console.log('here');
                errors.gender= "Gender is required field.";
            }
            if(!attribs.dateOfBirth){
                console.log('here');
                errors.dateOfBirth= "Date of Birth is required field.";
            }
            if(attribs.password!=attribs.password_confirm && attribs.password!=""){
                console.log('here');
                errors.dateOfBirth= "Password does not match.  Leave blank to keep same password.";
            }
            if( ! _.isEmpty(errors)){
                return errors;
            }
        }
    });
    //this item has everything for both the user and the athlete profile the nid is the athlete profile nid
     UsersEntities.UserItem = Backbone.Model.extend({
        defaults: {
                    "nid":"",
                    "name":"",
                    "gender":"",
                    "bodyWeight":"",
                    "level":"",
                    "cellPhone":"",
                    "dateOfBirth":"",
                    "homePage":"",
                    "lowerPhaseLevel":"",
                    "lowerPhaseLevelDate":"",
                    "lowerPhaseLevelDateMinusDate":"",
                    "upperPhaseLevel":"",
                    "upperPhaseLevelDate":"",
                    "upperPhaseLevelDateMinusDate":"",
                    "status":"",
                    "privacy":"",
                    "personalBests":"",
                    "externalID":"",
                    "applicationIDs":"",
                    "internalApplicationName":"",
                    "unloggedWorkouts":"",
                    "regenAverage":"",
                    "mail": "",
                    "uid":"",
                    "username":"",
                    "password":"",
                    "filePicture":"",
                    "roles": "",
                    "profileStatus":"",
                    "sport":"",
                    "position":"",
                    "subPosition":""
        },
        initialize: function() {
        }
    });
    UsersEntities.Users = Backbone.Collection.extend({
        model: UsersEntities.UserItem
    });
    UsersEntities.UserSchedule = Backbone.Collection.extend({
        model: UsersEntities.returnUser
    });
    var API = {
            getUser: function(id) {   
                if(id >0){
                   var url ="api/edit_user/"+id;
                }else{
                   var url ="api/new_user"; 
                }
               var defer = $.Deferred();
               var ajax = $.ajax({
                   url: url,
                   type:'GET'
               });
               ajax.done(function (userData) {
                 var theUser= new UsersEntities.UserForm();
                 if(userData.data!==undefined){
                      theUser.set(userData.data);
                 }
                 defer.resolve(theUser);
               });
               ajax.fail(function(jqXHR, textStatus, errorThrown) {
                console.log('Error getting data' + errorThrown);
                defer.reject("Opps the page is not available, contact site admin");
              });
               return defer.promise();
            },
            getAllUsers: function (){
                var url = "api/get_users_list/";
                var defer = $.Deferred();
                var ajax = $.ajax({
                  url: url,
                  type:'GET'
              });
              ajax.done(function (Data) {
               var rtnData = new UsersEntities.Users();
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
             getData: function(url) {
                 console.log(url);
               var defer = $.Deferred();
               var ajax = $.ajax({
                   url: url,
                   type: 'GET'
               });
               ajax.done(function (Data) {
                    var sourceProfile= new UsersEntities.Users();
                    sourceProfile.set(Data);
                    defer.resolve(sourceProfile);
               });
               ajax.fail(function(jqXHR, textStatus, errorThrown) {
                console.log('Error getting data' + errorThrown);
                defer.reject("Opps the page is not available, contact site admin");
              });
               return defer.promise();
            },
            saveUser: function(data) {
                var defer = $.Deferred();
                 var newData= new UsersEntities.UserForm(data,{validate: true});
                 if(newData.validationError){
                     console.log('validation error user');
                     var rtnData = new UsersEntities.returnUser();
                     rtnData.set({'data':{'msg':newData.validationError,'class':'alert-danger'},'error':true});
                     defer.resolve(rtnData);
                }
               else{
                     console.log(data);
                    var json=JSON.stringify(data);
                    var ajax = $.ajax({
                        url: 'api/save_user',
                        data: {"data" : json },
                        type: 'POST'
                    });
                    ajax.done(function (Data) {
                      var rtnData = new UsersEntities.returnUser();
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
            
            
            
             cloneThisUser: function(id,data) {
                 var defer = $.Deferred();
                 var newData= new UsersEntities.UserForm(data,{validate: true});
                 if(newData.validationError){
                     var rtnData = new UsersEntities.returnUser();
                     rtnData.set({'data':{'msg':newData.validationError,'class':'alert-danger'},'error':true});
                     defer.resolve(rtnData);
                 }
                 else{
                    var json=JSON.stringify(data);
                    var ajax = $.ajax({
                        url: 'api/clone_user/'+id,
                        data: {"data" : json },
                        type: 'POST'
                    });
                     ajax.done(function (Data) {
                        var rtnData = new UsersEntities.returnUser();
                        rtnData.set(Data);
                        localStorage.setItem("user_nid", JSON.stringify(Data.data.user));
                       //console.log(JSON.stringify(rtnData.toJSON()));
                        defer.resolve(rtnData);
                    });
                    ajax.fail(function(jqXHR, textStatus, errorThrown) {
                        console.log('Error getting data' + errorThrown);
                        defer.reject("Opps the page is not available, contact site admin");
                    });
                }
                return defer.promise();
                
            },
              deleteUser: function(id) {
                var defer = $.Deferred();
                var ajax = $.ajax({
                    url: 'api/delete_user/'+id,
                    type: 'POST'
                });
                ajax.done(function (Data) {
                  var rtnData = new UsersEntities.returnUser();
                  rtnData.set(Data);
                  defer.resolve(rtnData);
                });
                return defer.promise();
            }
    };
    SpartaMain.reqres.setHandler("oneUser:data", function(id) {
        return API.getUser(id);
    });
    SpartaMain.reqres.setHandler("userCalendarNew:data", function(startDateTime,endDateTime) {
        return API.getUserCalendar(startDateTime,endDateTime);
    });
    SpartaMain.reqres.setHandler("allUsers:data", function(url) {
        return API.getAllUsers(url);
        
    });
    SpartaMain.reqres.setHandler("user:saveForm", function(data) {
        return API.saveUser(data);
    });
    SpartaMain.reqres.setHandler("user:clone", function(id,data) {
        return API.cloneThisUser(id,data);
    });
    SpartaMain.reqres.setHandler("user:delete", function(id) {
        return API.deleteUser(id);
    });
});
return ;
});