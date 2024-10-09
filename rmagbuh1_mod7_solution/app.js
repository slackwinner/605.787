(function () {
'use strict';

// Item list setup variables
var itemTypes = [
    ["Cookies", 2.00, 8], ["Milk", 3.00, 6], ["Chips", 1.00, 2], ["Egg(s)", 4.00, 5],
    ["Frozen Pizza(s)", 5.00, 4], ["LEGO Star Wars Battle Pack(s)", 10.00, 5], 
    ["Kit Kat(s)", 2.00, 2], ["Pen(s)", 1.00, 4]
];
var item_name_idx = 0;
var item_price_idx = 1;
var item_quantity_idx = 2;

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListService', ShoppingListService)
.filter('AngularCurrency', AngularCurrencyFilter);

ToBuyController.$inject = ['ShoppingListService'];
function ToBuyController(ShoppingListService) {
    var buy = this;

    // Create and populate buy list items
    ShoppingListService.createList(itemTypes);
    
    // Grab current buy list update
    buy.list = ShoppingListService.getBuyList();

    // Transfer item to bought list
    buy.transferItem = function (itemIdx) {
        ShoppingListService.transferItem(itemIdx);
    }
}

AlreadyBoughtController.$inject = ['ShoppingListService', 'AngularCurrencyFilter'];
function AlreadyBoughtController(ShoppingListService, AngularCurrencyFilter) {
    var bought = this;

    // Grab bought list updates
    bought.list = ShoppingListService.getBoughtList();

    bought.getBoughtMessage = function (item) {
        var totalPrice = ShoppingListService.getTotalPrice(item.quantity, item.pricePerItem);
        var totalPriceFormat = AngularCurrencyFilter(totalPrice);
        var msg = "Bought " + item.quantity + " " + item.name + " for total price of " + totalPriceFormat;
        return msg;
    };
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

    service.getTotalPrice = function (quantity, pricePerItem) {
        // Calculates total cost of item
        return quantity * pricePerItem; 
    };

    service.createList = function (itemTypes) {
        // Auto generate list
        for(let curr_item = 0; curr_item < itemTypes.length; curr_item++) {
            var item = {
                name: itemTypes[curr_item][item_name_idx],
                pricePerItem: itemTypes[curr_item][item_price_idx],
                quantity: itemTypes[curr_item][item_quantity_idx]
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

function AngularCurrencyFilter() {
  return function (totalPrice) {

    // Is total price a valid number?
    // Handles cases where input is e, +, -, negative, etc.
    if (isNaN(totalPrice) || totalPrice < 0) {
        // Overwrite total price with default value
        totalPrice = 0;
    }
    // Format total price
    var angularDollars = "$$$" + totalPrice.toFixed(2);
    return angularDollars;
  }
};
})();