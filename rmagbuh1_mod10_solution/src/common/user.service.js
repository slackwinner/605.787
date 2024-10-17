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

        service.checkDish = function (menuItem) {
            try {
                // Extract the menu information 
                var categoryShortName = menuItem.match(/[A-Z]/g).join('');
                var menuNum = menuItem.match(/[0-9]/g).join('') - 1;
            } catch (error) {
                console.log("Extracting Dish Info Error Message: " + error);
            }
            // Submit a GET Request and return results
            return $http({
                method: "GET",
                url: (ApiPath + "/menu_items/" + categoryShortName + "/menu_items/" + menuNum + ".json")
            })
            .then (function (results) {
                // Create initial return object package
                var menuResults = {match: false};

                // Did we get no results?
                if(results.data == null) {
                    return menuResults;
                }
                // Did we get the corresponding results?
                else if (results.data.short_name == menuItem) {
                    menuResults = {
                        match: true,
                        menuInfo: results.data,
                        menuCategory: categoryShortName,
                    };
                    return menuResults;
                }
                else {
                    // Handles other cases if the first two if conditions are not satisfied
                    return menuResults;
                }
            })
            .catch(function (error) {
                console.log("Checking Category Error Message: " + error);
            });
        };
    }
})();