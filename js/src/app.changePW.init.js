(function () {
    'use strict';

    var changePWApp = angular.module('changePWApp');

    changePWApp.run( ['$rootScope', 'MagenLangService', '$translate', 'MagenAuthService', function ($rootScope, MagenLangService, $translate, MagenAuthService) {
        //MagenLangService.setLangCode(langCode);
        //MagenLangService.setRegionCode(regionCode);

        MagenAuthService.setUserToken();
        MagenAuthService.setAppkey();

        ga('create', 'UA-63091955-1', 'auto', {
            appName: 'com.lkk.presetationtool'
        });


        if(MagenLangService.getLangCode()){
            $rootScope.activeLangCode = MagenLangService.getLangCode();
            $translate.use($rootScope.activeLangCode);
        }

        $rootScope.$on('$viewContentLoaded', function() {
            console.log('view ContentLoaded');
            //here set ga new page view each time
        });
    }]);
})();