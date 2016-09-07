(function() {
    'use strict';
    var changePWApp = angular.module('changePWApp');

    changePWApp.directive('changePwForm', ['$interval', 'PersonalCenterAPI', 'DecryptService', 'jwtHelper', 'MagenAuthService', 'apiParams', function($interval, PersonalCenterAPI, DecryptService, jwtHelper, MagenAuthService, apiParams) {
        return {
            templateUrl: 'js/src/components/changePW/change.pw.form.html',
            scope: {},
            restrict: 'E',
            bindToController: true,
            controllerAs: 'vm',
            controller: ['$rootScope', function changePwFormCtrl($rootScope){
                var vm = this;

                vm.viewModal = {};
                vm.formInvalid = false;
                vm.formInvalidMsg = '';
                vm.successSubmit = false;
                vm.successSubmitMsg = '';
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

                        var hashPassword = CryptoJS.MD5(userId + apiParams.secret + scope.vm.viewModal.passCode);
                        var hashPasswordArray = CryptoJS.enc.Utf8.parse(hashPassword.toString());
                        var hashPassword64 = CryptoJS.enc.Base64.stringify(hashPasswordArray);

                        var hashNewPassword = CryptoJS.MD5(userId + apiParams.secret + scope.vm.viewModal.newPassCode);
                        var hashNewPasswordArray = CryptoJS.enc.Utf8.parse(hashNewPassword.toString());
                        var hashNewPassword64 = CryptoJS.enc.Base64.stringify(hashNewPasswordArray);

                        encryptString = DecryptService.encryptData({
                            userID: userId,
                            passCode: hashPassword64,
                            newPassCode: hashNewPassword64
                        });

                        PersonalCenterAPI.changePw({
                            data: encryptString
                        }).then(function(response){
                            jqSpan.text(beforeSubmitTxt);
                            scope.vm.formInvalid = false;
                            scope.vm.successSubmit = true;
                            scope.vm.successSubmitMsg = response.data.message;
                        }, function(error) {
                            console.log(error);
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