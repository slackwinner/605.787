(function () {
    'use strict';

    angular.module('Data')
      .service('MenuDataService', MenuDataService)
      .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com");

    MenuDataService.$inject = ['$http', 'ApiBasePath'];
    function MenuDataService($http, ApiBasePath) {
        var service = this;

        service.getAllCategories = function() {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/categories.json")
            })
            .then (function (categories) {
                console.log(categories.data);
                return categories.data;
            })
            .catch(function (error) {
                console.log("Error Message: " + error);
            });
        };

        service.getItemsForCategory = function (categoryShortName) {
            console.log(categoryShortName);
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName)
            })
            .then (function (items) {
                console.log(items.data[categoryShortName]);
                return items.data[categoryShortName];
            })
            .catch(function (error) {
                console.log("Error Message: " + error);
            });
        };
    }
})();