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
            searchResults: '<',
            onRemove: '&'
        },
    };
    return ddo;
}

NarrowItDownController.$inject = ["MenuSearchService"];
function NarrowItDownController(MenuSearchService) {
    var narrowCon = this;

    // Grabs and filters out menu items based on search input
    narrowCon.searchMenu = function (searchInput) {
        var results = MenuSearchService.getMatchedMenuItems(searchInput);
        results.then(function (response){
            narrowCon.searchResults = response;
            console.log(narrowCon.searchResults);
        }).catch(function (error) {
            console.log("Error Msg: " + error);
        });
    }

    // Remove certain items from search results
    narrowCon.removeItem = function (index) {
        narrowCon.searchResults.splice(index, 1);
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
            var foundResults = [];
            var items = result.data;
            // Grab current category from results
            for(var currCategory in items) {
                var category = items[currCategory].menu_items;
                // Traverse and search through items within current category
                for (var currItem in category) {
                    var description = category[currItem].description;
                    // Does the description have the search term in it? 
                    if(description.includes(searchInput)) {
                        foundResults.push(category[currItem]);
                    }
                }
            }
            return foundResults;
        });
    }
}
})();