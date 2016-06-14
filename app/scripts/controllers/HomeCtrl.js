(function() {
    function HomeCtrl($scope, $rootScope, $cookies, Room) {
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
        
        // Autofocus for input to create and set a new room name
        $scope.autoFocus = function() {
            if ($('.overlay').hasClass('open')) {
                $('input.overlay_input').focus();
            }
        };
        
        // Autofocus to set username
        setTimeout(function() {
            if ($('#modal-1').hasClass('md-show')) {
                $('input.setUsernameInput').focus();
            }
        }, 500);
        
        // Set current room to chat in
        $scope.setCurrentRoom = function(room) {
            var roomText = room.name;
            
            // Find the id of the current room
            $scope.currentRoomId = room.$id;
            
            // Set current room name to header
            $('.current_room_name').text(roomText);
            
            // Get messages relevant to what chat room was entered
            $scope.currentMessages = Room.getMessages($scope.currentRoomId);
            
            // Hide welcome carousel
            $('#welcome_slider_container').css('display', 'none');
            
            // Display input field to chat
            $('.message_input_wrapper').fadeIn();
            
            // Autofocus input field so it is ready for a user to chat
            $('.message_input_wrapper .message_input').focus();
        };
        
        // Submit a new chat message
        $scope.addNewMessage = function(){
            $scope.currentMessages.$add({content: $scope.newMessage, roomId: $scope.currentRoomId, sentAt: Date.now(), username: $scope.currentUsername || $rootScope.currentUser });
            $scope.newMessage = '';
        };
        
        // Close setUsername modal
        $scope.closeModal = function() {
            $('#modal-1').removeClass('md-show');
        };
        
        // Set current username to a cookie
        $scope.setUserName = function() {
            $cookies.put('blocChatCurrentUser', $scope.currentUsername);
            $('.current_room_name').text('Welcome ' + $scope.currentUsername + '!');
            $('.hidden_instructions').fadeIn();
        };
        
        // Allow user to set a username if form is valid
        $scope.validSubmit = function() {
            if ($scope.userForm.$valid) {
                $scope.setUserName();
                $scope.closeModal();
            }
        };
        
        // Display carousel on welcome state
        $('#carouselHacked').carousel();
        
        console.log($cookies.get('blocChatCurrentUser'));
        
    }
    
    angular
        .module('blocChat')
        .controller('HomeCtrl', ['$scope', '$rootScope', '$cookies', 'Room', HomeCtrl]);
})();