(function() {
    function HomeCtrl($scope, Room) {
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
        
        // Overlay
        $scope.toggleOverlay = function() {
            if (!$('.overlay-hugeinc').hasClass('open')) {
                $('.overlay-hugeinc').addClass('open');
            } else {
                $('.overlay-hugeinc').removeClass('open');
            }
        }
        
        // Autofocus for new room form
        $scope.autoFocus = function() {
            if ($('.overlay').hasClass('open')) {
                $('input.overlay_input').focus();
            }
        };
        
        // Set current room name to header
        $scope.currentTitle = function(room) {
            var roomText = room.name;
            
            $('.current_room_name').text(roomText);
        };
    }
    
    angular
        .module('blocChat')
        .controller('HomeCtrl', ['$scope', 'Room', HomeCtrl]);
})();