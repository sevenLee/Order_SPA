(function () {
    'use strict';

    // import css
    require('../../css/all.css');

    // share service
    require('./services/order.magen.lang');
    require('./services/order.magen.auth');
    require('./services/order.service.storage');
    require('./services/order.service.crypt');
    require('./services/order.service.tracking');
    require('./services/order.widgets.gaTrack');
    require('./services/order.apis.personalCenter');
    require('./services/order.validation');

    var changePWApp = angular.module('changePWApp', [
        'ui.router',
        'ngCookies',
        'ngStorage',
        'ngSanitize',
        'pascalprecht.translate',
        'angular-jwt',
        'order.magen.lang',
        'order.magen.auth',
        'order.service.storage',
        'order.service.crypt',
        'order.service.tracking',
        'order.widgets.gaTrack',
        'order.apis.personalCenter',
        'order.validation'
    ]);

    // custom main js
    require('./app.changePW.init')(changePWApp);
    require('./components/changePW/change.pw.form')(changePWApp);

    changePWApp.constant('apiParams', {
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
        distributorId: '962000043',
        apptoken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiIyNTEwNDgwODU5OTkiLCJzdWIiOiJhY2Nlc3NfaW5maW5pdHVzX2FwaSIsImp0aSI6IjFmMzQwZTRkLWZiMmQtNGM3MC1hNTBjLWFmNDc2N2IwYjRmMSIsImF0YSI6e30sImF0aSI6eyJ1dWlkIjoiMTdlNWRmMjQtYzRlYi00ZGFjLWE0OTktYjMyOTRiMTUwMTJlIn0sInZlciI6IjEuMSIsImlhdCI6MTQ2NzY5MDYzOH0.HkYB0q7NbI2UZEzUkQK7akXhiHil2LKRnxj4Ww299j9sYGpkq-u7N9C6znmDOCa5CLiC6wDAMXcpN9mLe1vC6xxM1KohyoGvf3pV_LGmlxb3cRq7ABhRN5avBvvpF0A_zcSJCDd3su30i8w1A3Y_KnNd_sP6BVKSo0RP0UNU3Ak9cHwKQbYbPOMNoxA4x92ufS561RuFb6HahKG8tGOqBVZ5aRwzPu69cnRVE6CmfKSZ0ff_7sIdESUwDkijAjOMi5DR8-nXyu4h2TdBD47GcMqiXhsRrOBpMI0tpsTOVria064ZjVLv5487XR6nG2f_p-7N-7DM-qgp9fnQxYL--A',
        usertoken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJBUFBLRVkiLCJzdWIiOiJhY2Nlc3NfaW5maW5pdHVzX2FwaSIsImV4cCI6MTQ5ODgwNzMyMSwianRpIjoiNzgxZTdmMWMtNDgwNi00NTA4LWE2NmItZWJmYTkyYzJhZDllIiwidXRhIjp7ImlzVXNlciI6dHJ1ZX0sInV0aSI6eyJ1c2VyVHlwZSI6ImRpc3RyaWJ1dG9yIiwidXNlcklkIjoiMDkwMDA5MDAiLCJhcGlVc2VyVHlwZSI6InRlc3RBY2NvdW50IiwidXNlckdyb3VwIjoiRElTIiwibWFya2V0IjoiSEsifSwidmVyIjoiMS4yIiwiaWF0IjoxNDY3MjcxMzIxfQ.hBWuLqeX3iZbCQ7wLghjDUrjgvyuIa1Dvpym4Z20c2WNSjOL-czXNAshxMr1NwQt5EKyglclo0bd-RLvoE9kiV9iN66Ey-NJp4qEGetbfnW7sP0-uloMdAJijR5C7852My8tuHOfqxlkU7TL5Uort4r140XYXBed2OaxxGwVMMQJ6n2RqTlogQIwsFS7KJ1cIPy7tnpfszjYYELpGQ78vzBJLKmIsZ1F18WKdQCtbsPkkBHiEVbKKFo4909wjru9SVMYW-QFOatH7qQU-Y4sHeiU_3Q586-Q8qg__Vov-gAAq-Aqt2CmAgrsvAh-VpOsaYZJ9Fx-nqNqADGHCGaLUw',
        userToken2: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBUFBLRVkiLCJzdWIiOiJhY2Nlc3NfaW5maW5pdHVzX2FwaSIsImV4cCI6MTQ3MzA3NjMxMSwianRpIjoiZGFhMzY5ZWMtNTcxNS00NDkxLWIwNjQtM2M0ODFkOGJlZDA2IiwidXRhIjp7ImlzVXNlciI6dHJ1ZX0sInV0aSI6eyJ1c2VyVHlwZSI6ImRpc3RyaWJ1dG9yIiwidXNlcklkIjoiMDkzOTA5MzkiLCJhcGlVc2VyVHlwZSI6InRlc3RBY2NvdW50IiwidXNlckdyb3VwIjoiRElTIiwibWFya2V0IjoiVFcifSwidmVyIjoiMS4yIiwiaWF0IjoxNDczMDc1NDExfQ.gg6Lkcp9OP-4DddK73BoPhKcXYK0remeP8tV_85v7pGKFlGwj5FzCbZOzWUtuBgnQt3nOjp4VADa9FTs3GTOD6ZamGRNBu4bCpnX5abGaqF1aDOJa6Nr-ozHBAaSoRCLhDRlRJ5W80QgA0oRSKAS4GgkY3SmAkd5Gsz0BUuueF_867wb3q51DIDI2LrGAGUkyrHas-G07mCK_XCfA-D5RET838IN8nASh4Ca5fQqhytnV8CDKVY2TuE5IOl5HlOgrWgHdHqYijBUBXDaRz4MUwCEK-yEc1DMPdTUt6p6yf3143vk9m6B5wHA6P7RF5SrpXRm7R6VmtjiuX61RKRQyw',
        devUserToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJBUFBLRVkiLCJzdWIiOiJhY2Nlc3NfaW5maW5pdHVzX2FwaSIsImV4cCI6MTQ3NDEwMDI1OSwianRpIjoiNGZhMjVhM2QtMjMxMC00MDViLTgzZWYtY2MzYzEwNzFhM2I4IiwidXRhIjp7ImlzVXNlciI6dHJ1ZX0sInV0aSI6eyJ1c2VyVHlwZSI6ImRpc3RyaWJ1dG9yIiwidXNlcklkIjoiMDkzOTA5MzkiLCJhcGlVc2VyVHlwZSI6InRlc3RBY2NvdW50IiwidXNlckdyb3VwIjoiRElTIiwibWFya2V0IjoiVFcifSwidmVyIjoiMS4yIiwiaWF0IjoxNDczMjM2MjU5fQ.GmjXWgcV0dJ1AcVujAfotGaRmGuKtNZkvnkEA_aAmrS2EQVaKcs93yS9WIyXvrVyjWrAeXuOV_Ig4cIk590I9Q7ew4jwfk0XC5hF7bcikDHXYpjILtk3m5LWi0-w9uJqhvPP1ZqKH9rivYqoC1m6stZ_pxlIPNbLU2VtLSCcB_raDmKjaEFDvD1dByzQ6HdsvTf86sPS8fqc8P4wCP6Jgp7OXyxxLmy1IdmH3io4DK8e8jo5Op79EEp99i1i0rMvfiyV3nXaxjqKKImUTXoYvwvywY7RaHTOI6AZFm3T9aRtC2oTa9FXgWcojPkGCyQ6_ZojPso9ZZDYwUdFyaYKOQ',
        devAppToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiIxMjM0NzYwNTYzMjMwMTI2Iiwic3ViIjoiYWNjZXNzX2luZmluaXR1c19hcGkiLCJqdGkiOiIzNjU1MWIyYy1kNTFkLTRmZDUtYTlmNS0yMjBhNjYwODE2ODUiLCJhdGEiOnt9LCJhdGkiOnsidXVpZCI6IjEyMzQ1Njc4OTAxMjM0NTExMTFhYWEifSwidmVyIjoiMS4xIiwiaWF0IjoxNDczMjM2ODQ4fQ.RQcWEJgWhKsdKwDjmtVkVABwePmst6LRPPyo8om8i4GoGZScXx22QE90OoEON3_It0sKDE10flLCG9ac2GatkvoJvfIhxcEnWqFfJ5BfWBLP3UoutPbBpqfFqIVBW5QnMaTBkWIDUOy7gG6ZYIL5Ow6Yt2duBnciFknurLxukdfwaT75isPKsliot7IINQHb89d07ZrNtFUhPNPOCF-ILaGf3rSqwBQDCwUjqca2-IXdKB8yPbmKCdLOgJ7mYHLh21FOwkFhSWzMncmoKKvyaWuJY_-t6eY3qwyb_FbLaQh1oytO1Iou-uFTLYniEjUQqkqtTiufBkaqpCymh-NbGQ',
        devPath: 'http://omapi-dev.lkkhpgdi.com/'
    });

    //changePWApp.config(['$translateProvider', function ($translateProvider) {
    //    $translateProvider
    //        .useStaticFilesLoader({
    //            prefix: 'i18n/',
    //            suffix: '.json'
    //        })
    //        .registerAvailableLanguageKeys(['zh-tw', 'zh-cn', 'en'], {
    //            'zh-tw': 'zh-tw',
    //            'zh-cn': 'zh-cn',
    //            'en': 'en'
    //        })
    //        .useSanitizeValueStrategy(null)
    //        .preferredLanguage('zh-tw')
    //        .usePostCompiling(true);
    //}]);

    changePWApp.controller('changePWCtrl', ['$scope', 'Tracking', function($scope, Tracking){
        var  vm = this;

        Tracking.trackView('pg_change_password');

    }]);
})();