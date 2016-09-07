
(function() {
    'use strict';

    var orderAPIsPersonalCenter;

    try{
        orderAPIsPersonalCenter = angular.module('order.apis.personalCenter');
    } catch(err) {
        orderAPIsPersonalCenter = angular.module('order.apis.personalCenter', []);
    }

    orderAPIsPersonalCenter.service('PersonalCenterAPI', ['$http', 'apiParams', 'MagenAuthService', function($http, apiParams, MagenAuthService) {
        var self = this;

        var fakePath = 'http://43.70.88.222:5000/';

        self.changePw = function(data) {
            var config = {
                headers:{
                    'x-auth-appkey': MagenAuthService.getAppkey(),
                    'x-auth-usertoken': MagenAuthService.getUserToken()
                }
            };

            //return $http.post(apiParams.localPath + 'auth/user/passcode/change', data, config);

            return $http.post(fakePath + 'auth/user/passcode/change', data, config);
        };

        self.resetPw = function(data) {
            var config = {
                headers:{
                    'x-auth-appkey': MagenAuthService.getAppkey(),
                    'x-auth-apptoken': MagenAuthService.getAppToken()
                }
            };

            //return $http.post(apiParams.localPath + 'auth/user/passcode/change', data, config);

            return $http.post(fakePath + 'auth/user/passcode/reset', data, config);
        };
    }]);
})();