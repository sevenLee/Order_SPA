(function() {
    'use strict';

    var orderWidgetsLayout;

    try{
        orderWidgetsLayout = angular.module('order.widgets.layout');
    } catch(err) {
        orderWidgetsLayout = angular.module('order.widgets.layout', []);
    }

    orderWidgetsLayout.directive('scrollToTop', function() {
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