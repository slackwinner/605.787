(function () {
    'use strict';

    angular.module('common')
      .service('UserService', UserService);

    UserService.$inject = ['$http', 'ApiPath'];
    function UserService($http, ApiPath) {
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

        service.checkDish = function (menuItem) {
            // Set default values
            var menuResults = {match: false};
            var categoryShortName = "default";
            var menuNum = 0;

            // Does the menuItem contain letters and numbers?
            if ((menuItem != null) && (menuItem.match(/^(?=.*[A-Za-z])(?=.*\d).+$/))) {
                // Extract the menu information 
                var menuItem = menuItem.toUpperCase();
                var categoryShortName = menuItem.match(/[A-Z]/g).join('');
                var menuNum = menuItem.match(/[0-9]/g).join('') - 1;
            }

            // Submit a GET Request and return results
            return $http({
                method: "GET",
                url: (ApiPath + "/menu_items/" + categoryShortName + "/menu_items/" + menuNum + ".json")
            })
            .then (function (results) {
                // Did we get no results?
                if(results.data == null) {
                    return menuResults;
                }
                // Did we get the corresponding results?
                else if (results.data.short_name == menuItem) {
                    menuResults = {
                        match: true,
                        menuInfo: results.data,
                        menuCategory: categoryShortName
                    };
                    return menuResults;
                }
                else {
                    // Handles other cases if the first two if conditions are not satisfied
                    return menuResults;
                }
            })
        };
    }
})();