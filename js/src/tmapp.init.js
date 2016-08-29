(function () {
    'use strict';

    var tmApp = angular.module('teamManageApp');

    tmApp.run( ['$rootScope', '$state', '$stateParams', '$translate', 'LangService', function ($rootScope,   $state,   $stateParams, $translate, LangService) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        //LangService.setLangCode(langCode);
        //LangService.setRegionCode(regionCode);

        if(LangService.getLangCode()){
            $rootScope.activeLangCode = LangService.getLangCode();
            $translate.use($rootScope.activeLangCode);
        }
    }]);
})();