(function() {
    'use strict';

    var tmApp = angular.module('teamManageApp');


    tmApp.config(['$httpProvider', function($httpProvider){
        $httpProvider.interceptors.push(['$q', '$rootScope', 'httpBuffer', 'AccessToken', function ($q, $rootScope, httpBuffer, AccessToken) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};

                    var acsToken = AccessToken.getToken();
                    var isExpired = AccessToken.isExpired();
                    var deferred = $q.defer();
                    var bufferLength;


                    console.log('[Interceptor Request] isExpired:', isExpired);


                    if(!acsToken){
                        console.log('===== no access token, get access token =====');


                        if(config.url.indexOf('auth') !== -1){
                            $rootScope.$emit('accessToken:get', acsToken);
                            return config;

                        }else if(config.url.indexOf('http') !== -1){
                            bufferLength = httpBuffer.append(config, deferred);
                            console.log('bufferLength:', bufferLength);
                        }

                        //return $q.reject(config);


                    }else if(acsToken){
                        if(new Date(acsToken.expiresAt).getTime() < new Date().getTime()){
                            console.log('===== has access token, but expired =====');

                            if(config.url.indexOf('http') !== -1){
                                bufferLength = httpBuffer.append(config, deferred);

                                if(bufferLength === 1) {
                                    $rootScope.$emit('accessToken:renewToken', acsToken);
                                }

                                console.log('bufferLength:', bufferLength);
                            }

                            //return deferred.promise;

                        }else{
                            console.log('===== has access token, no expired =====');

                            config.headers['X-Access-Token'] = acsToken.token;
                        }



                    }



                    return config || $q.when(config);



                    //if (AccessToken.token) {
                    //    config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    //}
                    //return config;
                },
                'response': function(response) {
                    console.log('[response.config.url]:', response.config.url);

                    return response;
                },
                'responseError': function (response) {
                    //if (response.status === 401 || response.status === 403) {
                    //    $location.path('/signin');
                    //}
                    //return $q.reject(response);
                }
            };
        }]);
    }]);
})();