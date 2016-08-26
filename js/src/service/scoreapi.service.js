

/*
 (function() {
 'use strict';
 var tmApp = angular.module('teamManageApp');


 })();
*/
(function() {
    'use strict';
    var tmApp = angular.module('teamManageApp');

    tmApp.service('DistributorsAPI', ['$http', 'apiParams', function($http, apiParams) {
        var self = this;

        self.getTeam = function() {
            var config = {
                headers:{
                    'x-auth-appkey': apiParams.appkey,
                    'x-auth-apptoken':apiParams.apptoken,
                    'x-auth-usertoken': apiParams.usertoken
                },
                withCredentials:true
            };

            return $http.get(apiParams.path + 'distributors/' + apiParams.distributorId + '/team', config);
        };

        self.getBalance = function() {
            var config = {
                headers:{
                    'x-auth-appkey': apiParams.appkey,
                    'x-auth-apptoken':apiParams.apptoken,
                    'x-auth-usertoken': apiParams.usertoken
                },
                withCredentials:true
            };

            return $http.get(apiParams.path + 'distributors/' + apiParams.distributorId + '/balance', config);
        };

        self.getTeamBalance = function() {
            var config = {
                headers:{
                    'x-auth-appkey': apiParams.appkey,
                    'x-auth-apptoken':apiParams.apptoken,
                    'x-auth-usertoken': apiParams.usertoken
                },
                withCredentials:true
            };

            return $http.get(apiParams.path + 'distributors/' + apiParams.distributorId + '/team/balance', config);
        };

        self.getBonus = function() {
            var config = {
                headers:{
                    'x-auth-appkey': apiParams.appkey,
                    'x-auth-apptoken':apiParams.apptoken,
                    'x-auth-usertoken': apiParams.usertoken
                },
                withCredentials:true
            };

            return $http.get(apiParams.path + 'distributors/' + apiParams.distributorId + '/bonus', config);
        };

        self.getTravelPoint = function() {
            var config = {
                headers:{
                    'x-auth-appkey': apiParams.appkey,
                    'x-auth-apptoken':apiParams.apptoken,
                    'x-auth-usertoken': apiParams.usertoken
                },
                withCredentials:true
            };

            return $http.get(apiParams.path + 'distributors/' + apiParams.distributorId + '/travelpoint', config);
        };

        self.getDownLine = function() {
            var config = {
                headers:{
                    'x-auth-appkey': apiParams.appkey,
                    'x-auth-apptoken':apiParams.apptoken,
                    'x-auth-usertoken': apiParams.usertoken
                },
                withCredentials:true
            };

            return $http.get(apiParams.path + 'distributors/' + apiParams.distributorId + '/downline', config);
        };

        self.getCacheReport = function(monthParam) {
            var config = {
                headers:{
                    'x-auth-appkey': apiParams.appkey,
                    'x-auth-apptoken':apiParams.apptoken,
                    'x-auth-usertoken': apiParams.usertoken
                },
                withCredentials:true
            };

            return $http.get(apiParams.path + 'distributors/' + apiParams.distributorId + '/report/months/' + monthParam, config);
        };

        self.getCacheBonus = function(monthParam) {
            var config = {
                headers:{
                    'x-auth-appkey': apiParams.appkey,
                    'x-auth-apptoken':apiParams.apptoken,
                    'x-auth-usertoken': apiParams.usertoken
                },
                withCredentials:true
            };

            return $http.get(apiParams.path + 'distributors/' + apiParams.distributorId + '/bonus/months/' + monthParam, config);
        };

    }]);

})();