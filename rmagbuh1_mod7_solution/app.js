(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListService', ShoppingListService);

ToBuyController.$inject = ['ShoppingListService'];
function ToBuyController(ShoppingListService) {
    var buy = this;
    var itemTypes = [
        "Cookies", "Milk", "Eggs", "Chips", 
        "Frozen Pizza(s)", "LEGO Star Wars Battle Pack(s)", 
        "Kit Kat(s)", "Pen(s)"
    ];

    // Create and populate buy list items
    ShoppingListService.createList(itemTypes);
    
    // Grab current buy list update
    buy.list = ShoppingListService.getBuyList();

    // Transfer item to bought list
    buy.transferItem = function (itemIdx) {
        ShoppingListService.transferItem(itemIdx);
    }

    // TODO:
    // Populate textbox with initial quantity (Make it customizable)
}

AlreadyBoughtController.$inject = ['ShoppingListService'];
function AlreadyBoughtController(ShoppingListService) {
    var bought = this;

    // Grab bought list updates
    bought.list = ShoppingListService.getBoughtList();

    // TODO:
    // Create custom filter to apply the total price displayed in bought list
    // Example: "Bought 10 cookies for total price of $$$20.00"
}

function ShoppingListService() {
    // Note: Provides business function logic for shopping services
    var service = this;
    var buyList = [];
    var boughtList = [];

    service.getBuyList = function () {
        // Return current items in buy list
        return buyList;
    };

    service.getBoughtList = function () {
        // Return current items in bought list
        return boughtList;
    };

    service.createList = function (itemTypes) {
        // Auto generate list
        for(let curr_item = 0; curr_item < itemTypes.length; curr_item++) {
            // Randomly choose quantity for each item
            var quantity = Math.floor(Math.random() * itemTypes.length) + 1;
            var item = {
                name: itemTypes[curr_item],
                quantity: quantity,
                pricePerItem: itemTypes[curr_item]
            };
            console.log(item);
            buyList.push(item);
        }
    };

    service.transferItem = function (itemIdx) {
        // Grab specific item and transfer to bought list
        var curr_item = buyList[itemIdx];
        buyList.splice(itemIdx, 1);
        boughtList.push(curr_item);
    };
}
})();