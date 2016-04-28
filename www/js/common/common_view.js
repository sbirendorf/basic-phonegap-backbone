 define(["app",
        "tpl!common/templates/load.tpl",
        "tpl!common/templates/message.tpl",
        "tpl!common/templates/clone_helptext.tpl",
        "tpl!common/templates/load_modal.tpl"],
       function(SpartaMain, loading_Tpl,message_Tpl, customMessageTpl,loadingModalTpl){
 SpartaMain.module("AppCommon.CommonFunction", function(CommonFunction, SpartaMain, Backbone, Marionette, $, _){

  CommonFunction.Messages = Marionette.ItemView.extend({
    template: message_Tpl,
    onRender: function (options) {
        if(options.model.attributes.data.class== "alert-danger"){
            $('html,body').animate({
                scrollTop: $("#message-region").offset().top},'slow');
        }else{
            setTimeout(function(){
                SpartaMain.MessageRegion.empty();
              }, 10000);
        }
        
    },
    events: {
          "click .close": "closeClicked"
    },
    closeClicked: function(e){
      SpartaMain.MessageRegion.empty();
    }
  });
  CommonFunction.customMessages = Marionette.ItemView.extend({
    template: customMessageTpl,
    events: {
          "click .close": "closeClicked"
    },
    templateHelpers: function () {
        return {
          messageHead: this.options.head,
          messageBody: this.options.body,
          theClass: this.options.class
        };
    },
    closeClicked: function(e){
      SpartaMain.MessageRegion.empty();
    }
  });
  CommonFunction.FormError = Marionette.ItemView.extend({
   initialize: function() {
       $(".form-error").empty();
        var msg='<div class="form-top alert alert-danger" role="alert">';
        $.each( this.model.attributes.data.msg, function( key, value ) {
             msg+='<strong>'+value+'</strong><br><br>';    
        });
        msg+='</div>';
          $(".form-error").append( msg);
        $('html,body').animate({
                scrollTop: $(".form-error").offset().top},'slow');
   }   
  });
  CommonFunction.Loading = Marionette.ItemView.extend({
    template: loading_Tpl
  });
   CommonFunction.LoadingModal = Marionette.ItemView.extend({
    template: loadingModalTpl
  });
  CommonFunction.ServerError = Marionette.ItemView.extend({
    template: customMessageTpl,
    templateHelpers: function () {
        if(this.options.error == 'Forbidden'){
            return {
                messageHead: 'Access denied',
                messageBody: 'You are not authorized to access this page.',
                theClass: 'alert alert-danger'
              };
        }else{
            return {
                messageHead: 'Not found',
                messageBody: 'The page is not available, contact site admin, error: '+this.options.error,
                theClass: 'alert alert-danger'
              };
        }
    }   
  });
   
});

 return SpartaMain.AppCommon.CommonFunction;
});
