(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListService', ShoppingListService);

ToBuyController.$inject = ['ShoppingListService'];
function ToBuyController(ShoppingListService) {
    // TODO: Add Implementations Here
    // Note: Serves as a middleman between Frontend and JS for buy interactions
    var buyList = this;
}

AlreadyBoughtController.$inject = [ShoppingListService];
function AlreadyBoughtController(ShoppingListService) {
    // TODO: Add Implementations Here
    // Note: Serves as a middleman between Frontend and JS for bought interactions
    var boughtList = this;
}

function ShoppingListService() {
    // TODO: Add Implementations Here
    // Note: Provides business function logic for shopping services
    var service = this;

}
})();