(function() {
    'use strict';
    var changePWApp = angular.module('changePWApp');

    changePWApp.service('Tracking', ['$rootScope', 'apiParams', function($rootScope, apiParams){
        var self = this;

        self.screenName = '';

        self.trackView = function(name){
            try {
                self.screenName = name;
                var value = typeof apiParams.distributorId === "undefined" ? null :  {'dimension3': apiParams.distributorId};

                //ga('send', 'event', self.screenName, "view",  "view", value);
            } catch (e) {}
        };

        self.trackEvent = function(action, label, value) {
            try {
                if (!self.screenName) return;

                //ga('send', 'event', self.screenName, action, label, value);
            } catch (e) {}
        };
    }]);
})();