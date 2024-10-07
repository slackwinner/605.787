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
        }).then (function (result) {
            var categories = result.data;
            console.log(categories);
            return categories;
        }).catch(function (error) {
            console.log("Error Message: " + error);
        });
    }

    service.getItemsForCategory= function (categoryShortName) {
        return $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName)
        }).then (function (result) {
            var items = result.data.menu_items;
            console.log(items);
            return items;
        }).catch(function (error) {
            console.log("Error Message: " + error);
        });
    }
}
})