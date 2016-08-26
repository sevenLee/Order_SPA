(function () {
    'use strict';
    var tmApp = angular.module('teamManageApp', [
        'ui.router',
        'ui.router.components',
        'ngCookies',
        'ngStorage',
        'ngSanitize',
        'pascalprecht.translate',
        'angular-jwt'
    ]);

    tmApp.constant('apiParams', {
        secret: 'd7fba8d5a39f58d87a059f0aa026b119',
        path: 'http://omapi-dev.lkkhpgdi.com/',
        treepath: 'http://220.135.22.52:3000/',
        //treepath: 'http://omapi-dev.lkkhpgdi.com/',
        localPath: 'http://localhost:8080/api/',
        user: {
            name: 'seven',
            password: '1234'
        },
        appkey: '251048085999',
        distributorId1: '960007788',
        distributorId: '361560695',
        apptoken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiIyNTEwNDgwODU5OTkiLCJzdWIiOiJhY2Nlc3NfaW5maW5pdHVzX2FwaSIsImp0aSI6IjFmMzQwZTRkLWZiMmQtNGM3MC1hNTBjLWFmNDc2N2IwYjRmMSIsImF0YSI6e30sImF0aSI6eyJ1dWlkIjoiMTdlNWRmMjQtYzRlYi00ZGFjLWE0OTktYjMyOTRiMTUwMTJlIn0sInZlciI6IjEuMSIsImlhdCI6MTQ2NzY5MDYzOH0.HkYB0q7NbI2UZEzUkQK7akXhiHil2LKRnxj4Ww299j9sYGpkq-u7N9C6znmDOCa5CLiC6wDAMXcpN9mLe1vC6xxM1KohyoGvf3pV_LGmlxb3cRq7ABhRN5avBvvpF0A_zcSJCDd3su30i8w1A3Y_KnNd_sP6BVKSo0RP0UNU3Ak9cHwKQbYbPOMNoxA4x92ufS561RuFb6HahKG8tGOqBVZ5aRwzPu69cnRVE6CmfKSZ0ff_7sIdESUwDkijAjOMi5DR8-nXyu4h2TdBD47GcMqiXhsRrOBpMI0tpsTOVria064ZjVLv5487XR6nG2f_p-7N-7DM-qgp9fnQxYL--A',
        usertoken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJBUFBLRVkiLCJzdWIiOiJhY2Nlc3NfaW5maW5pdHVzX2FwaSIsImV4cCI6MTQ5ODgwNzMyMSwianRpIjoiNzgxZTdmMWMtNDgwNi00NTA4LWE2NmItZWJmYTkyYzJhZDllIiwidXRhIjp7ImlzVXNlciI6dHJ1ZX0sInV0aSI6eyJ1c2VyVHlwZSI6ImRpc3RyaWJ1dG9yIiwidXNlcklkIjoiMDkwMDA5MDAiLCJhcGlVc2VyVHlwZSI6InRlc3RBY2NvdW50IiwidXNlckdyb3VwIjoiRElTIiwibWFya2V0IjoiSEsifSwidmVyIjoiMS4yIiwiaWF0IjoxNDY3MjcxMzIxfQ.hBWuLqeX3iZbCQ7wLghjDUrjgvyuIa1Dvpym4Z20c2WNSjOL-czXNAshxMr1NwQt5EKyglclo0bd-RLvoE9kiV9iN66Ey-NJp4qEGetbfnW7sP0-uloMdAJijR5C7852My8tuHOfqxlkU7TL5Uort4r140XYXBed2OaxxGwVMMQJ6n2RqTlogQIwsFS7KJ1cIPy7tnpfszjYYELpGQ78vzBJLKmIsZ1F18WKdQCtbsPkkBHiEVbKKFo4909wjru9SVMYW-QFOatH7qQU-Y4sHeiU_3Q586-Q8qg__Vov-gAAq-Aqt2CmAgrsvAh-VpOsaYZJ9Fx-nqNqADGHCGaLUw'
    });

    tmApp.config(['$translateProvider', function ($translateProvider) {
        $translateProvider
            .useStaticFilesLoader({
                prefix: 'i18n/',
                suffix: '.json'
            })
            .registerAvailableLanguageKeys(['zh-tw', 'zh-cn', 'en'], {
                'zh-tw': 'zh-tw',
                'zh-cn': 'zh-cn',
                'en': 'en'
            })
            .useSanitizeValueStrategy(null)
            .preferredLanguage('zh-tw')
            .usePostCompiling(true);
    }]);

    tmApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $stateProvider
            .state('score', {
                url: '/score',
                template: '<score></score>'

            })
            .state('tree', {
                url         : '/tree?search&activeMonth&count&ruleType&dealerName&dealerNo&ranking&downlineDealerNo',
                component  : 'tree',
                params: {
                    search: {
                        value: '',
                        squash: true
                    },
                    activeMonth: {
                        value: '',
                        squash: true
                    },
                    count: {
                        value: '0',
                        squash: true
                    },
                    ruleType: {
                        value: 'dealerName',
                        squash: true
                    },
                    dealerName: {
                        value: '',
                        squash: true
                    },
                    dealerNo: {
                        value: '',
                        squash: true
                    },
                    ranking: {
                        value: '',
                        squash: true
                    },
                    downlineDealerNo: {
                        value: '',
                        squash: true
                    }
                }

            });

        $urlRouterProvider.otherwise('/score');
    }]);


    tmApp.controller('TeamManagerCtrl', ['$rootScope', '$scope', '$translate', 'LangService', 'AccessToken', function ($rootScope, $scope, $translate, LangService, AccessToken) {
        var vm = this;

        vm.currentLang = $rootScope.activeLangCode;

        vm.setLanguage = function (langCode) {
            $rootScope.activeLangCode =langCode;
            $translate.use($rootScope.activeLangCode);
            vm.currentLang = $rootScope.activeLangCode;
        };

        //$rootScope.$on('accessTimer:expired', function() {
        //
        //    console.log('[accessTimer:expired] call renew API');
        //    AccessToken.destroy();
        //
        //    //call renew API
        //    //AuthAPIFactory.getAccessToken();
        //});
        //
        //
        //$scope.$on('spin', function(name, url) {
        //    $scope.logs.push('RECEIVED: ' + url);
        //});
    }]);


    //tmApp.service('APIInterceptor', ['$q', '$rootScope', 'AccessToken', function($q, $rootScope, AccessToken){
    //    var self = this;
    //
    //    self.request = function (config){
    //        console.log('[Interceptor Request]: In!!');
    //
    //        config.headers = config.headers || {};
    //
    //        var acsToken = AccessToken.getToken();
    //        var isExpired = AccessToken.isExpired();
    //
    //        console.log('[Interceptor Request] isExpired:', isExpired);
    //
    //        if(acsToken && AccessToken.isExpired()){
    //            console.log('===== has access token, but expired =====');
    //
    //            $rootScope.$broadcast('AccessToken:expired', acsToken);
    //        }
    //
    //        if(acsToken && !AccessToken.isExpired()){
    //            console.log('===== has access token, no expired =====');
    //
    //            config.headers['X-Access-Token'] = acsToken.token;
    //        }
    //
    //
    //        return config || $q.when(config);
    //    };
    //
    //    self.response = function (response) {
    //        console.log('[response.config.url]:', response.config.url);
    //
    //        return response;
    //    };
    //
    //    self.responseError = function (reason) {
    //
    //    };
    //}]);
})();