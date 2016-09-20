
(function() {
    'use strict';

    var orderAPIsPersonalCenter;

    try{
        orderAPIsPersonalCenter = angular.module('order.apis.personalCenter');
    } catch(err) {
        orderAPIsPersonalCenter = angular.module('order.apis.personalCenter', []);
    }

    orderAPIsPersonalCenter.service('PersonalCenterAPI', ['$http', 'MagenAuthService', function($http, MagenAuthService) {
        var self = this;

        var fakePath = 'http://43.70.88.222:5000/';

        self.changePw = function(data) {
            var config = {
                headers:{
                    'x-auth-appkey': MagenAuthService.getAppkeyCookie(),
                    'x-auth-usertoken': MagenAuthService.getUserTokenCookie()
                }
            };

            return $http.post(globalENV.hostPath + 'auth/user/passcode/change', data, config);
        };

        self.resetPw = function(data) {
            var config = {
                headers:{
                    'x-auth-appkey': MagenAuthService.getAppkeyCookie(),
                    'x-auth-apptoken': MagenAuthService.getAppTokenCookie()
                }
            };

            return $http.post(globalENV.hostPath + 'auth/user/passcode/reset', data, config);
        };
    }]);
})();