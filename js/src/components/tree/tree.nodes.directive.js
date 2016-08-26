(function() {
    'use strict';
    var tmApp = angular.module('teamManageApp');

    tmApp.directive('treeNodes', function () {
        return {
            templateUrl: 'js/src/components/tree/tree.nodes.directive.html',
            scope: {
                firstNode: '=',
                subNodes: '=',
                searchMode: '=',
                onNodeClick: '&',
                onNodeDetailClick: '&'
            },
            bindToController: true,
            controllerAs: 'ctrl',
            controller: function($scope){
                var vm = this;
            },
            link:link
        };

        function link(scope, element, attrs, ngModel){
        }
    });
})();
