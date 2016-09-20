(function () {
    'use strict';

    // import css
    require('../../css/all.css');

    // share service
    require('./services/order.magen.lang');
    require('./services/order.magen.auth');
    require('./services/order.service.storage');
    require('./services/order.service.tracking');
    require('./services/order.widgets.gaTrack');
    require('./services/order.validation');

    var changePWApp = angular.module('changePWApp', [
        'ngCookies',
        'ngStorage',
        'ngSanitize',
        'pascalprecht.translate',
        'oc.lazyLoad',
        'order.magen.lang',
        'order.magen.auth',
        'order.service.storage',
        'order.service.tracking',
        'order.widgets.gaTrack',
        'order.validation'
    ]);

    // custom main js
    require('./app.changePW.init')(changePWApp);
    require('./components/changePW/change.pw.form')(changePWApp);

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