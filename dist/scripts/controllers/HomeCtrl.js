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
        
        
        $scope.addRoom = function() {
            console.log("Add Room is Firing")
            // Creating a unique id
            var timestamp = new Date().valueOf();
            console.log($scope.allRooms)
            console.log($scope.roomName)
            console.log($scope)

            $scope.allRooms.$add({
                id: timestamp,
                name: $scope.roomName
            });


            $scope.roomName = '';
        };
    }
    
    angular
        .module('blocChat')
        .controller('HomeCtrl', ['$scope', 'Room', HomeCtrl]);
})();