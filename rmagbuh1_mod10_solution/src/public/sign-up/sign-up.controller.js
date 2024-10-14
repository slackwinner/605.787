(function () {
    'use strict';

    angular.module('public')
      .controller('SignUpController', SignUpController);
    
    SignUpController.$inject = ['setUser'];
    function SignUpController() {
        var signUpCtrl = this;

        signUpCtrl.submit = function () {
            var userData = {
                firstName: signUpCtrl.firstName,
                lastName: signUpCtrl.lastName,
                email: signUpCtrl.email,
                phone: signUpCtrl.phone
            };
            setUser(userData);
            console.log(userData);
            signUpCtrl.savedInfo = true;
        };
    }
})();