module.exports = function(app) {
    app.run( ['$rootScope', 'MagenLangService', '$translate', 'MagenAuthService', function ($rootScope, MagenLangService, $translate, MagenAuthService) {
        MagenAuthService.setUserTokenCookie();
        MagenAuthService.setAppkeyCookie();

        ga('create', globalENV.gaId, 'auto', {
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
};