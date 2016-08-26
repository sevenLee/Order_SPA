(function() {
    'use strict';
    var tmApp = angular.module('teamManageApp');

    tmApp.directive('scrollToTop', function() {
        return {
            restrict: 'A',
            link: function(scope, $elm) {
                $elm.on('click', function() {
                    $("body").animate({scrollTop: 0}, "fast");
                });
            }
        }
    });

})();