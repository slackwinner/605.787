(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com");

function FoundItemsDirective() {
    var ddo = {
        templateUrl: 'foundItems.html',
        scope: {
            found: '<',
            onRemove: '&'
        },
    };
    return ddo;
}

NarrowItDownController.$inject = ["MenuSearchService"];
function NarrowItDownController(MenuSearchService) {
    var narrowCon = this;

    // Grab and filter out menu items based on search input
    narrowCon.searchMenu = function (searchInput) {

        // Is the search input not empty?
       if (searchInput) {
            var results = MenuSearchService.getMatchedMenuItems(searchInput);
            results.then(function (response){
                narrowCon.found = response;
                console.log(narrowCon.found);
            }).catch(function (error) {
                console.log("Error Msg: " + error);
            });
       }
       else {
            // Return an empty array to indicate no found results
            narrowCon.found = [];
            console.log("Nothing Found!");
       }
    }

    // Remove certain items from search results
    narrowCon.removeItem = function (index) {
        narrowCon.found.splice(index, 1);
    }
};

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchInput) {
        return $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json")
        }).then (function (result) {
            // Note: Clear out existing items in result array before search operation
            var foundResults = [];
            var items = result.data;
            // Grab current category from results
            for(var currCategory in items) {
                var category = items[currCategory].menu_items;
                // Traverse and search through items within current category
                for (var currItem in category) {
                    var description = category[currItem].description;
                    // Does the description have the search input in it?
                    if(description.includes(searchInput.toLowerCase())) {
                        foundResults.push(category[currItem]);
                    }
                }
            }
            return foundResults;
        });
    }
}
})();