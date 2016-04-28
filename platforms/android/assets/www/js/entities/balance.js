define(["app"], function(SpartaMain){
SpartaMain.module("Bal_Entities", function(Bal_Entities, SpartaMain, Backbone, Marionette, $, _) {
    Bal_Entities.Contact = Backbone.Model.extend({
        defaults: {
            left : 0,
            right: 0,
            date: '0',
            weight:'0',
            extremity :'',
            id: '0'
        },
        initialize: function() {}
    });
    Bal_Entities.ContactCollection = Backbone.Collection.extend({
        model: Bal_Entities.Contact
    });
    var API = {
            getContactEntities: function(uid) {
            if(uid ===null || typeof uid === 'undefined' ){
                uid='';
            }
            var defer = $.Deferred();
            var ajax = $.ajax({
                url: '/get_last_balance/'+uid
            });

            ajax.done(function (balance) {
              // initialize the collection
            var balanceCollection =new Bal_Entities.ContactCollection();

            // loop through the contacts, create models, add to the collection
            if(balance.data.Lower!=null){
                balanceCollection.add([{id: 0, left: balance.data.Lower.left, right: balance.data.Lower.right, date: balance.data.Lower.date,extremity: 'Lower' ,weight:balance.data.Lower.weight }]);
            }else{
                 var balance_record =new Bal_Entities.Contact();
                 balanceCollection.add([balance_record]);
            }
            if(balance.data.Upper!=null){
                  balanceCollection.add([{id: 1, left: balance.data.Upper.left, right: balance.data.Upper.right, date: balance.data.Upper.date,extremity: 'Upper' ,weight:balance.data.Upper.weight}]);
            }else{
                  balanceCollection.add([{id: 1, left: 0, right: 0, date: '0',extremity: 'Upper' ,weight:'0'}]);
            }
             // console.log(JSON.stringify(balanceCollection.toJSON()));
             // then, return the collection 
              defer.resolve(balanceCollection);
            });
            return defer.promise();
        }
    };

    SpartaMain.reqres.setHandler("balance:data", function(id) {
        return API.getContactEntities(id);
    });
});
return ;
});