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
            Room.newRoom($scope.roomName).then(function(ref){
                // Firebase Stuff

                // Grab the key of the new room just created
                $scope.currentRoomId = ref.key();
                // Set current room name to header
                $('.current_room_name').text($scope.roomName);
                // Reset roomName to nothing so that the next time a room is created the input will be blank
                $scope.roomName = '';
                // Get messages relevant to what chat room was entered
                $scope.currentMessages = Room.getMessages($scope.currentRoomId);

                // jQuery Stuff

                // Hide welcome carousel
                $('#welcome_slider_container').css('display', 'none');
                // Display input field to chat
                $('.message_input_wrapper').fadeIn();
                // Autofocus input field so it is ready for a user to chat
                $('.message_input_wrapper .message_input').focus();
                // Close mobile modal
                $('.mobile_overlay').fadeOut(200);
                // Hide mobile welcome container
                $('#welcome_mobile_container').hide();
                return ref.key();
            });


      
        };
        
        // Overlay
        $scope.toggleOverlay = function() {
            if (!$('.overlay-hugeinc').hasClass('open')) {
                $('.overlay-hugeinc').addClass('open');
                $('.overlay').css('z-index', '99');
            } else {
                $('.overlay-hugeinc').removeClass('open');
                
                // Close mobile modal
                $('.mobile_overlay').hide();
            }
        };
        
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
            // Firebase Stuff

            var roomText = room.name;
            // Find the id of the current room
            $scope.currentRoomId = room.$id;
            // Set current room name to header
            $('.current_room_name').text(roomText);
            // Get messages relevant to what chat room was entered
            $scope.currentMessages = Room.getMessages($scope.currentRoomId);
            
            // jQuery Stuff

            // Hide welcome carousel
            $('#welcome_slider_container').css('display', 'none');
            // Display input field to chat
            $('.message_input_wrapper').fadeIn();
            // Autofocus input field so it is ready for a user to chat
            $('.message_input_wrapper .message_input').focus();
            // Close mobile modal
            $('.mobile_overlay').fadeOut(200);
            // Hide mobile welcome container
            $('#welcome_mobile_container').hide();
        };
        
        // Submit a new chat message
        $scope.addNewMessage = function(){
            $scope.currentMessages.$add({content: $scope.newMessage, roomId: $scope.currentRoomId, sentAt: Date.now(), username: $scope.currentUsername || $rootScope.currentUser });
            $scope.newMessage = '';
            
            // Enables autoscroll down to make sure the last message sent is always visible
            var $elem = $('.messages_container');
            $('html, body').animate({scrollTop: $elem.height()}, 800);
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
        $('#carousel').carousel({
            pause: 'false'
        });
        
        // Mobile Hamburger Menu
        $(document).ready(function() {
          $('.hamburger_btn a').click(function() {
            $('.mobile_overlay').fadeToggle(200);
            $('.overlay').css('z-index', '5');
//            $(this).toggleClass('hamburger_btn_open').toggleClass('hamburger_btn_close');
          });
        });

        $('.hamburger_btn_close').on('click', function() {
          $('.mobile_overlay').fadeToggle(200);
//          $('.hamburger_btn a').toggleClass('hamburger_btn_open').toggleClass('hamburger_btn_close');
//          open = false;
        });
        
        console.log($cookies.get('blocChatCurrentUser'));
        
    }
    
    angular
        .module('blocChat')
        .controller('HomeCtrl', ['$scope', '$rootScope', '$cookies', 'Room', HomeCtrl]);
})();