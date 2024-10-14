(function () {
    'user strict';

    angular.module('common')
      .service('UserService', UserService);

    function UserService() {
        var service = this;
        user = null;
        
        service.getUserInfo = function () {
            return service.user;
        };

        service.setUserInfo = function (user) {
            service.user = user;
        }
    }
})();