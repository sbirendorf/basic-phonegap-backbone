requirejs.config({
  baseUrl: "../www/js",
  paths: {
    backbone: "vendor/backbone-min",
    "backbone.syphon": "vendor/backbone.syphon.min",
    jquery: "vendor/jquery-min",
    "jquery-ui": "vendor/jquery-ui-min",
    json2: "vendor/json2.min",
    marionette: "vendor/backbone.marionette.min",
    underscore: "vendor/underscore-min",
    text: "vendor/text",
    tpl: "vendor/underscore-tpl",
    propertyParser :"vendor/property_parser"
  
    },

  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ["jquery", "underscore", "json2"],
      exports: "Backbone"
    },
    tpl: ["text"],
    marionette: {
      deps: ["backbone"],
      exports: "Marionette"
    },
    "jquery-ui": ["jquery"],
     multiselect: {
      deps: ["jquery","jquery-ui"],
      exports: "multiselect"
    },
    "backbone.syphon": ["backbone"]
  },
   urlArgs: new Date().getTime().toString()
});

require(["marionette"], function(bbm){
  console.log("jQuery version: ", $.fn.jquery);
  console.log("underscore identity call: ", _.identity(5));
  console.log("Marionette: ", bbm);

});
require(["app"], function(SpartaMain){
    SpartaMain.start();
 });
