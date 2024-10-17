(function () {
    'use strict';

    angular.module('public')
      .controller('SignUpController', SignUpController);
    
    SignUpController.$inject = ['UserService'];
    function SignUpController(UserService) {
        var signUpCtrl = this;

        signUpCtrl.submit = function () {
            // Standardized the dish choice format
            var menuItem = signUpCtrl.chosenDish.toUpperCase();

            // Validate Dish Input
            UserService.checkDish(menuItem)
              .then(function(results) {
                // Is the dish check valid?
                console.log(results);
                if(results.match) {
                    // Create and save user info
                    var userData = {
                        firstName: signUpCtrl.firstName,
                        lastName: signUpCtrl.lastName,
                        email: signUpCtrl.email,
                        phone: signUpCtrl.phone,
                        menuInfo: results.menuInfo,
                        menuCategory: results.menuCategory
                    };
                    console.log(userData);
                    // Save the user info
                    UserService.setUserInfo(userData);

                    // Output a successful message
                    signUpCtrl.savedInfo = true;
                    signUpCtrl.dishError = false;
                }
                else {
                    // Output a failure message
                    signUpCtrl.dishError = true;
                    signUpCtrl.savedInfo = false;
                }
            })
            .catch(function (error) {
                console.log("Data fetch error while checking dish: " + error);
            });
        };
    }
})();