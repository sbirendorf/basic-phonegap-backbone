define(["app"], function(SpartaMain){
SpartaMain.module("DashboardEntities", function(DashboardEntities, SpartaMain, Backbone, Marionette, $, _) {

    DashboardEntities.Item = Backbone.Model.extend({  
    });
    DashboardEntities.BoundaryForm = Backbone.Model.extend({
        defaults: {
            nid: 0,
            type:""
        },
        validate: function(attribs){
            var errors = {};
            if(attribs.name===''){
                errors.name= "Name is required field.";
            }
            if(!attribs.condition){
                errors.condition= "Condition is required field.";
            }
            if(attribs.athlets == null && attribs.groups ==null){
                errors.preData= "Please select team or athletes.";
            }
            if( ! _.isEmpty(errors)){
            return errors;
            }
        }
    });
    DashboardEntities.DashboardForm = Backbone.Model.extend({
        validate: function(attribs){
            var errors = {};
            if(attribs.name===''){
                errors.name= "Name is required field.";
            }
            if(attribs.roles ==null && attribs.manager==null){
                errors.preData= "Please select User or Role.";
            }
            if( ! _.isEmpty(errors)){
            return errors;
            }
        }
    });
    DashboardEntities.FactLayoputForm = Backbone.Model.extend({
        defaults: {
            nid: 0,
            type:""
        },
        validate: function(attribs){
            var errors = {};
            if(attribs.name===''){
                errors.name= "Name is required field.";
            }
            if(attribs.athletes == null && attribs.groups ==null){
                errors.preData= "Please select team or athletes.";
            }
            if( ! _.isEmpty(errors)){
            return errors;
            }
        }
    });
    DashboardEntities.Items = Backbone.Collection.extend({
            model: DashboardEntities.Item
    });
    
    var API = {
            getBoundaryRequestItem: function(url) {   
               var defer = $.Deferred();
               var ajax = $.ajax({
                   url: url,
                   type: 'GET'
               });
               ajax.done(function (Data) {
                    var source= new DashboardEntities.Item();
                    source.set(Data.data);
                    defer.resolve(source);
               });
               ajax.fail(function(jqXHR, textStatus, errorThrown) {
                console.log('Error getting data' + errorThrown);
                defer.reject("Opps the page is not available, contact site admin");
              });
               return defer.promise();
            },
            getBoundaryRequest: function(url) {   
                var defer = $.Deferred();
                var url = url;
                var ajax = $.ajax({
                    url: url,
                    type: 'GET'
                });
                ajax.done(function (Data) {
                    var rtnData = new DashboardEntities.Items();
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
                    defer.reject("Opps the page is not available, contact site admin");
                });
               return defer.promise();
            },
            getSourceProfile: function() {   
               var defer = $.Deferred();
               var ajax = $.ajax({
                   url: 'api/upload_facts_file',
                   type: 'GET'
               });
               ajax.done(function (Data) {
                    var sourceProfile= new DashboardEntities.Item();
                      sourceProfile.set({id :Data.data});
                 defer.resolve(sourceProfile);
               });
               ajax.fail(function(jqXHR, textStatus, errorThrown) {
                console.log('Error getting data' + errorThrown);
                defer.reject("Opps the page is not available, contact site admin");
              });
               return defer.promise();
            },
            setSourceProfile: function(data,type) {
               var defer = $.Deferred();
               var ajax = $.ajax({
                   url: 'api/set_upload_facts_file/'+data.source+'/'+type,
                   data: data.fd,
                   processData: false,
                   contentType: false,
                   type: 'POST'
               });
               ajax.done(function (Data) {
                    var sourceProfile= new DashboardEntities.Item();
                    // if preview 
                    if(type){
                      sourceProfile.set(Data.data);
                    }else{
                        // set the data to fit the common message 
                        sourceProfile.set(Data);
                    }
                 defer.resolve(sourceProfile);
               });
               ajax.fail(function(jqXHR, textStatus, errorThrown) {
                console.log('Error getting data' + errorThrown);
                defer.reject("Opps the page is not available, contact site admin");
              });
               return defer.promise();
            },
            setBoundary: function (url,data) {
                var defer = $.Deferred();
                var newData = new DashboardEntities.BoundaryForm(data, {validate: true});
                if (newData.validationError) {
                    var rtnData = new DashboardEntities.Item();
                    rtnData.set({'data': {'msg': newData.validationError, 'class': 'alert-danger'}, 'error': true});
                    defer.resolve(rtnData);
                }
                else {
                    var json = JSON.stringify(data);
                    var ajax = $.ajax({
                        url: url,
                        data: {"data": json},
                        type: 'POST'
                    });
                    ajax.done(function (Data) {
                        var rtnData = new DashboardEntities.Item();
                        rtnData.set(Data);
                        defer.resolve(rtnData);
                    });
                    ajax.fail(function (jqXHR, textStatus, errorThrown) {
                        console.log('Error getting data' + errorThrown);
                        defer.reject("Opps the page is not available, contact site admin");
                    });
                }

                return defer.promise();
            },
            setDashboardLayout: function (url,data) {
                var defer = $.Deferred();
                var newData = new DashboardEntities.DashboardForm(data, {validate: true});
                if (newData.validationError) {
                    var rtnData = new DashboardEntities.Item();
                    rtnData.set({'data': {'msg': newData.validationError, 'class': 'alert-danger'}, 'error': true});
                    defer.resolve(rtnData);
                }
                else {
                    var json = JSON.stringify(data);
                    var ajax = $.ajax({
                        url: url,
                        data: {"data": json},
                        type: 'POST'
                    });
                    ajax.done(function (Data) {
                        var rtnData = new DashboardEntities.Item();
                        rtnData.set(Data);
                        defer.resolve(rtnData);
                    });
                    ajax.fail(function (jqXHR, textStatus, errorThrown) {
                         defer.reject(errorThrown);
                    });
                }

                return defer.promise();
            },
            setBoundaryRequest: function(url,id) {   
               var defer = $.Deferred();
               var ajax = $.ajax({
                   url: url+"/"+id,
                   type: 'POST'
               });
               ajax.done(function (Data) {
                    var source= new DashboardEntities.Item();
                    source.set(Data);
                    defer.resolve(source);
               });
               ajax.fail(function(jqXHR, textStatus, errorThrown) {
                console.log('Error getting data' + errorThrown);
                defer.reject("Opps the page is not available, contact site admin");
              });
               return defer.promise();
            },
            setFactsLayout: function (url,data) {
                var defer = $.Deferred();
                var newData = new DashboardEntities.FactLayoputForm(data, {validate: true});
                if (newData.validationError) {
                    var rtnData = new DashboardEntities.Item();
                    rtnData.set({'data': {'msg': newData.validationError, 'class': 'alert-danger'}, 'error': true});
                    defer.resolve(rtnData);
                }
                else {
                    var json = JSON.stringify(data);
                    var ajax = $.ajax({
                        url: url,
                        data: {"data": json},
                        type: 'POST'
                    });
                    ajax.done(function (Data) {
                        var rtnData = new DashboardEntities.Item();
                        rtnData.set(Data);
                        defer.resolve(rtnData);
                    });
                    ajax.fail(function (jqXHR, textStatus, errorThrown) {
                        console.log('Error getting data' + errorThrown);
                        defer.reject("Opps the page is not available, contact site admin");
                    });
                }

                return defer.promise();
            },
            setMetaFact: function (url,data) {
                var defer = $.Deferred();
                    var json = JSON.stringify(data);
                    var ajax = $.ajax({
                        url: url,
                        data: {"data": json},
                        type: 'POST'
                    });
                    ajax.done(function (Data) {
                        var rtnData = new DashboardEntities.Item();
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
    SpartaMain.reqres.setHandler("sourceProfile:get", function() {
        return API.getSourceProfile();
    });
    SpartaMain.reqres.setHandler("sourceProfile:set", function(data) {
        return API.setSourceProfile(data,'false');
    });
    SpartaMain.reqres.setHandler("sourceProfile:preview", function(data) {
        return API.setSourceProfile(data,'true');
    });
    SpartaMain.reqres.setHandler("dashboard:request", function(url) {
        return API.getBoundaryRequest(url);
    });
    SpartaMain.reqres.setHandler("dashboard:requestItem", function(url) {
        return API.getBoundaryRequestItem(url);
    });
    SpartaMain.reqres.setHandler("boundary:saveForm", function(url,data) {
        return API.setBoundary(url,data);
    });
    SpartaMain.reqres.setHandler("facts_layout:saveForm", function(url,data) {
        return API.setFactsLayout(url,data);
    });
    SpartaMain.reqres.setHandler("dashboard:post", function(url,id) {
        return API.setBoundaryRequest(url,id);
    });
    SpartaMain.reqres.setHandler("meta_fact:saveForm", function(url,id) {
        return API.setMetaFact(url,id);
    });
    SpartaMain.reqres.setHandler("dashboardLayout:saveForm", function(url,data) {
        return API.setDashboardLayout(url,data);
    });
});
return ;
});