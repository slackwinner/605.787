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
                // Do we have a valid menu item and all form items are filled out properly?
                if(results.match) {
                    searchResults = results;
                    signUpCtrl.dishError = false;
                }
                // Do we have a dish input and no match?
                else if((signUpCtrl.chosenDish && !results.match)) {
                    signUpCtrl.dishError = true;
                }
                // Did we get any matches overall?
                if(!results.match) {
                    signUpCtrl.savedInfo = false;
                }
            })
            .catch(function (error) {
                console.log("Data fetch error while validating dish: " + error);
            });
        };

        // Dynamically choose button color based on form and search result validation
        signUpCtrl.getButtonColor = function(signUpForm) {
            console.log(signUpForm);
            // Is the entire form valid?
            if ((signUpForm == false && signUpCtrl.dishError == false)) {
                return "submitReady";
            }
            else {
                return "submitError";
            }
        }

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