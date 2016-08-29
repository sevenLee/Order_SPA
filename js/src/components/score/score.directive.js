(function() {
    'use strict';
    var tmApp = angular.module('teamManageApp');

    tmApp.directive('score', function(){
        return {
            templateUrl: 'js/src/components/score/score.directive.html',
            scope: {},
            bindToController: true,
            controllerAs: 'vm',
            controller: ['$rootScope', '$scope', '$q', '$filter', '$translate', '$sce', 'DistributorsAPI', 'DecryptService', function ScoreController($rootScope, $scope, $q, $filter, $translate, $sce, DistributorsAPI, DecryptService) {
                var vm = this;

                vm.count             = 0;
                vm.pageState         = 0;
                vm.loaderShow        = false;
                vm.getApiSuccess     = false;
                vm.getPrevApiSuccess = false;
                vm.view              = {
                    balanceObj: {
                        PPV: '0',
                        GPV: '0'
                    },
                    teamObj: {
                        total: '0',
                        totalNew: '0',
                        cnt: {
                            cnt500K: '0',
                            cnt100K: '0',
                            cnt10K: '0'
                        }
                    },
                    teamBalanceObj: {
                        totalOV: '0',
                        localOV: '0',
                        intlOV: '0'
                    },
                    bonusObj: {
                        localBonus: '0',
                        intlBonus: '0'
                    },
                    travelPointObj: {},
                    downLineObj: {},
                    cacheReportObj: {
                        PPV: '0'
                    }
                };

                vm.viewModel = {
                    balanceObj: {},
                    teamObj: {},
                    teamBalanceObj: {},
                    bonusObj: {},
                    travelPointObj: {},
                    downLineObj: {},
                    cacheReportObj: {}
                };

                vm.getBalanceHandler = function () {
                    var defferBalance       = $q.defer();
                    return DistributorsAPI.getBalance()
                        .then(function (res) {
                            vm.viewModel.balanceObj = DecryptService.decryptData(res.data.data);

                            defferBalance.resolve();
                            return defferBalance.promise;
                        });
                };

                vm.getBalanceViewUpdate = function () {
                    vm.view.balanceObj      = angular.copy(vm.viewModel.balanceObj);
                };

                vm.getTeamBalanceHandler = function () {
                    var defferTeamBalance       = $q.defer();

                    return DistributorsAPI.getTeamBalance()
                        .then(function (res) {
                            vm.viewModel.teamBalanceObj = DecryptService.decryptData(res.data.data);

                            defferTeamBalance.resolve();
                            return defferTeamBalance.promise;
                        });
                };

                vm.getTeamBalanceViewUpdate = function () {
                    vm.view.teamBalanceObj      = angular.copy(vm.viewModel.teamBalanceObj);
                };

                vm.getBonusHandler = function () {
                    var defferBonus       = $q.defer();

                    return DistributorsAPI.getBonus()
                        .then(function (res) {
                            vm.viewModel.bonusObj = DecryptService.decryptData(res.data.data);

                            defferBonus.resolve();
                            return defferBonus.promise;
                        });
                };

                vm.getBonusViewUpdate = function () {
                    vm.view.bonusObj      = angular.copy(vm.viewModel.bonusObj);

                    if(vm.view.bonusObj.localPeriod === null) {
                        vm.view.bonusObj.localPeriod = 'eqnull';
                    }

                    if(vm.view.bonusObj.intlPeriod === null) {
                        vm.view.bonusObj.intlPeriod = 'eqnull';
                    }
                };

                vm.getTravelPointHandler = function () {
                    var defferTravelPoint       = $q.defer();

                    return DistributorsAPI.getTravelPoint()
                        .then(function (res) {
                            vm.viewModel.travelPointObj = DecryptService.decryptData(res.data.data);

                            defferTravelPoint.resolve();
                            return defferTravelPoint.promise;
                        });
                };

                vm.getTravelPointViewUpdate = function () {
                    var travelPointTempObj               = angular.copy(vm.viewModel.travelPointObj);
                    vm.view.travelPointObj.TP            = travelPointTempObj.TP;
                    vm.view.travelPointObj.Recruit       = travelPointTempObj.Recruit;
                    vm.view.travelPointObj.PGV           = travelPointTempObj.PGV;
                    vm.view.travelPointObj.FromDate      = travelPointTempObj.FromDate;
                    vm.view.travelPointObj.ToDate        = travelPointTempObj.ToDate;
                    vm.view.travelPointObj.travelDataStr = '...';
                };

                vm.getTeamHandler = function () {
                    var defferTeam       = $q.defer();

                    return DistributorsAPI.getTeam()
                        .then(function (res) {
                            vm.viewModel.teamObj = DecryptService.decryptData(res.data.data);

                            defferTeam.resolve();
                            return defferTeam.promise;
                        });
                };

                vm.getTeamViewUpdate = function () {
                    vm.view.teamObj      = angular.copy(vm.viewModel.teamObj);

                    vm.viewModel.teamObj.region.forEach(function(elm){
                        $translate('TM.Region_Code.'+ elm.regionCode)
                            .then(function (result){
                                var index = vm.viewModel.teamObj.region.indexOf(elm);

                                vm.view.teamObj.region[index].regionCode = result;
                            });
                    });

                    vm.cntBarVisulaize(vm.view.teamObj.cnt);
                };

                vm.getDownLineHandler = function () {
                    var defferDownLine       = $q.defer();

                    return DistributorsAPI.getDownLine()
                        .then(function (res) {
                            vm.viewModel.downLineObj = DecryptService.decryptData(res.data.data);

                            defferDownLine.resolve();
                            return defferDownLine.promise;
                        });
                };

                vm.getDownLineViewUpdate = function () {
                    vm.view.downLineObj      = angular.copy(vm.viewModel.downLineObj);

                };

                vm.getCacheReportHandler = function (year, month) {
                    var defferCacheReport       = $q.defer();
                    var monthParam = year + ('0' + month).slice(-2);

                    return DistributorsAPI.getCacheReport(monthParam)
                        .then(function (res) {
                            vm.viewModel.cacheReportObj = DecryptService.decryptData(res.data.data);
                        });
                };

                vm.getCacheReportViewUpdate = function () {
                    vm.view.cacheReportObj = angular.copy(vm.viewModel.cacheReportObj);

                    vm.view.teamBalanceObj.localOV = vm.view.cacheReportObj.teamBalance.localOV;
                    vm.view.teamBalanceObj.intlOV  = vm.view.cacheReportObj.teamBalance.intlOV;
                    vm.view.teamBalanceObj.totalOV = vm.view.cacheReportObj.teamBalance.totalOV;

                    vm.view.teamObj.cnt.cnt500K = vm.view.cacheReportObj.teamStructure.cnt.cnt500K;
                    vm.view.teamObj.cnt.cnt100K = vm.view.cacheReportObj.teamStructure.cnt.cnt100K;
                    vm.view.teamObj.cnt.cnt10K  = vm.view.cacheReportObj.teamStructure.cnt.cnt10K;

                    vm.view.teamObj.total    = vm.view.cacheReportObj.teamStructure.total;
                    vm.view.teamObj.totalNew = vm.view.cacheReportObj.teamStructure.totalNew;
                    vm.view.teamObj.region   = vm.view.cacheReportObj.teamStructure.region;


                    vm.viewModel.cacheReportObj.teamStructure.region.forEach(function(elm){
                        $translate('TM.Region_Code.'+ elm.regionCode)
                            .then(function (result){
                                var index = vm.viewModel.cacheReportObj.teamStructure.region.indexOf(elm);

                                vm.view.teamObj.region[index].regionCode = result;

                            });
                    });

                    vm.cntBarVisulaize(vm.view.teamObj.cnt);
                };

                vm.getCacheBonusHandler = function (year, month) {
                    var defferCacheBonus       = $q.defer();
                    var monthParam = year + ('0' + month).slice(-2);

                    return DistributorsAPI.getCacheBonus(monthParam)
                        .then(function (res) {
                            vm.viewModel.cacheBonusObj = DecryptService.decryptData(res.data.data);

                        });
                };

                vm.getCacheBonusViewUpdate = function () {
                    vm.view.cacheBonusObj      = angular.copy(vm.viewModel.cacheBonusObj);

                    vm.view.bonusObj.localPeriod     = vm.view.cacheBonusObj.localPeriod;
                    vm.view.bonusObj.intlPeriod      = vm.view.cacheBonusObj.intlPeriod;
                    vm.view.bonusObj.localUpdateFlag = vm.view.cacheBonusObj.localUpdateFlag;
                    vm.view.bonusObj.localBonus      = vm.view.cacheBonusObj.localBonus;
                    vm.view.bonusObj.intlUpdateFlag  = vm.view.cacheBonusObj.intlUpdateFlag;
                    vm.view.bonusObj.intlBonus       = vm.view.cacheBonusObj.intlBonus;
                    vm.view.bonusObj.curCodeBonus    = vm.view.cacheBonusObj.curCodeBonus;

                    if(vm.view.bonusObj.localPeriod === null) {
                        vm.view.bonusObj.localPeriod = 'eqnull';
                    }

                    if(vm.view.bonusObj.intlPeriod === null) {
                        vm.view.bonusObj.intlPeriod = 'eqnull';
                    }
                };

                vm.cntBarVisulaize = function (cntObj){
                    var min_cnt_percentage = 10;
                    var remainPercentage   = min_cnt_percentage * 7;
                    var cnt500k            = cntObj.cnt500K;
                    var cnt100k            = cntObj.cnt100K;
                    var cnt10k             = cntObj.cnt10K;
                    var total              = cnt500k + cnt100k + cnt10k;

                    if (total === 0) {
                        cnt500k = 33.33;
                        cnt100k = 33.33;
                        cnt10k  = 33.33;
                    } else {
                        cnt500k = min_cnt_percentage + (cnt500k / total) * remainPercentage;
                        cnt100k = min_cnt_percentage + (cnt100k / total) * remainPercentage;
                        cnt10k  = min_cnt_percentage + (cnt10k / total) * remainPercentage;
                    }

                    vm.view.teamObj.cnt500k = cnt500k + '%';
                    vm.view.teamObj.cnt100k = cnt100k + '%';
                    vm.view.teamObj.cnt10k  = cnt10k + '%';
                };

                vm.reload = function() {
                    vm.loadAllApis();
                };

                vm.loadAllApis = function () {
                    vm.loaderShow = true;
                    vm.getApiSuccess = false;

                    var getBalanceProm     = vm.getBalanceHandler();
                    var getTeamBalanceProm = vm.getTeamBalanceHandler();
                    var getBonusProm       = vm.getBonusHandler();
                    var getTravelPointProm = vm.getTravelPointHandler();
                    var getTeamProm        = vm.getTeamHandler();
                    var getDownLineProm    = vm.getDownLineHandler();

                    return $q.all([getBalanceProm, getTeamBalanceProm, getBonusProm, getTravelPointProm, getTeamProm, getDownLineProm])
                        .then(function (result) {
                            vm.getBalanceViewUpdate();
                            vm.getTeamBalanceViewUpdate();
                            vm.getBonusViewUpdate();
                            vm.getTravelPointViewUpdate();
                            vm.getTeamViewUpdate();
                            vm.getDownLineViewUpdate();

                            vm.getApiSuccess = true;
                            vm.loaderShow = false;
                            vm.localTime = new Date();
                        }, function(err){
                            vm.loaderShow = false;
                            console.log('err:',err);
                        });
                };

                vm.loadPrevApis = function (year, month) {
                    vm.loaderShow = true;
                    vm.getPrevApiSuccess = false;

                    var getCacheReportProm = vm.getCacheReportHandler(year, month);
                    var getCacheBonusProm = vm.getCacheBonusHandler(year, month);

                    return $q.all([getCacheReportProm, getCacheBonusProm])
                        .then(function (result) {
                            vm.getCacheReportViewUpdate();
                            vm.getCacheBonusViewUpdate();

                            vm.loaderShow = false;
                            vm.getPrevApiSuccess = true;
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

                vm.loadHistoryApis =function () {
                    vm.count = $rootScope.tmMonthCount;
                    vm.pageState = 1;

                    vm.loadPrevApis(vm.view.activeYear, vm.view.activeMonth);
                };

                vm.activePrePageDisplay = function(canActive) {
                    if(canActive) {
                        vm.count -= 1;

                        if(vm.count == 0) {
                            vm.pageState = 0;
                        }else{
                            vm.pageState = 1;
                        }

                        vm.view.activeMonth = ((vm.view.activeMonth - 1)%12 === 0) ? 12 : (vm.view.activeMonth -1)%12;

                        vm.activeMonthParams = vm.view.activeYear + ('0' + vm.view.activeMonth).slice(-2);

                        vm.activeMonthParams = (vm.activeMonthParams === vm.currentMonthParams) ? '' : vm.activeMonthParams;

                        $rootScope.tmActiveMonth = angular.copy(vm.activeMonthParams);
                        $rootScope.tmMonthCount =  angular.copy(vm.count);

                        if(vm.view.activeMonth === 12) vm.view.activeYear -= 1;

                        vm.view.activeDateDOB = new Date(vm.view.activeYear, vm.view.activeMonth-1);
                    }
                };

                vm.activeNextPageDisplay = function(canActive) {
                    if(canActive) {
                        vm.count += 1;

                        if(vm.count == 0) {
                            vm.pageState = 0;
                        }else{
                            vm.pageState = 1;
                        }

                        vm.view.activeMonth = ((vm.view.activeMonth + 1)%12 === 0) ? 12 : (vm.view.activeMonth + 1)%12;

                        vm.activeMonthParams = vm.view.activeYear + ('0' + vm.view.activeMonth).slice(-2);

                        vm.activeMonthParams = (vm.activeMonthParams === vm.currentMonthParams) ? '' : vm.activeMonthParams;

                        $rootScope.tmActiveMonth = angular.copy(vm.activeMonthParams);
                        $rootScope.tmMonthCount =  angular.copy(vm.count);

                        if(vm.view.activeMonth === 1) vm.view.activeYear += 1;

                        vm.view.activeDateDOB = new Date(vm.view.activeYear, vm.view.activeMonth-1);
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

                vm.setState = function () {
                  if($rootScope.tmActiveMonth){
                      vm.loadHistoryApis();
                  }else{
                      vm.loadAllApis();
                  }
                };

                vm.watchingScope = function () {
                    $scope.$watch('$root.activeLangCode', function(current, original) {
                        if(current !== original) {
                            if(vm.pageState === 0){
                                vm.viewModel.teamObj.region.forEach(function(elm){
                                    $translate.use($rootScope.activeLangCode)
                                        .then(function(){
                                            $translate('TM.Region_Code.'+ elm.regionCode)
                                                .then(function (result){
                                                    var index = vm.viewModel.teamObj.region.indexOf(elm);

                                                    vm.view.teamObj.region[index].regionCode = result;
                                                });
                                        });
                                });
                            }else{
                                vm.viewModel.cacheReportObj.teamStructure.region.forEach(function(elm) {
                                    $translate.use($rootScope.activeLangCode)
                                        .then(function () {
                                            $translate('TM.Region_Code.' + elm.regionCode)
                                                .then(function (result) {
                                                    var index = vm.viewModel.cacheReportObj.teamStructure.region.indexOf(elm);

                                                    vm.view.teamObj.region[index].regionCode = result;
                                                });
                                        });
                                });
                            }
                        }
                    });
                };

                activate();

                function activate() {
                    vm.DOBSetting();
                    vm.setState();
                    vm.watchingScope();

                }
            }]
        };

    });
})();