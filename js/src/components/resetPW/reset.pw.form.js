(function() {
    'use strict';
    var resetPWApp = angular.module('resetPWApp');

    resetPWApp.directive('resetPwForm', ['$interval', 'PersonalCenterAPI', 'DecryptService', 'jwtHelper', 'MagenAuthService', 'apiParams', function($interval, PersonalCenterAPI, DecryptService, jwtHelper, MagenAuthService, apiParams) {
        return {
            templateUrl: 'js/src/components/resetPW/reset.pw.form.html',
            scope: {},
            restrict: 'E',
            bindToController: true,
            controllerAs: 'vm',
            controller: ['$rootScope', function resetPwFormCtrl($rootScope){
                var vm = this;

                vm.viewModal = {};
                vm.formInvalid = false;
                vm.formInvalidMsg = '';
                vm.successSubmit = false;
                vm.successSubmitMsg = '';
            }],
            link: function(scope, element, attrs){
                scope.$on('resetPw:idno', function(event, data){
                    scope.vm.viewModal.passCode = data;
                });


                element.on('click', '#reset-pw-btn', function(e){
                    var that = this;
                    var jqSpan = angular.element(that).find('#submit-button-text');
                    var beforeSubmitTxt = '';
                    var encryptString = '';
                    var userToken = MagenAuthService.getUserToken();
                    var userTokenObj = jwtHelper.decodeToken(userToken);
                    var userId = userTokenObj.uti.userId;
                    var timeoutId;

                    if(!scope.vm.resetPwForm.$invalid){
                        beforeSubmitTxt = jqSpan.text();
                        jqSpan.text('提交中...');

                        //timeoutId = $interval(function() {
                        //    jqSpan.text(beforeSubmitTxt);
                        //    //alert('修改成功');
                        //}, 1000, 1);

                        var hashPassword = CryptoJS.MD5(userId + apiParams.secret + scope.vm.viewModal.passCode);
                        var hashPasswordArray = CryptoJS.enc.Utf8.parse(hashPassword.toString());
                        var hashPassword64 = CryptoJS.enc.Base64.stringify(hashPasswordArray);

                        encryptString = DecryptService.encryptData({
                            userID: userId,
                            passCode: hashPassword64
                        });

                        PersonalCenterAPI.resetPw({
                            data: encryptString
                        }).then(function(response){
                            scope.vm.formInvalid = false;
                            jqSpan.text(beforeSubmitTxt);
                            scope.vm.successSubmit = true;
                            scope.vm.successSubmitMsg = response.data.message;
                        }, function(error) {
                            jqSpan.text(beforeSubmitTxt);
                            scope.vm.formInvalid = true;
                            scope.vm.formInvalidMsg = error.data.error.message || 'Submit error';
                        });
                    }else{
                        scope.vm.formInvalid = true;
                        scope.vm.formInvalidMsg = 'Invalid input';
                    }
                });
            }
        };
    }]);
})();