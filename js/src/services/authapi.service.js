
(function() {
    'use strict';
    var tmApp = angular.module('teamManageApp');

    tmApp.service('AuthAPI', ['$http', 'apiParams', function($http, apiParams) {
        var self = this;

        self.getAccessToken = function() {
            var config = {
                headers:{
                    'x-auth-appkey': apiParams.appkey,
                    'x-auth-apptoken':apiParams.apptoken,
                    'x-auth-usertoken': apiParams.usertoken
                }
            };

            return $http.post(apiParams.localPath + 'auth', apiParams.user, config);
        };



    }]);

})();