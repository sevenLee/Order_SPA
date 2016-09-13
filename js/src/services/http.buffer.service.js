(function() {
    'use strict';

    var tmApp = angular.module('teamManageApp');

    // angular-http-auth
    // More info: https://github.com/witoldsz/angular-http-auth

    tmApp.service('httpBuffer', ['$injector', function($injector) {

        var self = this;

        var $http;

        self.buffer = [];

        self.retryHttpRequest = function(config, deferred) {
            function successCallback(response) {
                deferred.resolve(response);
            }
            function errorCallback(response) {
                deferred.reject(response);
            }
            $http = $http || $injector.get('$http');
            $http(config).then(successCallback, errorCallback);
        };

        self.append = function (config, deferred){
            return self.buffer.push({
                config: config,
                deferred: deferred
            });
        };

        self.retryAll = function(updater) {
            //todo: delete duplicate requests in self.buffer

            console.log('self.buffer:', self.buffer);

            self.buffer.forEach(function (elm, index) {
                var _cfg = updater(elm.config);
                if(_cfg) {
                    self.retryHttpRequest(_cfg, elm.deferred);
                }
            });

            self.buffer = [];
        };


    }]);
})();