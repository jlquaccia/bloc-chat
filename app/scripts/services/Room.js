(function() {
    function Room($firebaseArray) {
        var firebaseRef = new Firebase("https://bloc-chat-d0970.firebaseio.com"),
            rooms = $firebaseArray(firebaseRef.child('rooms'));
        
        return {
            all: rooms,
            newRoom: function(roomName) {
                // Creating a unique id
                var timestamp = new Date().valueOf();
                
                var room = this.all.$add({
                   id: timestamp,
                   name: roomName
                });
                
                roomName = '';

                return room;
            },
            getMessages: function(currentRoomId) {
                var messages = $firebaseArray(firebaseRef.child('messages').orderByChild('roomId').equalTo(currentRoomId));
                return messages;
            }
        };
    }
    
    angular
        .module('blocChat')
        .factory('Room', ['$firebaseArray', Room]);
})();