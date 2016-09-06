(function() {
    'use strict';
    var changePWApp = angular.module('changePWApp');

    changePWApp.directive('changePwForm', ['$interval', 'PersonalCenterAPI', 'DecryptService', 'jwtHelper', 'MagenAuthService', function($interval, PersonalCenterAPI, DecryptService, jwtHelper, MagenAuthService) {
        return {
            templateUrl: 'js/src/components/changePW/change.pw.form.html',
            scope: {},
            restrict: 'E',
            bindToController: true,
            controllerAs: 'vm',
            controller: ['$rootScope', function changePwFormCtrl($rootScope){
                var vm = this;

                vm.viewModal = {};
            }],
            link: function(scope, element, attrs){
                scope.$on('changePw:current', function(event, data){
                    scope.vm.viewModal.passCode = data;
                });
                scope.$on('changePw:new', function(event, data){
                    scope.vm.viewModal.newPassCode = data;
                });

                element.on('click', '#change-pw-btn', function(e){
                    var that = this;
                    var jqSpan = angular.element(that).find('#submit-button-text');
                    var beforeSubmitTxt = '';
                    var encryptString = '';
                    var userToken = MagenAuthService.getUserToken();
                    var userTokenObj = jwtHelper.decodeToken(userToken);
                    var userId = userTokenObj.uti.userId;
                    var timeoutId;

                    if(!scope.vm.changePwForm.$invalid){
                        beforeSubmitTxt = jqSpan.text();
                        jqSpan.text('提交中...');

                        //timeoutId = $interval(function() {
                        //    jqSpan.text(beforeSubmitTxt);
                        //    //alert('修改成功');
                        //}, 1000, 1);

                        encryptString = DecryptService.encryptData({
                            userID: userId,
                            passCode: scope.vm.viewModal.passCode,
                            newPassCode: scope.vm.viewModal.newPassCode
                        });

                        PersonalCenterAPI.changePw({
                            data: encryptString
                        }).then(function(response){
                            jqSpan.text(beforeSubmitTxt);
                            console.log('response');
                        }, function(error) {
                            console.log('error:', error);
                        });
                    }else{
                        alert('no pass!');
                    }
                });
            }
        };
    }]);
})();