(function () {
    'use strict';

    angular.module('public')
      .controller('SignUpController', SignUpController);
    
    SignUpController.$inject = ['UserService'];
    function SignUpController(UserService) {
        var signUpCtrl = this;
        var userProfile = null;
        var searchResults = null;

        // Validate Dish Input
        signUpCtrl.validateDish = function () {
            UserService.checkDish(signUpCtrl.chosenDish)
            .then(function(results) {
                // Did we have a valid menu item?
                if(results.match) {
                    searchResults = results;
                    signUpCtrl.dishError = false;
                }
                // Did we have a dish input and no match?
                else if ((signUpCtrl.chosenDish && !results.match)) {
                    signUpCtrl.dishError = true;
                }
                else {
                    // Reset dish error message in cases where dish input is empty
                    signUpCtrl.dishError = false;
                }
            })
            .catch(function (error) {
                console.log("Data fetch error while validating dish: " + error);
            });
        };

        signUpCtrl.submit = function () {
            // Did we get a menu item match?
            if((searchResults != null && searchResults.match)) {
                // Store user info in a profile
                userProfile = {
                    firstName: signUpCtrl.firstName,
                    lastName: signUpCtrl.lastName,
                    email: signUpCtrl.email,
                    phone: signUpCtrl.phone,
                    menuInfo: searchResults.menuInfo,
                    menuCategory: searchResults.menuCategory
                };
                // Save the user info and display successful message
                UserService.setUserInfo(userProfile);
                signUpCtrl.savedInfo = true;
            } 
        };
    }
})();