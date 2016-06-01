(function() {
    function HomeCtrl($scope, Room) {
        $scope.allRooms = Room.all;
        
//        $scope.newRoom = {
//            name: ''
//        };
//        
//        $scope.addRoom = function() {
//            $scope.allRooms.$add($scope.roomName).then(function(rooms) {
//                var id = rooms.key();
//                
//                console.log("added record with id " + id);
//                $scope.allRooms.$indexFor(id);
//            });
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