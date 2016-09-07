(function(){
    'use strict';

    var orderWidgetsGaTrack;

    try{
        orderWidgetsGaTrack = angular.module('order.widgets.gaTrack');
    } catch(err) {
        orderWidgetsGaTrack = angular.module('order.widgets.gaTrack', []);
    }

    orderWidgetsGaTrack.directive('gaTrack',['apiParams', 'Tracking', function(apiParams, Tracking){
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var el = element[0];
                var value = typeof apiParams.distributorId === "undefined" ? null :  {'dimension3': apiParams.distributorId};

                element.bind('click', function(e){
                    if(attrs.trackAction === 'click') {
                        Tracking.trackEvent(attrs.trackAction, attrs.trackLabel, value);
                    }
                });

                element.bind('focus', function(e){
                    if(attrs.trackAction === 'on_focus') {
                        Tracking.trackEvent(attrs.trackAction, attrs.trackLabel, value);
                    }
                });
            }
        };
    }]);
})();