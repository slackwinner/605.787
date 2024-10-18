(function () {
    'use strict';

    angular.module('common')
      .service('UserService', UserService);

    function UserService() {
        var service = this;
        service.user = null;

        service.setUserInfo = function (user) {
            service.user = user;
        };

        service.getUserInfo = function () {
            return service.user;
        };

        service.validateForm = function (signUpForm) {
            // Is the form valid?
            console.log(signUpForm);
            if(!signUpForm.$invalid) {
                return true;
            }
            else {
                return false;
            }
        };
    }
})();