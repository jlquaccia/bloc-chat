(function() {
    function Cookies($cookies) {
        var currentUser = $cookies.get('blocChatCurrentUser');
        
        // Will prompt a user on app load to set a username if they have not already
        if (!currentUser || currentUser === '') {
            console.log('there is no current user set');
            
            setTimeout(function() {
                $('#modal-1').addClass('md-show');

                $('.md-close').click(function() {
                  $('#modal-1').removeClass('md-show');
                });
            }, 500);
        }
    }
    
    angular
        .module('blocChat')
        .run(['$cookies', Cookies]);
})();