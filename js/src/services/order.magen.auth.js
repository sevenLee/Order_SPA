(function(){
    'use strict';
    var orderMagenAuth;

    try{
        orderMagenAuth = angular.module('order.magen.auth');
    } catch(err) {
        orderMagenAuth = angular.module('order.magen.auth', []);
    }

    orderMagenAuth.service('MagenAuthService',['Storage', '$cookies', function(Storage, $cookies) {
        var self = this;

        self.setExpiredTime = function(expiredTimePeriod) {
            var today = new Date();
            var expired = new Date(today);

            expired.setTime(today.getTime() + expiredTimePeriod);

            return expired;
        };

        self.setUserToken = function(){
            Storage.set('spaUserToken', globalENV.userToken);
        };

        self.getUserToken = function() {
            var userToken = Storage.get('spaUserToken');
            return userToken;
        };

        self.setUserTokenCookie = function(){
            var usertoken = globalENV.userToken;
            var expiredTimePeriod = 86400000*360*30;
            var expired = self.setExpiredTime(expiredTimePeriod);

            $cookies.put("INFI_ORDERAPP_TOKEN[SPA_USER_TOKEN]", usertoken, {expires : expired, encode: false });
        };

        self.getUserTokenCookie = function(){
            var usertoken = $cookies.get('INFI_ORDERAPP_TOKEN[SPA_USER_TOKEN]');
            return usertoken;
        };



        self.setAppToken = function(){
            Storage.set('spaAppToken', globalENV.appToken);
        };

        self.getAppToken = function() {
            var appToken = Storage.get('spaAppToken');
            return appToken;
        };

        self.setAppTokenCookie = function(){
            var apptoken = globalENV.appToken;
            var expiredTimePeriod = 86400000*360*30;
            var expired = self.setExpiredTime(expiredTimePeriod);

            $cookies.put("INFI_ORDERAPP_TOKEN[SPA_APP_TOKEN]", apptoken, {expires : expired, encode: false });
        };

        self.getAppTokenCookie = function(){
            var apptoken = $cookies.get('INFI_ORDERAPP_TOKEN[SPA_APP_TOKEN]');
            return apptoken;
        };

        self.setAppkey = function(){
            Storage.set('spaAppKey', globalENV.appKey);
        };

        self.getAppkey = function(){
            var appkey = Storage.get('spaAppKey');
            return appkey;
        };

        self.setAppkeyCookie = function(){
            var appkey = globalENV.appKey;
            var expiredTimePeriod = 86400000*360*30;
            var expired = self.setExpiredTime(expiredTimePeriod);

            $cookies.put("INFI_ORDERAPP_TOKEN[SPA_APP_KEY]", appkey, {expires : expired, encode: false });
        };

        self.getAppkeyCookie = function(){
            var appkey = $cookies.get('INFI_ORDERAPP_TOKEN[SPA_APP_KEY]');
            return appkey;
        };
    }]);
})();
