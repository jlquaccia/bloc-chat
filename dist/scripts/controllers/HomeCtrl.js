(function() {
    function HomeCtrl($scope, Room) {
        $scope.allRooms = Room.all;
//        
//        $scope.addRoom = function() {
//            // Creating a unique id
//            var timestamp = new Date().valueOf();
//
//            $scope.allRooms.$add({
//                id: timestamp,
//                name: $scope.roomName
//            });
//
//            $scope.roomName = '';
//        };
        
        // Bootstrap Modal
        $scope.showModal = false;
        $scope.toggleModal = function() {
            $scope.showModal = !$scope.showModal;
        };
    }
    
    angular
        .module('blocChat')
        .controller('HomeCtrl', ['$scope', 'Room', HomeCtrl]);
})();