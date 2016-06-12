(function() {
    function Cookies($cookies, $rootScope) {
        $rootScope.currentUser = $cookies.get('blocChatCurrentUser');
        
        // Remove blocChatCurrentUser cookie if needed
//        $cookies.remove('blocChatCurrentUser');
        
        // Will prompt a user on app load to set a username if they have not already
        if (!$rootScope.currentUser || $rootScope.currentUser === '') {
            console.log('there is no current user set');
            
            setTimeout(function() {
                $('#modal-1').addClass('md-show');
            }, 500);
        }
    }
    
    angular
        .module('blocChat')
        .run(['$cookies', '$rootScope', Cookies]);
})();