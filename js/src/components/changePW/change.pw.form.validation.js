(function(){
    'use strict';

    var changePWApp = angular.module('changePWApp');

    changePWApp.directive('validPwCount',['$compile', function($compile){
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                ngModelCtrl.$validators.pwCount = function(modelValue, viewValue){
                    var value = viewValue;

                    if(value) {
                        if(/^[0-9]{4}$/g.test(value)){
                            scope.$emit(attrs.fieldName, value);
                            return true;
                        }else{
                            return false;
                        }
                    }else{
                        return true;
                    }
                };
            }
        };
    }]);

    changePWApp.directive('validPwConfirm',function(){
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                validPwNew: '@'
            },
            link: function (scope, element, attrs, ngModel) {
                ngModel.$validators.pwConfirm = function(modelValue, viewValue){
                    var value = viewValue;

                    console.log('from valid confirm value:', value);
                    console.log('from valid confirm value:type:', typeof value);
                    console.log('scope.validPwNew:', scope.validPwNew);

                    if(value) {
                        return value === scope.validPwNew;
                    }else{
                        return true;
                    }
                };

                scope.$watch("validPwNew", function(value){
                    if(value){

                        ngModel.$setTouched();
                    }

                    ngModel.$validate();
                });
            }
        };
    });
})();