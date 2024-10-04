(function () {
    'use strict';

    angular.module('Data')
    .service('MenuDataService', MenuDataService)
    .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com");

    MenuDataService.$inject = ['$q', '$timeout', '$http', '$ApiBasePath'];
    function MenuDataService($q, $timeout, $http, $ApiBasePath) {
        var service = this;

        service.getAllCategories = function() {
            return $http({
                method: "GET",
                url: ($ApiBasePath + "/categories.json")
            }).then (function (result) {
                console.log(result);
            })
        }

        service.getItemsForCategory(categoryShortName) = function () {
            return $http({
                method: "GET",
                url: ($ApiBasePath + "/menu_items/{categoryShortName}.json")
            }).then (function (result) {
                console.log(result);
            })
        }
    }
})