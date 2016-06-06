(function() {
    function HomeCtrl($scope, Room, Message) {
        $scope.allRooms = Room.all;
        
        // Add a new room
        $scope.addRoom = function() {
            // Creating a unique id
            var timestamp = new Date().valueOf();

            $scope.allRooms.$add({
                id: timestamp,
                name: $scope.roomName
            });

            $scope.roomName = '';
        };
        
        // Current active room
        $scope.activeRoom = function() {
            
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
        .controller('HomeCtrl', ['$scope', 'Room', 'Message', HomeCtrl]);
})();