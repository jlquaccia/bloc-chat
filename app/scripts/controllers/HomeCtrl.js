(function() {
    function HomeCtrl($scope, Room) {
        $scope.allRooms = Room.all;
        $scope.currentRoomId = '';
        $scope.currentMessages = [
            {
                content: 'Welcome to Bloc Chat!',
                sentAt: '9:10am',
                username: 'jquatcha'
            },
            {
                content: 'Select a chat room to join on the left and chat away.',
                sentAt: '9:11am',
                username: 'jquatcha'
            }
        ];
        
        // Add a new room
        $scope.addRoom = function() {
            Room.newRoom($scope.roomName);
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
        
        // Set current room to chat in
        $scope.setCurrentRoom = function(room) {
            var roomText = room.name;
            
            // Find the id of the current room
            $scope.currentRoomId = room.$id;
            
            // Set current room name to header
            $('.current_room_name').text(roomText);
            
            $scope.currentMessages = Room.getMessages($scope.currentRoomId);
        };
    }
    
    angular
        .module('blocChat')
        .controller('HomeCtrl', ['$scope', 'Room', HomeCtrl]);
})();