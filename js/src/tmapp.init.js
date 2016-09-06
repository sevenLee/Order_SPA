(function () {
    'use strict';

    var tmApp = angular.module('teamManageApp');

    tmApp.run( ['$rootScope', '$state', '$stateParams', '$translate', 'MagenLangService', function ($rootScope,   $state,   $stateParams, $translate, MagenLangService) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        //MagenLangService.setLangCode(langCode);
        //MagenLangService.setRegionCode(regionCode);

        if(MagenLangService.getLangCode()){
            $rootScope.activeLangCode = MagenLangService.getLangCode();
            $translate.use($rootScope.activeLangCode);
        }

        $rootScope.$on('$viewContentLoaded', function() {
            console.log('view ContentLoaded');
        });
    }]);
})();