(function() {
    'use strict';

    var orderServiceTracking;

    try{
        orderServiceTracking = angular.module('order.service.tracking');
    } catch(err) {
        orderServiceTracking = angular.module('order.service.tracking', []);
    }

    orderServiceTracking.service('Tracking', ['$rootScope', function($rootScope){
        var self = this;

        self.screenName = '';

        self.trackView = function(name){
            try {
                self.screenName = name;
                var value = typeof globalENV.distributorId === "undefined" ? null :  {'dimension3': globalENV.distributorId};

                ga('send', 'event', self.screenName, "view",  "view", value);
            } catch (e) {}
        };

        self.trackEvent = function(action, label, value) {
            try {
                if (!self.screenName) return;

                ga('send', 'event', self.screenName, action, label, value);
            } catch (e) {}
        };
    }]);
})();