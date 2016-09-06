
(function() {
    'use strict';
    var changePWApp = angular.module('changePWApp');

    changePWApp.service('PersonalCenterAPI', ['$http', 'apiParams', 'MagenAuthService', function($http, apiParams, MagenAuthService) {
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
    }]);
})();