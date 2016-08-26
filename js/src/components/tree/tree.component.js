(function() {
    'use strict';
    var tmApp = angular.module('teamManageApp');

    tmApp.component('tree', {
        controllerAs: 'vm',

        controller: ['$rootScope', '$scope', '$translate', '$window', '$q', 'TreeAPI', 'DecryptService', '$state', function ScoreController($rootScope, $scope, $translate, $window, $q, TreeAPI, DecryptService, $state) {
            var vm = this;

            vm.count              = 0;
            vm.pageState          = 0;
            vm.loaderShow         = false;
            vm.getApiSuccess     = false;
            vm.getPrevApiSuccess = false;
            vm.searchMode         = false;
            vm.downlineMode       = false;
            vm.searchInvalid = false;
            vm.searchError        = false;
            vm.searchErrorMessage = '';
            vm.activeOpenCollapse = 'close';
            vm.activeSize         = 0;
            vm.activeMonthParams = null;
            vm.historyIn = '0';

            vm.viewModel = {
                allNodes: []
            };

            vm.view = {
                subNodes: null,
                firstNode: null
            };

            vm.search = {
                ruleType: 'dealerName',
                inputName: null,
                inputNum: null,
                ranking: null
            };

            vm.ruleTypeList = [{
                value: 'dealerName',
                text: '成員姓名'
            },{
                value: 'dealerNo',
                text: '成員編號'
            },{
                value: 'ranking',
                text: '級別'
            }];

            vm.rankList = [{
                value: '10',
                text: '見習業務主任'
            },{
                value: '20',
                text: '業務主任'
            },{
                value: '30',
                text: '高級業務主任'
            },{
                value: '40',
                text: '見習業務經理'
            },{
                value: '50',
                text: '業務經理'
            },{
                value: '60',
                text: '高級業務經理'
            },{
                value: '70',
                text: '業務總監'
            },{
                value: '80',
                text: '高級業務總監'
            },{
                value: '90',
                text: '首席業務總監'
            }];



            vm.onChangeRuleType = function () {
                vm.search.inputName = null;
                vm.search.inputNum = null;
                vm.search.ranking = null;

                if(vm.search.ruleType === 'ranking'){
                    vm.search.ranking = '10';
                }
            };

            vm.openCollapse = function () {
                vm.activeOpenCollapse = 'open';
                vm.view.subNodes.forEach(function(elm, index){
                    elm.active = true;
                });

                vm.activeSize = vm.view.subNodes.length;
            };

            vm.closeCollapse = function () {
                vm.activeOpenCollapse = 'close';
                vm.view.subNodes.forEach(function(elm, index){
                    elm.active = false;
                });

                vm.activeSize = 0;
            };

            vm.autoActiveCollapseBtn = function () {
                var innerSize = vm.view.subNodes.length;

                if(vm.activeSize === innerSize){
                    vm.activeOpenCollapse = 'open';
                }else if(vm.activeSize === 0) {
                    vm.activeOpenCollapse = 'close';
                }else{
                    vm.activeOpenCollapse = '';
                }
            };

            vm.nodeClickHandler = function (nodes, node) {
                var activeIndex = nodes.indexOf(node);

                vm.view.subNodes[activeIndex].active = !vm.view.subNodes[activeIndex].active;

                if(vm.view.subNodes[activeIndex].active) {
                    vm.activeSize += 1;
                }else{
                    vm.activeSize -= 1;
                }

                vm.autoActiveCollapseBtn();
            };

            vm.getDefaultStateParams = function () {
                var stateParamObj = {
                    dealerName: '',
                    dealerNo: '',
                    ranking: '',
                    downlineDealerNo: '',
                    ruleType: 'dealerName',
                    search: '',
                    activeMonth: '',
                    count: '0'
                };
                return stateParamObj;
            };

            vm.resetDisplayNodes = function () {
                vm.view.subNodes = [];
                vm.view.firstNode = {};
            };

            vm.resetSearchParams = function() {
                vm.search = {
                    ruleType: 'dealerName',
                    inputName: null,
                    inputNum: null,
                    ranking: null
                };
            };

            vm.resetPageParams = function() {
                vm.searchMode = false;
                vm.downlineMode = false;
                vm.activeSize = 0;
                vm.activeOpenCollapse = 'close';
                vm.searchError = false;
                vm.searchErrorMessage = '';
                vm.searchInvalid = false;
            };

            vm.resetPage = function() {
                vm.resetSearchParams();
                vm.resetPageParams();
                vm.loadAllNodesByHistory();
            };

            vm.loadAllNodesByHistory = function() {
                if($state.params.activeMonth && $state.params.activeMonth !== vm.currentMonthParams){

                    var year = $state.params.activeMonth.slice(0, 4);
                    var month = ($state.params.activeMonth.charAt(4) === '0') ? $state.params.activeMonth.charAt(5) : $state.params.activeMonth.slice(4);

                    vm.loadPrevApis(year, month).then(function() {
                        //vm.activeMonthParams = $state.params.activeMonth;
                        vm.count = $state.params.count*1;

                        if(vm.count == 0) {
                            vm.pageState = 0;
                        }else{
                            vm.pageState = 1;
                        }

                        vm.view.activeMonth = month*1;
                        vm.view.activeYear = year*1;
                        vm.view.activeDateDOB = new Date(vm.view.activeYear, vm.view.activeMonth-1);
                    });

                }else{
                    vm.loadAllApis();
                }
            };

            vm.getSearchStateParams = function (key, value) {
                var stateParamObj = vm.getDefaultStateParams();
                var keysArray = _.keys(stateParamObj);

                _.map(keysArray, function(elm){
                    if(elm === key){
                        stateParamObj[elm] = value;
                    }else{
                        stateParamObj[elm] = '';
                    }
                });

                stateParamObj.ruleType = vm.search.ruleType;
                stateParamObj.search = '1';

                return stateParamObj;
            };

            vm.onBackState = function () {
                $window.history.back();
            };

            vm.searchSubmit = function (activeMonthParams) {
                var key = '',
                    value = '';

                key = vm.search.ruleType;

                switch(key) {
                    case 'ranking':
                        value = vm.search.ranking;
                        break;
                    case 'dealerNo':
                        value = vm.search.inputNum;
                        if(typeof value !== 'number' || !value){
                            vm.searchInvalid = true;
                            return;
                        }

                        break;
                    case 'dealerName':
                        value = vm.search.inputName;
                        if(!value){
                            vm.searchInvalid = true;

                            return;


                        }

                        break;
                }

                vm.searchInvalid = false;

                return vm.getNodesByRuleHandler(key, value, activeMonthParams);
            };

            vm.renderNodes = function() {

                if(!vm.searchMode){
                    vm.view.firstNode = vm.view.subNodes[0];
                    vm.view.subNodes = vm.view.subNodes.slice(1);

                }else{
                    vm.view.firstNode = null;
                }


                vm.view.subNodes = _.map(vm.view.subNodes, function(elm){
                    return _.assign(elm, {active: false});
                });

            };

            vm.getNodesByRuleHandler = function (key, value, activeMonthParams) {
                vm.loaderShow = true;

                var activeM = activeMonthParams || $state.params.activeMonth;

                return TreeAPI.getNodesByRule(key, value, activeM)
                    .then(function(res) {
                        var stateParamObj = vm.getSearchStateParams(key, value);

                        vm.resetPageParams();
                        vm.resetDisplayNodes();

                        vm.searchMode = true;

                        vm.viewModel.allNodes = DecryptService.decryptData(res.data.data).trees;
                        vm.view.subNodes = angular.copy(vm.viewModel.allNodes);

                        vm.renderNodes();

                        vm.loaderShow = false;



                        if(vm.historyIn === '0') {
                            if(vm.activeMonthParams && vm.activeMonthParams !== vm.currentMonthParams){
                                stateParamObj.activeMonth = vm.activeMonthParams;
                                stateParamObj.count = String(vm.count);
                            }

                            $state.go('.', stateParamObj, {notify: false});
                        }

                        vm.historyIn = '0';

                    }, function(err) {
                        console.log('Error:', err);

                        vm.view.subNodes = [];
                        vm.view.firstNode = {};

                        vm.searchError = true;
                        vm.searchErrorMessage = err.statusText;
                        vm.loaderShow = false;
                    });
            };

            vm.getDownlineByIdHandler = function (downlineNo, event, activeMonthParams) {
                if(event){
                    event.stopPropagation();
                }

                vm.loaderShow = true;

                var activeM = activeMonthParams || $state.params.activeMonth;

                return TreeAPI.getDownlineById(downlineNo, activeM)
                    .then(function(res) {
                        var stateParamObj = vm.getDefaultStateParams();
                        vm.resetPageParams();
                        vm.resetDisplayNodes();

                        vm.downlineMode = true;

                        vm.viewModel.allNodes = DecryptService.decryptData(res.data.data).trees;
                        vm.view.subNodes = angular.copy(vm.viewModel.allNodes);

                        vm.renderNodes();

                        vm.loaderShow = false;

                        if(vm.historyIn === '0'){
                            if(vm.activeMonthParams && vm.activeMonthParams !== vm.currentMonthParams){
                                stateParamObj.activeMonth = vm.activeMonthParams;
                                stateParamObj.count = String(vm.count);
                            }

                            stateParamObj.downlineDealerNo = downlineNo;

                            $state.go('.', stateParamObj, {notify: false});
                        }

                        vm.historyIn = '0';
                    });
            };

            vm.getAllNodesHandler = function () {
                var defferAllNodes       = $q.defer();
                return TreeAPI.getAllNodes()
                    .then(function (res) {
                        vm.resetPageParams();
                        vm.resetDisplayNodes();

                        vm.activeMonthParams = null;
                        vm.getApiSuccess = true;

                        vm.viewModel.allNodes = DecryptService.decryptData(res.data.data).trees;
                        vm.view.subNodes = angular.copy(vm.viewModel.allNodes);

                        vm.renderNodes();

                        vm.loaderShow = false;

                        defferAllNodes.resolve();
                        return defferAllNodes.promise;
                    }, function(err){
                        vm.loaderShow = false;
                        console.log('err:',err);
                    });
            };

            vm.getAllNodesByMonthHandler = function (year, month) {
                var monthParam = year + ('0' + month).slice(-2);

                return TreeAPI.getAllNodesByMonth(monthParam)
                    .then(function (res) {
                        var deferred = $q.defer();

                        deferred.resolve({
                            res: res,
                            monthParam: monthParam
                        });
                        return deferred.promise;
                    });
            };

            vm.loadAllApis = function () {
                vm.loaderShow = true;
                vm.getApiSuccess = false;
                return vm.getAllNodesHandler();
            };

            vm.loadPrevApis = function (year, month) {
                vm.loaderShow = true;
                vm.getPrevApiSuccess = false;

                var getAllNodesByMonthProm = vm.getAllNodesByMonthHandler(year, month);

                return $q.all([getAllNodesByMonthProm])
                    .then(function (result) {
                        vm.resetPageParams();
                        vm.resetDisplayNodes();

                        vm.activeMonthParams = result[0].monthParam;
                        vm.getPrevApiSuccess = true;

                        vm.viewModel.allNodes = DecryptService.decryptData(result[0].res.data.data).trees;
                        vm.view.subNodes = angular.copy(vm.viewModel.allNodes);

                        vm.renderNodes();

                        vm.loaderShow = false;
                    }, function(err){
                        vm.loaderShow = false;
                        console.log('err:',err);
                    });
            };

            vm.loadPrevPage = function() {
                var month = ((vm.view.activeMonth - 1)%12 === 0) ? 12 : (vm.view.activeMonth -1)%12;
                var tempCount = vm.count - 1;
                var tempPageState = null;
                var year = angular.copy(vm.view.activeYear);

                if(month === 12) year -= 1;



                tempPageState = (tempCount === 0) ? 0 : 1;

                if(tempPageState !== 0) {
                    vm.loadPrevApis(year, month).then(function() {
                        vm.activePrePageDisplay(vm.getPrevApiSuccess);
                    });
                }else{
                    vm.loadAllApis().then(function() {
                        vm.activePrePageDisplay(vm.getApiSuccess);
                    });
                }
            };

            vm.loadNextPage = function() {
                if(vm.view.activeMonth === vm.view.currentMonth) return;

                var month = ((vm.view.activeMonth + 1)%12 === 0) ? 12 : (vm.view.activeMonth + 1)%12;
                var tempCount = vm.count + 1;
                var tempPageState = null;
                var year = angular.copy(vm.view.activeYear);

                if(month === 1) year += 1;

                tempPageState = (tempCount === 0) ? 0 : 1;

                if(tempPageState !== 0) {
                    vm.loadPrevApis(year, month).then(function() {
                        vm.activeNextPageDisplay(vm.getPrevApiSuccess);
                    });
                }else{
                    vm.loadAllApis().then(function() {
                        vm.activeNextPageDisplay(vm.getApiSuccess);
                    });
                }
            };

            vm.activePrePageDisplay = function(canActive) {
                if(canActive) {
                    var stateParamObj = vm.getDefaultStateParams();

                    vm.count -= 1;

                    if(vm.count == 0) {
                        vm.pageState = 0;
                    }else{
                        vm.pageState = 1;
                    }

                    vm.view.activeMonth = ((vm.view.activeMonth - 1)%12 === 0) ? 12 : (vm.view.activeMonth -1)%12;

                    $rootScope.tmActiveMonth = angular.copy(vm.activeMonthParams);
                    $rootScope.tmMonthCount =  angular.copy(vm.count);

                    vm.resetPageParams();
                    vm.resetSearchParams();

                    if(vm.view.activeMonth === 12) vm.view.activeYear -= 1;

                    vm.view.activeDateDOB = new Date(vm.view.activeYear, vm.view.activeMonth-1);

                    if(vm.activeMonthParams){
                        stateParamObj.activeMonth = vm.activeMonthParams;
                        stateParamObj.count = String(vm.count);
                    }

                    $state.go('.', stateParamObj, {notify: false});
                }
            };

            vm.activeNextPageDisplay = function(canActive) {
                if(canActive) {
                    var stateParamObj = vm.getDefaultStateParams();

                    vm.count += 1;

                    if(vm.count == 0) {
                        vm.pageState = 0;
                    }else{
                        vm.pageState = 1;
                    }

                    vm.view.activeMonth = ((vm.view.activeMonth + 1)%12 === 0) ? 12 : (vm.view.activeMonth + 1)%12;

                    $rootScope.tmActiveMonth = angular.copy(vm.activeMonthParams);
                    $rootScope.tmMonthCount =  angular.copy(vm.count);

                    vm.resetPageParams();
                    vm.resetSearchParams();

                    if(vm.view.activeMonth === 1) vm.view.activeYear += 1;

                    vm.view.activeDateDOB = new Date(vm.view.activeYear, vm.view.activeMonth-1);

                    if(vm.activeMonthParams){
                        stateParamObj.activeMonth = vm.activeMonthParams;
                        stateParamObj.count = String(vm.count);
                    }

                    $state.go('.', stateParamObj, {notify: false});
                }
            };

            vm.setStateParams = function () {
                if($state.params.search === '1') {
                    vm.historyIn = '1';

                    vm.search.ruleType = $state.params.ruleType;

                    switch ($state.params.ruleType){
                        case 'dealerName':
                            vm.search.inputName = $state.params.dealerName;

                            break;
                        case 'dealerNo':
                            vm.search.inputNum = $state.params.dealerNo*1;

                            break;
                        case 'ranking':
                            vm.search.inputNum = null;
                            vm.search.inputName = null;
                            vm.search.ranking = $state.params.ranking;

                            break;
                    }

                    if($state.params.activeMonth && $state.params.activeMonth !== vm.currentMonthParams){
                        var stateActiveMonth = $state.params.activeMonth;

                        vm.searchSubmit(stateActiveMonth).then(function(){
                            vm.activeMonthParams = $state.params.activeMonth;
                            vm.count = $state.params.count*1;

                            if(vm.count == 0) {
                                vm.pageState = 0;
                            }else{
                                vm.pageState = 1;
                            }
                        });
                    }else{
                        vm.searchSubmit();
                    }
                }else if($state.params.downlineDealerNo !== ''){
                    vm.historyIn = '1';

                    if($state.params.activeMonth && $state.params.activeMonth !== vm.currentMonthParams){
                        var year = $state.params.activeMonth.slice(0, 4);
                        var month = ($state.params.activeMonth.charAt(4) === '0') ? $state.params.activeMonth.charAt(5) : $state.params.activeMonth.slice(4);

                        vm.getDownlineByIdHandler($state.params.downlineDealerNo, null, $state.params.activeMonth).then(function() {
                            vm.activeMonthParams = $state.params.activeMonth;
                            vm.count = $state.params.count*1;

                            if(vm.count == 0) {
                                vm.pageState = 0;
                            }else{
                                vm.pageState = 1;
                            }

                            vm.view.activeMonth = month*1;
                            vm.view.activeYear = year*1;
                            vm.view.activeDateDOB = new Date(vm.view.activeYear, vm.view.activeMonth-1);
                        }, function(err){
                            consile.log('getDownline Error:', err);
                        })
                    }else{
                        vm.getDownlineByIdHandler($state.params.downlineDealerNo);
                    }


                }else{
                    vm.loadAllNodesByHistory();
                }
            };

            vm.getNowDOB = function() {
                vm.nowDateDOB = new Date();
                vm.view.currentYear    = vm.nowDateDOB.getFullYear();
                vm.view.currentMonth   = vm.nowDateDOB.getMonth() + 1;
                vm.currentMonthParams = vm.view.currentYear + ('0' + vm.view.currentMonth).slice(-2);
            };

            vm.setActiveDOB = function (){

                if($rootScope.tmActiveMonth){
                    var stateParamObj = angular.copy($state.params);

                    stateParamObj.activeMonth = $rootScope.tmActiveMonth;
                    stateParamObj.count = $rootScope.tmMonthCount;
                    $state.go('.', stateParamObj, {notify: true});

                    vm.view.activeYear = $rootScope.tmActiveMonth.slice(0, 4);
                    vm.view.activeYear = vm.view.activeYear*1;
                    vm.view.activeMonth = ($rootScope.tmActiveMonth.charAt(4) === '0') ? $rootScope.tmActiveMonth.charAt(5) : $rootScope.tmActiveMonth.slice(4);
                    vm.view.activeMonth = vm.view.activeMonth*1;
                    vm.view.activeDateDOB = new Date(vm.view.activeYear, vm.view.activeMonth-1);
                }else{
                    vm.view.activeYear  = angular.copy(vm.view.currentYear);
                    vm.view.activeMonth  = angular.copy(vm.view.currentMonth);
                    vm.view.activeDateDOB = angular.copy(vm.nowDateDOB);
                }
            };

            vm.DOBSetting = function () {
                vm.getNowDOB();
                vm.setActiveDOB();
            };

            vm.renderRankingList = function() {
                vm.rankList.forEach(function(elm){
                    $translate('TM.Ranking_List.'+ elm.value)
                        .then(function (result){
                            var index = vm.rankList.indexOf(elm);

                            vm.rankList[index].text = result;
                        });
                });
            };

            vm.renderRuleTypeList = function() {
                vm.ruleTypeList.forEach(function(elm){
                    $translate('TM.Rule_Type_List.'+ elm.value)
                        .then(function (result){
                            var index = vm.ruleTypeList.indexOf(elm);

                            vm.ruleTypeList[index].text = result;
                        });
                });
            };

            vm.watchingScope = function () {
                $scope.$watch('$root.activeLangCode', function(current, original) {
                    if(current !== original) {
                        vm.rankList.forEach(function(elm){
                            $translate.use($rootScope.activeLangCode)
                                .then(function(){
                                    $translate('TM.Ranking_List.'+ elm.value)
                                        .then(function (result){
                                            var index = vm.rankList.indexOf(elm);

                                            vm.rankList[index].text = result;
                                        });
                                });
                        });

                        vm.ruleTypeList.forEach(function(elm){
                            $translate.use($rootScope.activeLangCode)
                                .then(function(){
                                    $translate('TM.Rule_Type_List.'+ elm.value)
                                        .then(function (result){
                                            var index = vm.ruleTypeList.indexOf(elm);

                                            vm.ruleTypeList[index].text = result;
                                        });
                                });
                        });
                    }
                });
            };


            activate();

            function activate() {
                vm.renderRankingList();
                vm.renderRuleTypeList();
                vm.DOBSetting();
                vm.setStateParams();
                vm.watchingScope();
            }
        }],
        templateUrl: 'js/src/components/tree/tree.component.html'
    });
})();