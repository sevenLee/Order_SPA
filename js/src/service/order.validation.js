(function(){
    'use strict';

    var orderValidation;

    try{
        orderValidation = angular.module('order.validation');
    } catch(err) {
        orderValidation = angular.module('order.validation', []);
    }

    orderValidation.directive('validPwCount',['$compile', function($compile){
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

    orderValidation.directive('validPwConfirm',function(){
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                validPwNew: '@'
            },
            link: function (scope, element, attrs, ngModel) {
                ngModel.$validators.pwConfirm = function(modelValue, viewValue){
                    var value = viewValue;

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