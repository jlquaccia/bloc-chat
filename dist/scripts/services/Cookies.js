(function() {
    function Cookies($cookies) {
        var currentUser = $cookies.get('blocChatCurrentUser');
        
        if (!currentUser || currentUser === '') {
            // Do something to allow users to set their username
            console.log('There is no current user');
        }
    }
    
    angular
        .module('blocChat')
        .run(['$cookies', Cookies]);
})();