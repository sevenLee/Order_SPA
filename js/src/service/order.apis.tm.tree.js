
(function() {
    'use strict';

    var orderAPITMTree;

    try{
        orderAPITMTree = angular.module('order.apis.tm.tree');
    } catch(err) {
        orderAPITMTree = angular.module('order.apis.tm.tree', []);
    }

    orderAPITMTree.service('TreeAPI', ['$http', 'apiParams', function($http, apiParams) {
        var self = this;

        self.getNodesByRule = function(key, value, activeMonthParams) {
            var config = {
                headers:{
                    'x-auth-appkey': apiParams.appkey,
                    'x-auth-apptoken':apiParams.apptoken,
                    'x-auth-usertoken': apiParams.usertoken
                },
                params: {},
                withCredentials:true
            };

            config.params[key] = value;


            if(activeMonthParams){
                return $http.get(apiParams.treepath + 'distributors/' + apiParams.distributorId + '/tree/months/' + activeMonthParams, config);
            }else{
                return $http.get(apiParams.treepath + 'distributors/' + apiParams.distributorId + '/tree', config);
            }

        };

        self.getAllNodes = function() {
            var config = {
                headers:{
                    'x-auth-appkey': apiParams.appkey,
                    'x-auth-apptoken':apiParams.apptoken,
                    'x-auth-usertoken': apiParams.usertoken
                },
                withCredentials: true
            };

            return $http.get(apiParams.treepath + 'distributors/' + apiParams.distributorId + '/tree', config);
        };

        self.getAllNodesByMonth = function(monthParam) {
            var config = {
                headers:{
                    'x-auth-appkey': apiParams.appkey,
                    'x-auth-apptoken':apiParams.apptoken,
                    'x-auth-usertoken': apiParams.usertoken
                },
                withCredentials: true
            };
            //debugger;
            return $http.get(apiParams.treepath + 'distributors/' + apiParams.distributorId + '/tree/months/' + monthParam, config);
        };

        self.getDownlineById = function(downlineNo, activeMonthParams) {
            var config = {
                headers:{
                    'x-auth-appkey': apiParams.appkey,
                    'x-auth-apptoken':apiParams.apptoken,
                    'x-auth-usertoken': apiParams.usertoken
                },
                params: {
                    downlineDealerNo: downlineNo
                },
                withCredentials: true
            };

            if(activeMonthParams){
                return $http.get(apiParams.treepath + 'distributors/' + apiParams.distributorId + '/tree/months/' + activeMonthParams, config);
            }else{
                return $http.get(apiParams.treepath + 'distributors/' + apiParams.distributorId + '/tree', config);
            }
        };
    }]);
})();