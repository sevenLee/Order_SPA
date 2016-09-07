(function(){
    'use strict';
    var orderMagenAuth;

    try{
        orderMagenAuth = angular.module('order.magen.auth');
    } catch(err) {
        orderMagenAuth = angular.module('order.magen.auth', []);
    }

    orderMagenAuth.service('MagenAuthService',['Storage', 'apiParams', function(Storage, apiParams) {
        var self = this;

        self.setUserToken = function(){
            Storage.set('spaUserToken', apiParams.userToken2);
        };

        self.getUserToken = function() {
            var userToken = Storage.get('spaUserToken');
            return userToken;
        };

        self.setAppToken = function(){
            Storage.set('spaAppToken', apiParams.appToken2);
        };

        self.getAppToken = function() {
            var appToken = Storage.get('spaAppToken');
            return appToken;
        };

        self.setAppkey = function(){
            Storage.set('spaAppKey', apiParams.appkey);
        };

        self.getAppkey = function(){
            var appkey = Storage.get('spaAppKey');
            return appkey;
        };
    }]);
})();
