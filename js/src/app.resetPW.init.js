(function () {
    'use strict';

    var resetPWApp = angular.module('resetPWApp');

    resetPWApp.run( ['$rootScope', 'MagenLangService', '$translate', 'MagenAuthService', function ($rootScope, MagenLangService, $translate, MagenAuthService) {
        //MagenLangService.setLangCode(langCode);
        //MagenLangService.setRegionCode(regionCode);

        MagenAuthService.setUserToken();
        MagenAuthService.setAppkey();
        MagenAuthService.setAppToken();


        ga('create', 'UA-63091955-1', 'auto', {
            appName: 'com.lkk.presetationtool'
        });


        if(MagenLangService.getLangCode()){
            $rootScope.activeLangCode = MagenLangService.getLangCode();
            $translate.use($rootScope.activeLangCode);
        }

        $rootScope.$on('$viewContentLoaded', function() {
            //here set ga new page view each time
        });
    }]);
})();