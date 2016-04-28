define(["app"], function(SpartaMain){
SpartaMain.module("Workout_Entities", function(Workout_Entities, SpartaMain, Backbone, Marionette, $, _) {
    Workout_Entities.Contact = Backbone.Model.extend({
        defaults: {
            title : 'No Workout found',
            status: 'None',
            nid: 0,
            date: '',
            id: 0,
        },
        initialize: function() {}
    });

    Workout_Entities.ContactCollection = Backbone.Collection.extend({
        model: Workout_Entities.Contact
    });
    var API = {
            getContactEntities: function(uid) {
            if(uid ===null || typeof uid === 'undefined' ){
                uid='';
            }
        var defer = $.Deferred();
        var ajax = $.ajax({
            url: '/get_all_athlete_workout/'+uid
        });

        ajax.done(function (workouts) {
          var allWorkout= new Workout_Entities.ContactCollection();
           // loop through the contacts, create models, add to the collection if we have data
            if(workouts.data!==''){
                for(var i=0; i<workouts.data.length; i++){
                    var nice_date=jQuery.trim(workouts.data[i].wo_date).substring(0, 10);// trim the data to nice format
                    allWorkout.add([{ id: i, title: workouts.data[i].title, status: workouts.data[i].wo_status, nid:  workouts.data[i].nid,date: nice_date }]);
                }
        }
         // then, return the collection 
          defer.resolve(allWorkout);
        }); 

        return defer.promise();
        }
    };

    SpartaMain.reqres.setHandler("workout:data", function(id) {
        return API.getContactEntities(id);
    });
});
return ;
});