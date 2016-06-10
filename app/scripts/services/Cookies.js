(function() {
    function Cookies($cookies) {
        var currentUser = $cookies.get('blocChatCurrentUser');
        
        if (!currentUser || currentUser === '') {
            // Modal test
            $('#modal-1').addClass('md-show');

            $('.md-close').click(function() {
              $('#modal-1').removeClass('md-show');
            });
        }
    }
    
    angular
        .module('blocChat')
        .run(['$cookies', Cookies]);
})();