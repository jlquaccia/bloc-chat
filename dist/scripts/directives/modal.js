(function() {
    function modal() {
        return {
            templateUrl: '/templates/directives/modal.html',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: true,
            link: function postLink(scope, element, attrs) {
                scope.title = attrs.title;
                
                scope.$watch(attrs.visible, function(value) {
                    if (value == true) {
                        $(element).modal('show');
                    } else {
                        $(element).modal('hide');
                    }
                });
                
                $(element).on('shown.bs.modal', function() {
                    scope.$apply(function() {
                        scope.$parent[attrs.visible] = true;
                    });
                });
                
                $(element).on('hidden.bs.modal', function() {
                    scope.$apply(function() {
                        scope.$parent[attrs.visible] = false;
                    });
                });
            },
            controller: function($scope, Room) {
                $scope.allRooms = Room.all;

                $scope.addRoom = function() {
                    // Creating a unique id
                    var timestamp = new Date().valueOf();

                    $scope.allRooms.$add({
                        id: timestamp,
                        name: $scope.roomName
                    });

                    $scope.roomName = '';
                };
            }
        };
    }
    
    angular
        .module('blocChat')
        .directive('modal', modal);
})();