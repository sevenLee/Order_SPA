(function() {
    'use strict';
    var tmApp = angular.module('teamManageApp');

    tmApp.filter('downlineDateFilter', function(){
        return function(date){
            if(date) {
                return date.slice(0, 7);
            }
        }
    });

    tmApp.filter('tmPeriodFilter', function(){
        return function(period, currentMonthParams, env){
            var currentYear = parseInt(currentMonthParams.slice(0, 4));
            var currentMonth = (currentMonthParams.charAt(4) === '0') ? currentMonthParams.charAt(5) : currentMonthParams.slice(4);
            var outputMonth2chars;
            var outputMonth;

            if(period === 'eqnull' && env === 'local') {
                currentMonth = parseInt(currentMonth);
                outputMonth = ((currentMonth - 1) <= 0) ? (currentMonth - 1) + 12 : (currentMonth -1);
                outputMonth2chars = ('0' + outputMonth).slice(-2);

                if((currentMonth - 1) <= 0) currentYear -= 1;

                return currentYear + '/' + outputMonth2chars;
            }

            if(period === 'eqnull' && env === 'intl') {
                currentMonth = parseInt(currentMonth);
                outputMonth = ((currentMonth - 2) <= 0) ? (currentMonth - 2) + 12 : (currentMonth -2);
                outputMonth2chars = ('0' + outputMonth).slice(-2);

                if((currentMonth - 2) <= 0) currentYear -= 1;

                return currentYear + '/' + outputMonth2chars;
            }

            if(period) {
                var wordArray = period.split('');
                wordArray.splice(4, 0, '/');
                return wordArray.join('');
            }
        }
    });

    tmApp.filter('tmTravelPointDateFilter', function(){
        return function(dateStr, fromDate, toDate){
            if(!fromDate || !toDate){
                return '&nbsp;';
            }else{
                var filterStr = '';
                var fromDateYear = fromDate.slice(0, 4);
                var fromDateMonth = fromDate.slice(4);
                var toDateYear = toDate.slice(0, 4);
                var toDateMonth = toDate.slice(4);

                if(fromDateYear === toDateYear) {
                    filterStr = fromDateYear + '.' + fromDateMonth + '~' + toDateMonth;
                }else {
                    filterStr = fromDateYear + '.' + fromDateMonth + '~' + toDateYear + '.' + toDateMonth;
                }
                return filterStr;
            }
        }
    });
})();