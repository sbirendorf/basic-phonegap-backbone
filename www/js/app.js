define(["marionette"], function(Marionette){
    var SpartaMain = new Marionette.Application();
   
    SpartaMain.addRegions({
       MainRegion: "#main-region", 
       MenuRegion: "#slide-out-left", 
       MessageRegion: "#message-region",
       DialogRegion: "#dialog-region"
     
    });
    SpartaMain.navigate = function(route,  options){
        options || (options = {});
        Backbone.history.navigate(route, options);
      };

    SpartaMain.getCurrentRoute = function(){
        return Backbone.history.fragment;
      };
    SpartaMain.str = function(){
         Backbone.history.start(); 
      };  
    SpartaMain.addInitializer( function(){   
      require(["apps/health/health_router"], function (health) {health.start();});
      require(["apps/mobile/mobile_router"], function (mobile) { 
         mobile.start();
         setTimeout(function () {
                SpartaMain.str();
		mobile.trigger("mobile:start");
            },50);
      });
     
    });
return SpartaMain;
 });
