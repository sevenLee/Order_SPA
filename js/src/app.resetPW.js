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

    var resetPWApp = angular.module('resetPWApp', [
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
    require('./app.resetPW.init')(resetPWApp);
    require('./components/resetPW/reset.pw.form')(resetPWApp);

    //resetPWApp.config(['$translateProvider', function ($translateProvider) {
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

    resetPWApp.controller('resetPWCtrl', ['$scope', 'Tracking', function($scope, Tracking){
        var  vm = this;

        Tracking.trackView('pg_reset_password');

    }]);
})();