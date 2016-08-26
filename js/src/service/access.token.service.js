(function () {
    'use strict';

    var tmApp = angular.module('teamManageApp');

    tmApp.service('AccessToken', ['Storage', '$rootScope', '$interval', function(Storage, $rootScope, $interval) {
        var self = this;
        var timer = null;

        self.token = Storage.get('accessToken') || null;

        self.setToken = function (tokenObj) {
            self.token = self.toekn || {};
            self.token = tokenObj;
            Storage.set('accessToken', self.token);
            self.setExpiredTimer();
        };

        self.getToken = function() {
            var token = Storage.get('accessToken');
            return token;
        };

        self.setExpiredTimer = function() {

            //console.log('get from storage, update token Date:', new Date(self.token.expiresAt));

            if(timer) return;

            var counterSec = moment(new Date(self.token.expiresAt)).diff(moment(), 'seconds');



            timer = $interval(function(){

                counterSec--;

                console.log('counterSec:', counterSec);

                if(counterSec === 0){
                    $rootScope.$emit('accessTimer:expired', self.token);
                }
            }, 1000);
        };

        self.destroy = function () {
            if (timer) {
                $interval.cancel(timer);
                console.log('timer stop!');
                timer = null;
            }

            //Storage.delete('accessToken');
            //self.token = null;


        };

        self.isValid = function (){



            if(!self.token) return false;
            if(!self.token.expiresAt) return false;
            if(new Date(self.token.expiresAt).getTime() < new Date().getTime()) return false;


            var diff = new Date(self.token.expiresAt).getTime() - new Date().getTime();

            console.log('diff:', diff);
            console.log('expired < current:', new Date(self.token.expiresAt).getTime() < new Date().getTime());



            return (self.token && self.token.expiresAt && new Date(self.token.expiresAt).getTime() > new Date().getTime());
        };

        self.isExpired = function (){
            if(!self.token || !self.token.expiresAt) return;


            return  new Date(self.token.expiresAt).getTime() < new Date().getTime();

        };
    }]);

})();