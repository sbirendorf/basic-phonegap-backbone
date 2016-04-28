define(["app"], function(SpartaMain){
SpartaMain.module("CommonEntities", function(CommonEntities, SpartaMain, Backbone, Marionette, $, _) {

    CommonEntities.Item = Backbone.Model.extend({  
    });
    CommonEntities.Items = Backbone.Collection.extend({
            model: CommonEntities.Item
    });
    
    var API = {
            getCommonDataModal: function(url) {   
               var defer = $.Deferred();
               var ajax = $.ajax({
                   url: url,
                   type: 'GET'
               });
               ajax.done(function (Data) {
                    var source= new CommonEntities.Item();
                    source.set(Data.data);
                    defer.resolve(source);
               });
               ajax.fail(function(jqXHR, textStatus, errorThrown) {
                    defer.reject(errorThrown);
              });
               return defer.promise();
            },
            //gets the data exactly from url
            getCommonDataModalExact: function(url) {   
               var defer = $.Deferred();
               var ajax = $.ajax({
                   url: url,
                   type: 'GET'
               });
               ajax.done(function (Data) {
                    var source= new CommonEntities.Item();
                    source.set(Data);
                    defer.resolve(source);
               });
               ajax.fail(function(jqXHR, textStatus, errorThrown) {
                    defer.reject(errorThrown);
              });
               return defer.promise();
            },
            getCommonDataCollection: function(url) {  
                var defer = $.Deferred();
                var url = url;
                var ajax = $.ajax({
                    url: url,
                    type: 'GET'
                });
                ajax.done(function (Data) {
                    var rtnData = new CommonEntities.Items();
                    if (Data.hasOwnProperty('data')) {
                        for (var i = 0; i < Data.data.length; i++) {
                            rtnData.add([Data.data[i]]);
                        }
                    }
                    // console.log(JSON.stringify(rtnData.toJSON()));
                    defer.resolve(rtnData);
                });
                ajax.fail(function (jqXHR, textStatus, errorThrown) {
                    defer.reject(errorThrown);
                });
               return defer.promise();
            },
            setCommonData: function(url) {  
               var defer = $.Deferred();    
               var ajax = $.ajax({
                   url: url,
                   type: 'POST'
               });
               ajax.done(function (Data) {
                    var source= new CommonEntities.Item();
                    source.set(Data);
                    defer.resolve(source);
               });
               ajax.fail(function(jqXHR, textStatus, errorThrown) {
                    defer.reject(errorThrown);
              });
               return defer.promise();
            },
            getCommonDataModalAll: function(url) {   
               var defer = $.Deferred();
               var ajax = $.ajax({
                   url: url,
                   type: 'GET'
               });
               ajax.done(function (Data) {
                    var source= new CommonEntities.Item();
                    source.set(Data);
                    defer.resolve(source);
               });
               ajax.fail(function(jqXHR, textStatus, errorThrown) {
                    defer.reject(errorThrown);
              });
               return defer.promise();
            },
            postCommonData: function (url,data) {
                var defer = $.Deferred();
                var json = JSON.stringify(data);
                var ajax = $.ajax({
                    url: url,
                    data: {"data": json},
                    type: 'POST'
                });
                ajax.done(function (Data) {
                    var rtnData = new CommonEntities.Item();
                    rtnData.set(Data);
                    defer.resolve(rtnData);
                });
                ajax.fail(function (jqXHR, textStatus, errorThrown) {
                     defer.reject(errorThrown);
                });
                
                return defer.promise();
            },
            postFileCommonData: function (url,data) {
                var defer = $.Deferred();
                var json = JSON.stringify(data);
                var ajax = $.ajax({
                    url: url,
                    data: data.fd,
                    processData: false,
                    contentType: false,
                    type: 'POST'
                });
                ajax.done(function (Data) {
                    var rtnData = new CommonEntities.Item();
                    rtnData.set(Data);
                    defer.resolve(rtnData);
                });
                ajax.fail(function (jqXHR, textStatus, errorThrown) {
                     defer.reject(errorThrown);
                });
                
                return defer.promise();
            },
          
    };
    SpartaMain.reqres.setHandler("common:getModal", function(url) {
        return API.getCommonDataModal(url);
    });
    SpartaMain.reqres.setHandler("common:getModalExact", function(url) {
        return API.getCommonDataModalExact(url);
    });  
    SpartaMain.reqres.setHandler("common:getCollection", function(url) {
        return API.getCommonDataCollection(url);
    });
    SpartaMain.reqres.setHandler("common:post", function(url) {
        return API.setCommonData(url);
    });
    SpartaMain.reqres.setHandler("common:postData", function(url,data) {
        return API.postCommonData(url,data);
    });
    SpartaMain.reqres.setHandler("common:postFile", function(url,data) {
        return API.postFileCommonData(url,data);
    }); 
});
return ;
});