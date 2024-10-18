(function () {
    "use strict";

    angular.module('common')
    .service('MenuService', MenuService);


    MenuService.$inject = ['$http', 'ApiPath'];
    function MenuService($http, ApiPath) {
      var service = this;

      service.getCategories = function () {
        return $http.get(ApiPath + '/categories.json').then(function (response) {
          return response.data;
        });
      };

      service.getMenuItems = function (category) {
        return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
          return response.data;
        });
      };

      service.checkDish = function (menuItem) {
        // Set default values
        var menuResults = {match: false, menuInfo: null, menuCategory: null};
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
