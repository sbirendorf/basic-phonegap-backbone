define(["app"], function(SpartaMain){
SpartaMain.module("EventsEntities", function(EventsEntities, SpartaMain, Backbone, Marionette, $, _) {
     EventsEntities.returnEvent = Backbone.Model.extend({
        defaults: {
        }
    });
    EventsEntities.EventForm = Backbone.Model.extend({
        defaults: {
         "nid": "",
         "field_ev_type_value": "",
         "field_ev_opponent_value": "",
         "field_ev_opponent_score_value": "",
         "field_ev_tournament_value": "",
         "field_ev_round_value": "",
         "field_ev_external_ref_value": "",
         "field_ev_venue_value": "",
         "field_ev_team_value": "",
         "field_ev_team_score_value": "",
         "field_ev_date_value": "",
         "field_ev_date_value_time": "",
         "field_ev_date_value2": "",
         "field_ev_date_value2_time": "",
         "field_ev_app_ref_nid": "",
         "field_ev_team_reference_nid_nid": "",
         "type":""
        },
        validate: function(attribs){
            var errors = {};
            if(!attribs.field_ev_team_reference_nid_nid){
                errors.field_ev_team_reference_nid_nid= "Team is required field.";
            }
            //will want to validate it is a team as defined in sparta
//            if(!attribs.field_ev_team_reference_nid_nid){
//                errors.field_ev_team_reference_nid_nid= "Team is required field.";
//            }
            if(!attribs.field_ev_date_value){
                console.log('here');
                errors.field_ev_date_value= "Date field is required.";
            }
            if( ! _.isEmpty(errors)){
                console.log('here');
                return errors;
            }
        }
    });
     EventsEntities.EventItem = Backbone.Model.extend({
        defaults: {
         "nid": "",
         "field_ev_type_value": "",
         "field_ev_opponent_value": "",
         "field_ev_opponent_score_value": "",
         "field_ev_tournament_value": "",
         "field_ev_round_value": "",
         "field_ev_external_ref_value": "",
         "field_ev_venue_value": "",
         "field_ev_team_value": "",
         "field_ev_team_score_value": "",
         "field_ev_date_value": "",
         "field_ev_date_value_time": "",
         "field_ev_date_value2": "",
         "field_ev_date_value2_time": "",
         "field_ev_app_ref_nid": "",
         "field_ev_team_reference_nid_nid": "",
         "type":""
        },
        initialize: function() {
        }
    });
    EventsEntities.Events = Backbone.Collection.extend({
        model: EventsEntities.EventItem
    });
    EventsEntities.EventSchedule = Backbone.Collection.extend({
        model: EventsEntities.returnEvent
    });
    EventsEntities.EventForCalendar = Backbone.Model.extend({  
    });
    var API = {
            getEvent: function(id) {   
                if(id >0){
                   var url ="api/edit_event/"+id;
                }else{
                   var url ="api/new_event"; 
                }
               var defer = $.Deferred();
               var ajax = $.ajax({
                   url: url,
                   type:'GET'
               });
               ajax.done(function (eventData) {
                 var theEvent= new EventsEntities.EventForm();
                 if(eventData.data!==undefined){
                      theEvent.set(eventData.data);
                 }
                 defer.resolve(theEvent);
               });
               ajax.fail(function(jqXHR, textStatus, errorThrown) {
                console.log('Error getting data' + errorThrown);
                defer.reject("Opps the page is not available, contact site admin");
              });
               return defer.promise();
            },
            getEventCalendar: function(startDateTime,endDateTime) {   
               var url ="api/new_event/"+startDateTime+"/"+endDateTime; 
               var defer = $.Deferred();
               var ajax = $.ajax({
                   url: url,
                   type:'GET'
               });
               ajax.done(function (eventData) {
                 var theEvent= new EventsEntities.EventForm();
                 if(eventData.data!==undefined){
                      theEvent.set(eventData.data);
                 }
                 defer.resolve(theEvent);
               });
               ajax.fail(function(jqXHR, textStatus, errorThrown) {
                console.log('Error getting data' + errorThrown);
                defer.reject("Opps the page is not available, contact site admin");
              });
               return defer.promise();
            },
            getAllEvents: function (){
                var url = "api/get_event_list/";
                var defer = $.Deferred();
                var ajax = $.ajax({
                  url: url,
                  type:'GET'
              });
              ajax.done(function (Data) {
               var rtnData = new EventsEntities.Events();
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
                    var sourceProfile= new EventsEntities.EventForCalendar();
                    sourceProfile.set(Data);
                    defer.resolve(sourceProfile);
               });
               ajax.fail(function(jqXHR, textStatus, errorThrown) {
                console.log('Error getting data' + errorThrown);
                defer.reject("Opps the page is not available, contact site admin");
              });
               return defer.promise();
            },
            saveEvent: function(data) {
                var defer = $.Deferred();
                 var newData= new EventsEntities.EventForm(data,{validate: true});
                 if(newData.validationError){
                     console.log('validation error event');
                     var rtnData = new EventsEntities.returnEvent();
                     rtnData.set({'data':{'msg':newData.validationError,'class':'alert-danger'},'error':true});
                     defer.resolve(rtnData);
                }
               else{
                     console.log(data);
                    var json=JSON.stringify(data);
                    var ajax = $.ajax({
                        url: 'api/save_event',
                        data: {"data" : json },
                        type: 'POST'
                    });
                    ajax.done(function (Data) {
                      var rtnData = new EventsEntities.returnEvent();
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
             cloneThisEvent: function(id,data) {
                 var defer = $.Deferred();
                 var newData= new EventsEntities.EventForm(data,{validate: true});
                 if(newData.validationError){
                     var rtnData = new EventsEntities.returnEvent();
                     rtnData.set({'data':{'msg':newData.validationError,'class':'alert-danger'},'error':true});
                     defer.resolve(rtnData);
                 }
                 else{
                    var json=JSON.stringify(data);
                    var ajax = $.ajax({
                        url: 'api/clone_event/'+id,
                        data: {"data" : json },
                        type: 'POST'
                    });
                     ajax.done(function (Data) {
                        var rtnData = new EventsEntities.returnEvent();
                        rtnData.set(Data);
                        localStorage.setItem("event_nid", JSON.stringify(Data.data.event));
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
              deleteEvent: function(id) {
                var defer = $.Deferred();
                var ajax = $.ajax({
                    url: 'api/delete_event/'+id,
                    type: 'POST'
                });
                ajax.done(function (Data) {
                  var rtnData = new EventsEntities.returnEvent();
                  rtnData.set(Data);
                  defer.resolve(rtnData);
                });
                return defer.promise();
            }
    };
    SpartaMain.reqres.setHandler("oneEvent:data", function(id) {
        return API.getEvent(id);
    });
    SpartaMain.reqres.setHandler("eventCalendarNew:data", function(startDateTime,endDateTime) {
        return API.getEventCalendar(startDateTime,endDateTime);
    });
    SpartaMain.reqres.setHandler("allEvents:data", function() {
        return API.getAllEvents();
    });
    SpartaMain.reqres.setHandler("allEventsForCalendar:data", function(url) {
        return API.getData(url);
    });
    SpartaMain.reqres.setHandler("event:saveForm", function(data) {
        return API.saveEvent(data);
    });
    SpartaMain.reqres.setHandler("event:clone", function(id,data) {
        return API.cloneThisEvent(id,data);
    });
    SpartaMain.reqres.setHandler("event:delete", function(id) {
        return API.deleteEvent(id);
    });
});
return ;
});