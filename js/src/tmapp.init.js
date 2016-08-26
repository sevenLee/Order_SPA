(function () {
    'use strict';

    var tmApp = angular.module('teamManageApp');


    tmApp.run( ['$rootScope', '$state', '$stateParams', '$translate', 'LangService', 'AuthAPIFactory', 'httpBuffer', 'AccessToken', function ($rootScope,   $state,   $stateParams, $translate, LangService, AuthAPIFactory, httpBuffer, AccessToken) {
        $rootScope.version = 999.99;

        //var langCode = 'zh-tw';
        //var regionCode = 'tw';
        var acsToken = AccessToken.getToken();

        var isValid = AccessToken.isValid();
        console.log('isValid:', isValid);

        if(AccessToken.isValid()){
            AccessToken.setExpiredTimer();
        }

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        //LangService.setLangCode(langCode);
        //LangService.setRegionCode(regionCode);

        if(LangService.getLangCode()){
            $rootScope.activeLangCode = LangService.getLangCode();
            $translate.use($rootScope.activeLangCode);
        }

        //AuthAPIFactory.getAccessToken();

        $rootScope.$on('accessTimer:expired', function() {

            console.log('[accessTimer:expired] call renew API');
            AccessToken.destroy();

            //call renew API
            AuthAPIFactory.getAccessToken();
        });


        $rootScope.$on('accessToken:get', function() {
            console.log('[accessToken:get]: get new API');


            AuthAPIFactory.getAccessToken()
                .then(function(){
                   // debugger;
                    var updater = function(config) {return config;};
                    httpBuffer.retryAll(updater);
                });

        });

        $rootScope.$on('accessToken:renewToken', function() {
            console.log('[accessToken:renewToken]: get renew API');

            AccessToken.destroy();

            AuthAPIFactory.getAccessToken()
                .then(function(){
                    var updater = function(config) {return config;};
                    httpBuffer.retryAll(updater);
                });
        });




    }
    ]);
})();