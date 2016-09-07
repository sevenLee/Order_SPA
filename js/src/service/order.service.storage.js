(function () {
    'use strict';

    var orderServiceStorage;

    try{
        orderServiceStorage = angular.module('order.service.storage');
    } catch(err) {
        orderServiceStorage = angular.module('order.service.storage', []);
    }

    orderServiceStorage.service('Storage', ['$rootScope', '$sessionStorage', '$localStorage', function(rootScope, $sessionStorage, $localStorage) {
        var self = this;

        self.storage = $sessionStorage;

        self.use = function (method) {
            if(method === 'sessionStorage'){
                self.storage = $sessionStorage;
            }else if (method === 'localStorage'){
                self.storage = $localStorage;
            }
        };

        self.get = function(name) {
            return self.storage[name];
        };

        self.set = function(name, value) {
            this.storage[name] = value;
            return self.get(name);
        };

        self.delete = function(name) {
            delete self.storage[name];
        };
    }]);
})();