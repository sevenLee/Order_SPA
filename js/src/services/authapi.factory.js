(function() {
    'use strict';
    var tmApp = angular.module('teamManageApp');

    tmApp.service('AuthAPIFactory', ['AuthAPI', 'AccessToken', 'jwtHelper', function(AuthAPI, AccessToken, jwtHelper) {
        var self = this;

        self.getAccessToken = function() {
            return AuthAPI.getAccessToken()
                .then(function(res) {
                    console.log('[getAccessToken]:', res);
                    var accessToken = jwtHelper.decodeToken(res.data.token);
                    var expDurationSecond = accessToken.exp - accessToken.iat; //900 sec
                    var expiresInDOB = new Date();
                    var expiresAtDOB = new Date();
                    var expiresInTime = expiresInDOB.getTime() + expDurationSecond*1000;
                    var accessTokenObj = {};

                    console.log('current Date:', expiresInDOB);
                    console.log('current Time:', expiresInDOB.getTime());
                    console.log('expiresInTime:', expiresInTime);

                    expiresInDOB.setTime(expiresInTime);
                    expiresAtDOB.setTime(expiresInTime - 60*1000);// 60 seconds less to secure browser and response latency

                    console.log('expired Date:', expiresInDOB);
                    console.log('update token Date:', expiresAtDOB);

                    accessTokenObj = {
                        token: res.data.token,
                        expiresIn: expiresInDOB,
                        expiresAt: expiresAtDOB
                    };

                    AccessToken.setToken(accessTokenObj);

                }, function (err){
                    console.log('getAccessToken Error:', err);
                });
        };



    }]);

})();